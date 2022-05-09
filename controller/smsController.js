module.exports = app => ({

  /**
   * （客户端）发送验证码
   * @returns {Promise<void>}
   */
  async send () {
    const { ctx, $helper, $utils, $service, $format } = app;
    const { phone } = ctx.query

    // ip 如果使用了nginx 代理，需要在nginx中设置转发请求头，不然ip永远都是1或者127.0.0.1
    const ipString = $helper.getClientIP(ctx)
    const dateTag = $format.formatDateYYMMDD(new Date())

    if(!phone){
      ctx.body = $helper.Result.error('PARAM_EMPTY_ERROR')
      return
    }

    if(!$utils.validatePhoneFormat(phone)){
      ctx.body = $helper.Result.error('PHONE_FORMAT_ERROR')
      return
    }
    //todo: service不能做controller的事，不能直接返回$helper.Result封装结果，因为不仅controller在使用service，其他地方也在使用，比如定时器
    let r = await $service.smsService.sendSms(phone, ipString, dateTag)
    if(r.result){
      ctx.body = $helper.Result.success(r.data)
    } else {
      ctx.body = $helper.Result.fail(r.errorCode, r.errorMessage)
    }
  }
})
