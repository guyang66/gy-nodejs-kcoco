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

  COMMON_ERROR: {
    code: -3,
    message: '异常错误',
    description: '异常错误'
  },

  MOCK_DATA_ERROR: {
    code: 999,
    message: '当前接口功能不能使用，请设置config.json->dataMock为true，并正确连接数据库',
    description: '当前接口功能不能使用，请设置config.json->dataMock为true，并正确连接数据库'
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

  EMAIL_FORMAT_ERROR: {
    code: 2001,
    message: '邮箱格式有误',
    description: '邮箱格式有误'
  },

  UPLOAD_NO_FILE_ERROR: {
    code: 2002,
    message: '没有需要上传的文件',
    description: '没有需要上传的文件'
  },

  UPLOAD_FILE_NAME_EMPTY_ERROR: {
    code: 2003,
    message: '上传文件名字为空',
    description: '没有指定上传文件的名字'
  },



  // 短信相关错误

  SMS_SERVER_ERROR: {
    code: 3000,
    message: '短信服务异常，请稍后再试',
    description: '短信服务异常，请联系管理员'
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

  SMS_CODE_FORMAT_ERROR: {
    code: 3003,
    message: '验证码错误',
    description: '验证码格式校验错误'
  },

  SMS_NO_AVAILABLE_INFO_ERROR: {
    code: 3004,
    message: '验证码错误',
    description: '未查到该手机号码有相关验证码信息'
  },

  SMS_CODE_USED_ERROR: {
    code: 3005,
    message: '验证码已失效',
    description: '短信验证码已经被使用过'
  },

  SMS_CODE_EXPIRED_ERROR: {
    code: 3006,
    message: '验证码已过期',
    description: '短信验证码已经过期'
  },

  SMS_CODE_VERIFY_ERROR: {
    code: 3007,
    message: '验证码错误',
    description: '短信验证码输入错误'
  },

  // 管理后台

  PASSWORD_WRONG_ERROR: {
    code: 4001,
    message: '密码错误',
    description: '用户密码错误'
  },

  USER_NOT_EXIST_ERROR: {
    code: 4002,
    message: '用户不存在或者已被禁用',
    description: '用户不存在或者已被禁用，请联系管理员！'
  },

  SYS_TOKEN_CHECK_ERROR: {
    code: 4003,
    message: 'token解析失败(check)',
    description: '系统token解析失败(check)'
  },

  SYS_TOKEN_DECODE_ERROR: {
    code: 4004,
    message: 'token解析失败(decode)',
    description: '系统token解析失败(decode)'
  },

  USER_NOT_LOGIN: {
    code: 4005,
    message: '无权访问（用户未登录或登录信息已失效）',
    description: '无权访问（用户未登录或登录信息已失效）'
  }

}
