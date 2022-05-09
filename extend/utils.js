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
