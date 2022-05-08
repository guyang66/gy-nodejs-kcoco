module.exports = app => ({
  /**
   * 发送短信验证码
   * @returns {Promise<void>}
   */
  async sendSms () {
    const { $helper } = app
    return $helper.wrapResult(true, '发送验证码成功！')
  }
})
