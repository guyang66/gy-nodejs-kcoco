module.exports = app => ({
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
})
