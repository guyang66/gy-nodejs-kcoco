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
    const { $helper, $constants, $service, $model, $utils, $log4 } = app
    const { userVisit, smsCode } = $model
    const { errorLogger, smsLogger } = $log4
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
        smsLogger.error('【短信验证码发送】还未超过60s，频繁发送：' + JSON.stringify({phone, ipString, dateTag}))
        return $helper.wrapResult(false, 'SMS_SEND_FREQUENT_ERROR')
      }

      if(uv.count >= SMS_SEND_DAY_TIMES) {
        // 超出了个人发送限制
        smsLogger.error('【短信验证码发送】超出了个人发送限制：' + JSON.stringify({phone, ipString, dateTag}))
        return $helper.wrapResult(false, 'SMS_SEND_TOO_MANY_ERROR')
      }
    }

    const randomCode = $helper.getRandomCode()
    //todo: 使用真的短信服务的时候，需要try catch
    let sendResult = await sendAction(randomCode)
    if(!sendResult){
      errorLogger.error('【短信验证码发送】验证码服务出错：' + JSON.stringify({phone, ipString, dateTag}))
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
      dateTag: dateTag,
      action: SMS_VISIT_ACTION,
    },{
      $inc: { count: 1 },
      lastSendTime: new Date()
    })

    smsLogger.info('【短信验证码发送】验证码发送成功：' + JSON.stringify({phone, ipString, dateTag, randomCode}))
    // 发送成功的话
    return $helper.wrapResult(true, '发送验证码成功！')
  },

  /**
   * 校验验证码
   * @param phone
   * @param code
   * @returns {Promise<void>}
   */
  async verifySms (phone, code) {
    const { $helper, $constants, $service, $model, $utils, $log4 } = app
    const { SMS_CODE_EXPIRE } = $constants
    const { smsLogger } = $log4
    const { smsCode } = $model

    let verifyCodeList = await $service.baseService.query(smsCode,{phone: phone}, null, {sort: {createTime: -1}})
    if(!verifyCodeList || verifyCodeList.length < 1){
      // 未查询到数据
      smsLogger.error('【短信验证码校验】该手机未查询到相关数据：' + JSON.stringify({phone, code}))
      return $helper.wrapResult(false, 'SMS_NO_AVAILABLE_INFO_ERROR')
    }

    let latestVerifyCode = verifyCodeList[0]
    if (latestVerifyCode.used) {
      // 验证码已被标记为使用过
      smsLogger.error('【短信验证码校验】该验证码已被使用过：' + JSON.stringify({phone, code}))
      return $helper.wrapResult(false, 'SMS_CODE_USED_ERROR')
    }

    let intervalTime = $utils.getIntervalForGmt(new Date(), latestVerifyCode.createTime)
    if(intervalTime > SMS_CODE_EXPIRE){
      // 验证码已经失效
      smsLogger.error('【短信验证码校验】该验证码已失效：' + JSON.stringify({phone, code}))
      return $helper.wrapResult(false, 'SMS_CODE_EXPIRED_ERROR')
    }

    let verifyCode = latestVerifyCode.code - 0
    if(verifyCode !== (code - 0)){
      // 验证码错误
      smsLogger.error('【短信验证码校验】该验证码不匹配：' + JSON.stringify({phone, code}))
      return $helper.wrapResult(false, 'SMS_CODE_VERIFY_ERROR')
    }

    // 验证成功
    await $service.baseService.updateById(smsCode, latestVerifyCode._id, {used: true})
    smsLogger.info('【短信验证码校验】验证码校验成功：' + JSON.stringify({phone, code}))
    return $helper.wrapResult(true, '验证成功')
  }

})
