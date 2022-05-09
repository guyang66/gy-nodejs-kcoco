const nodemailer = require('nodemailer')

/**
 * 发送邮件
 * @param transporter
 * @param mailOptions
 * @returns {Promise<unknown>}
 */
const trySend = (transporter, mailOptions) =>{
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, async function (error, info){
      if(error){
        reject (error.message)
      } else {
        resolve(info)
      }
    })
  })
}

/**
 * 初始化邮箱客户端
 * @param emailConfig
 * @returns {Mail}
 */
const getEmailTransporter = (emailConfig) => {
  return nodemailer.createTransport(emailConfig)
}

/**
 * 配置邮箱格式
 * @param from
 * @param to
 * @param content
 * @returns {{subject: string, from, html: null, to, text: string}}
 */
const getEmailConfigOptions = (from, to, subject, content)=> {
  return {
    from: from,
    to: to,
    subject: subject,
    text: content,
    html: null
  }
}

module.exports = app => ({

  /**
   * 把线索发送到指定邮件
   * @returns {Promise<void>}
   */

  async clueToEmail (content) {
    const { $helper, $config, $utils, $log4 } = app
    const { smtp } = $config
    const { errorLogger, commonLogger } = $log4
    //todo: qq邮箱需要开启smtp授权码
    const qqEmailConfig = {
      service: 'qq',
      auth: {
        user: smtp.qq.auth.user,
        pass: smtp.qq.auth.pass,
      }
    }
    const emailTransporter = getEmailTransporter(qqEmailConfig)

    let emailContent = $utils.plainObjectToString(content,'\n')

    const mailOptions = getEmailConfigOptions(smtp.qq.auth.user, smtp.receiver.common, '官网线索', emailContent)
    try {
      commonLogger.info('发送邮件成功' + emailContent)
      await trySend(emailTransporter, mailOptions)
      return $helper.wrapResult(true,'发送成功')
    } catch (e){
      errorLogger.error('【emailService】—— clueToEmail' + e.toString())
      return $helper.wrapResult(false, e.toString(), -3)
    }
  },


  /**
   * 预警邮件
   * @returns {Promise<void>}
   */
  async warnEmail () {
    // 如果有预警或者其他问题（比如定时器报错），可以发送邮件到系统管理员
    const { $helper } = app
    return  $helper.wrapResult(true, 'ok')
  }

})
