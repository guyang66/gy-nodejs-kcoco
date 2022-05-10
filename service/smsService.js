const log4 = require('../common/log4');
const sendAction = async function(config, phone, code) {
  const { smsLogger } = log4
  if(process.env.NODE_ENV !== 'production' && process.env.SMS_ENV !== 'qa'){
    return true
  }
  let smsType = config.type
  if(smsType === 'aliyun'){
    // todo: 如果要测试发短信，请预读一下文档，按照文档配置即可。
    // 发送测试短信  文档：https://help.aliyun.com/document_detail/108064.html
    // openAPI: https://next.api.aliyun.com/api/Dysmsapi/2017-05-25/SendSms?spm=a2c4g.11186623.0.0.5b2f7218tUIgxh&params=%7B%7D&sdkStyle=old&lang=NODEJS
    const Core = require('@alicloud/pop-core');
    let aliyunSmsConfig = config['aliyun']
    let smsClient = new Core({
      accessKeyId: aliyunSmsConfig.accessKeyId,
      accessKeySecret: aliyunSmsConfig.accessKeySecret,
      endpoint: aliyunSmsConfig.endpoint,
      apiVersion: aliyunSmsConfig.apiVersion,
    })

    // 模板 尊敬的${phone}用户，你的验证码为${code}，请勿将验证码提供给他人
    let smsParams = {
      "PhoneNumbers": phone,//接收短信的手机号码
      "SignName": aliyunSmsConfig.SignName,//短信签名名称
      "TemplateCode": aliyunSmsConfig.TemplateCode, //短信模板CODE
      "TemplateParam": JSON.stringify({
        phone: phone,
        code: code
      })
    }

    let requestOption = {
      method: 'POST'
    }

    try {
      let r = await smsClient.request('SendSms', smsParams, requestOption)
      smsLogger.info('【阿里云短信服务】短信订单：','phone:' + phone + ';','code:' + code + ';')
      smsLogger.info('【阿里云短信服务】短信结果信息：', 'RequestId：' + r.RequestId + ';', 'Message：' + r.Message + ';', 'BizId：' + r.BizId + ';', 'Code：' + r.Code + ';')
      return {
        result: true,
        data: r.Message
      }
    } catch (e) {
      console.log(e)
      return {
        result: false,
        errorMessage: e.toString(),
        errorCode: -3
      }
    }

  } else {
    // 这里需要你用的短信服务来做定制化接入，写入你的逻辑
    return {
      result: false,
      errorMessage: '暂无可用的短信服务！',
      errorCode: -3
    }
  }
}

module.exports = app => ({
  /**
   * 发送短信验证码
   * @returns {Promise<void>}
   */
  async sendSms (phone, ipString, dateTag) {
    const { $helper, $constants, $service, $model, $utils, $log4, $config } = app
    const { userVisit, smsCode } = $model
    const { errorLogger, smsLogger } = $log4
    const { SMS_VISIT_ACTION, SMS_SEND_TIME_CIRCLE, SMS_SEND_DAY_TIMES } = $constants

    if($config.dataMock){
      // 当前是数据使用mock数据，表单相关接口不能使用
      return $helper.wrapResult(false, 'MOCK_DATA_ERROR')
    }
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
      if($utils.compareTimeOut(new Date(), uv.lastSendTime, SMS_SEND_TIME_CIRCLE) && process.env.SMS_ENV !== 'qa'){
        // 还未超过60s，频繁发送
        smsLogger.error('【短信验证码发送】还未超过60s，频繁发送：' + JSON.stringify({phone, ipString, dateTag}))
        return $helper.wrapResult(false, 'SMS_SEND_FREQUENT_ERROR')
      }

      // qa环境放开这些测试，不然测试一直卡壳
      if(uv.count >= SMS_SEND_DAY_TIMES && process.env.SMS_ENV !== 'qa') {
        // 超出了个人发送限制
        smsLogger.error('【短信验证码发送】超出了个人发送限制：' + JSON.stringify({phone, ipString, dateTag}))
        return $helper.wrapResult(false, 'SMS_SEND_TOO_MANY_ERROR')
      }
    }

    const randomCode = $helper.getRandomCode()
    let sendResult = await sendAction($config.sms, phone, randomCode)
    if(!sendResult.result){
      errorLogger.error('【短信验证码发送】验证码服务出错：' + JSON.stringify({phone, ipString, dateTag}))
      errorLogger.error('【短信验证码发送】服务错误原因：' + sendResult.errorMessage)
      // TODO：1、不要返回前端看不懂的信息。2、不要让异常中断程序，try catch 捕获所有异常和全局捕获
      return $helper.wrapResult(false, 'SMS_SERVER_ERROR')
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
    const { $helper, $constants, $service, $model, $utils, $log4, $config } = app
    const { SMS_CODE_EXPIRE } = $constants
    const { smsLogger } = $log4
    const { smsCode } = $model
    if($config.dataMock){
      // 当前是数据使用mock数据，表单相关接口不能使用
      return $helper.wrapResult(false, 'MOCK_DATA_ERROR')
    }
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
