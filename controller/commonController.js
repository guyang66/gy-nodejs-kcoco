module.exports = app => ({

  async test () {
    const { ctx, $helper } = app
    ctx.body = $helper.Result.success('')
  },

  /**
   * 获取验证码
   * @returns {Promise<void>}
   */
  async getCaptcha () {
    const { ctx, $config, $helper } = app;
    const svgCaptcha = require('svg-captcha')
    const cap = svgCaptcha.create({
      size: $config.captcha.size, // 验证码长度
      width: $config.captcha.width,
      height: $config.captcha.height,
      fontSize: $config.captcha.fontSize,
      ignoreChars: $config.captcha.ignoreChars, // 验证码字符中排除 0o1i
      noise: $config.captcha.noise, // 干扰线条的数量
      color: $config.captcha.color, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
      background: $config.captcha.background // 验证码图片背景颜色
    })
    ctx.response.type = 'image/svg+xml'
    ctx.session.captcha = cap.text.toLowerCase()
    ctx.body = $helper.Result.success(cap.data)
  },

})
