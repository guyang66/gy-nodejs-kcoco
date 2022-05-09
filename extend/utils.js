module.exports = app => ({

  isEmptyString (string) {
    if(!string || string === ''){
      return true
    }
    let str =  string.replace(/^\s+|\s+$/g,"");
    return (str === '' || str === ' ');
  },

  /**
   *  判断是否是对象
   */
  isEmptyObject  (object) {

    if(!object || typeof object !== 'object'){
      return  true
    }

    if (JSON.stringify(object) === '{}') {
      return true
    }

    return  Object.keys(object).length < 1
  },

  /**
   *  简单校验电话号码格式
   */

  validatePhoneFormat (value) {
    if (value && value.length !== 11) {
      return false
    }
    //判断是否是11位数字
    let regexp = /^\d{11}$/
    if(!regexp.test(value)){
      return false
    }
    return  true
  },

  /**
   * 对象的仿照toString方法
   * @param object
   * @param format 使用指定符号链接
   * @returns {string}
   */
  plainObjectToString (object, format = '') {
    if(!object){
      return ''
    }

    let str = ''
    for(let keyStr in object){
      str =  str + keyStr + '：' + object[keyStr] + format
    }
    return str
  },

  /**
   * 校验sms 验证码格式
   * @param value
   * @param length
   * @returns {boolean}
   */

  validateCodeFormat (value, length) {
    const { $constants } = app
    const { SMS_CODE_LENGTH } = $constants

    // 开发环境跳过验证码校验
    if(process.env.NODE_ENV !== 'production' && process.env.SMS_ENV !== 'qa'){
      return true
    }

    if (length && value && value.length !== length) {
      return false
    }
    let rule = length || SMS_CODE_LENGTH
    let regexp = new RegExp("^\\d{" + rule + "}$")
    if(!regexp.test(value)){
      return false
    }
    return true
  },

  /**
   * 判断时间是否超出判定值
   * @param t1
   * @param t2
   * @param interval
   * @returns {boolean}
   */
  compareTimeOut (t1, t2, interval) {
    if(!t1){
      t1 = new Date()
    }
    if(!t2){
      return true
    }
    return this.getIntervalForGmt(t1, t2) < interval
  },
  /**
   *  获取两个时间戳的差值
   */
  getIntervalForGmt (t1, t2) {
    if(!t2){
      t2 = new Date().getTime() + 1000 * 60 * 60
    }
    if(!(t1 instanceof Date)){
      t1 = new Date(t1)
    }
    if(!(t2 instanceof Date)){
      t2 = new Date(t2)
    }
    return Math.abs(t1.getTime() - t2.getTime())
  },
})
