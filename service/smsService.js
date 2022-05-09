
const sendAction = async function() {
  if(process.env.NODE_ENV === 'development'){
    return true
  }
}

module.exports = app => ({
  /**
   * 发送短信验证码
   * @returns {Promise<void>}
   */
  async sendSms (phone, ipString, dateTag) {
    const { $helper, $constants, $service, $model, $utils } = app
    const { userVisit, smsCode } = $model
    const { SMS_VISIT_ACTION, SMS_SEND_TIME_CIRCLE, SMS_SEND_DAY_TIMES } = $constants
    // todo: 怎么设计短信限制规则

    //增加访问记录，用来记录同一个人的发送记录
    let uv = await $service.baseService.queryOne(userVisit,{
      phone: phone,
      ip: ipString,
      dateTag: dateTag,
      action: SMS_VISIT_ACTION
    })
    if(!uv){
      // 不存在就创建一个新的
      await $service.baseService.save(userVisit,{
        phone: phone,
        action: SMS_VISIT_ACTION,
        type: 'client',
        ip: ipString,
        count: 0,
        dateTag: dateTag,
        lastSendTime: new Date(),
        createTime: new Date()
      })
    } else {
      // 如果查询到有记录，则校验规则
      // 短信有60秒间隔、前端要做校验，后端也要做，然后设置发送次数，避免用程序恶意消耗短信条数
      if($utils.compareTimeOut(new Date(), uv.lastSendTime, SMS_SEND_TIME_CIRCLE)){
        // 还未超过60s，频繁发送
        return $helper.wrapResult(false, 'SMS_SEND_FREQUENT_ERROR')
      }

      if(uv.count >= SMS_SEND_DAY_TIMES) {
        // 超出了个人发送限制
        return $helper.wrapResult(false, 'SMS_SEND_TOO_MANY_ERROR')
      }
    }

    const randomCode = $helper.getRandomCode()
    let sendResult = await sendAction(randomCode)
    if(!sendResult){
      return $helper.wrapResult(false, '', 'SMS_SERVER_ERROR')
    }

    // 保存发送过的验证码到数据库
    await $service.baseService.save(smsCode,{
      phone: phone,
      code: randomCode,
      used: false,
    })

    // 更新访问记录的次数和时间
    await $service.baseService.updateOne(userVisit, {
      phone: phone,
      ip: ipString,
      dataTag: dateTag,
      action: SMS_VISIT_ACTION,
    },{
      $inc: { count: 1 },
      lastSendTime: new Date()
    })

    // 发送成功的话
    return $helper.wrapResult(true, '发送验证码成功！')
  },

})