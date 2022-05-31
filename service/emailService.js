const nodemailer = require('nodemailer')
/** 发送邮件 **/
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

const getEmailTransporter = (emailConfig) => {
  return nodemailer.createTransport(emailConfig)
}

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
   * 商务合作线索发送到指定邮箱
   * @returns {Promise<void>}
   */
  async sendCooperateClue () {
    const { $helper, $config, $utils, $log4, $service, $model, $format } = app
    const { smtp } = $config
    const { bizClue } = $model
    const { errorLogger, scheduleLogger } = $log4
    const qqEmailConfig = {
      service: 'qq',
      auth: {
        user: smtp.qq.auth.user,
        pass: smtp.qq.auth.pass,
      }
    }

    let endTime = new Date(new Date().setHours(0,0,0,0) - 1)
    let startTime = new Date(endTime.getTime() - (24 * 60 * 60 * 1000 * 2 - 1))
    let queryParams = {createTime: {"$gt": startTime, "$lt": endTime}}
    console.log(startTime)
    console.log(endTime)
    let list = await $service.baseService.query(bizClue, queryParams ,{name: 1, phone: 1, email: 1, company: 1, position: 1})
    if(list.length < 1){
      scheduleLogger.info('本次任务没有需要发送的数据！')
      return $helper.wrapResult(true,'')
    }
    let emailContent = ''
    list.forEach((item, index)=>{
      let obj = {
        名字: item.name,
        电话: item.phone,
        公司: item.company,
      }
      if(item.email && item.email !== ''){
        obj.邮箱 = item.email
      }
      if(item.position && item.position !== ''){
        obj.职位 = item.position
      }
      emailContent = emailContent + $utils.plainObjectToString(obj,'\n')
      if(index !== list.length - 1){
        emailContent = emailContent + '\n' + '================================' + '\n\n'
      }
    })
    console.log(emailContent)
    const emailTransporter = getEmailTransporter(qqEmailConfig)
    const mailOptions = getEmailConfigOptions(smtp.qq.auth.user, smtp.receiver.partner, $format.formatDateYYMMDD(startTime) + '：商务合作', emailContent)
    try {
      scheduleLogger.info('商务邮件发送成功:' + emailContent)
      await trySend(emailTransporter, mailOptions)
      return $helper.wrapResult(true,'发送成功')
    } catch (e){
      errorLogger.error('【emailService】—— sendCooperateClue' + e.toString())
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
