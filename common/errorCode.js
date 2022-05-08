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

  PARAM_EMPTY: {
    code: 1000,
    message: '参数有误',
    description: '参数有误，或参数不完整'
  },

  PHONE_FORMAT_ERROR: {
    code: 2000,
    message: '手机号码格式有误',
    description: '手机号码格式有误'
  }

  // 短信相关错误

}
