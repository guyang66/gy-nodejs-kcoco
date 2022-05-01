module.exports = app => ({

  /**
   * 格式化Date YYMMDD hhmmss
   * @param t
   * @returns {string}
   */
  formatDate (t) {
    if(!t){
      t = new Date()
    }

    if(!(t instanceof Date)){
      t = new Date(t)
    }
    let h = t.getHours()
    let m = t.getMinutes()
    let s = t.getSeconds()
    return this.formatDateYYMMDD(t) + ' ' + (h < 10 ? ('0' + h) : h) + ':' + (m < 10 ? ('0' + m) : m ) + ':' + (s < 10 ? ('0' + s) : s)
  },

  /**
   * object 补全双引号 转化为JSON格式
   * @param obj
   * @param isRecurse 是否是在递归中调用该函数
   * @returns {*[]|*}
   */
  jsonObject (obj, isRecurse) {

    // 如果是第一次外部调用，非object直接报错，因为这个方法是给ejs转化数据用的，如果转化不成功即数据有问题，前端也会显示异常或者js逻辑带有bug
    if((obj === null || typeof obj !== 'object') && !isRecurse) {
      // 看具体情况，如果不想抛出错误，就加个容错
      throw '【$format.jsonObject】obj 不是对象类型！'
    }

    if (obj === null || typeof obj !== 'object') {
      return obj
    }
    const copy = Array.isArray(obj) ? [] : {}
    Object.keys(obj).forEach(key => {
      // 递归处理children
      copy[key] = this.jsonObject(obj[key], true)
    })
    return copy
  }

})
