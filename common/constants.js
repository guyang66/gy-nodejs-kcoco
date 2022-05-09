module.exports = {

  // 默认tdk
  TDK_DEFAULT: {
    path: 'default',
    title: 'yy科技——10000万家供应商的信赖选择',
    description: 'yy科技是一家很强大的公司。',
    keywords: '科技,水果,蔬菜,智能系统,供应商'
  },

  // 验证码规则常量
  SMS_VISIT_ACTION: 'sms_send',
  SMS_SEND_TIME_CIRCLE: (60 - 1) * 1000, // 验证码发送间隔：59s 比前端少一秒
  SMS_SEND_DAY_TIMES: 10, // 每人每天最多发10次
  SMS_CODE_EXPIRE: 1000 * 60 * 15, // 验证码15分钟过期时间

  // 验证码相关配置
  SMS_CODE_CHAR_SET: '0123456789',
  SMS_CODE_CHAR_LENGTH: 10,
  SMS_CODE_LENGTH: 6,


}
