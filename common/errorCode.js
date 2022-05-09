module.exports = {
  /**
   * @key message 返回前端的错误信息
   * @key description 错误详细描述信息
   */
  SYSTEM_ERROR: {
    code: -1,
    message: '系统有误，请稍候再试',
    description: '系统有误，请稍候再试'
  },

  DEFAULT_ERROR: {
    code: -1,
    message: '系统有误，请稍候再试',
    description: '系统有误，请稍候再试'
  },

  MONGODB_ERROR: {
    code: -2,
    message: '系统有误，请稍候再试',
    description: 'mongodb查询错误'
  },

  PARAM_EMPTY_ERROR: {
    code: 1000,
    message: '参数有误',
    description: '参数有误，或参数不完整'
  },

  PHONE_FORMAT_ERROR: {
    code: 2000,
    message: '手机号码格式有误',
    description: '手机号码格式有误'
  },

  // 短信相关错误

  SMS_SERVER_ERROR: {
    code: 3000,
    message: '验证码发送次数过多',
    description: '短信验证码发送次数过多,超过了今天的次数限制'
  },

  SMS_SEND_FREQUENT_ERROR: {
    code: 3001,
    message: '请勿频繁发送验证码',
    description: '短信验证码发送过于频繁，未超过60s设置'
  },

  SMS_SEND_TOO_MANY_ERROR: {
    code: 3002,
    message: '验证码发送次数过多',
    description: '短信验证码发送次数过多,超过了今天的次数限制'
  },

}
