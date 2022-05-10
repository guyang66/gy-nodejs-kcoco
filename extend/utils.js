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

  /**
   * @param object
   * @returns {string}
   */
  localStringify (object) {
    return JSON.stringify(object, function (k, v) {
      if (v instanceof RegExp) {
        return v.toString();
      }
      return v;
    })
  },

  /**
   * 处理静态资源的引入方式
   * @param path 相对路径
   * @param key
   *    1、js => 普通js
   *    2、commonjs => 插件中的js
   *    3、css => css
   * @param useCdn 是否使用cdn
   * @returns {string}
   */
  getContext (path, key='js', useCdn) {
    const { $config } = app
    // 开发环境不使用压缩后的文件
    let url = process.env.NODE_ENV === 'production' ? '/javascripts/' + path : '/js/' + path
    if(key === 'css'){
      url = process.env.NODE_ENV === 'production' ? '/css/common/' + path : '/common/css/' + path
    }
    if(key === 'commonjs'){
      url = process.env.NODE_ENV === 'production' ? '/javascripts/common/' + path : '/common/plugins/' + path
    }
    if(useCdn){
      // todo: 使用cdn的时候，将public目录直接上传到cdn上即可，然后$config.cdn.domain设置为相应的前缀即可
      // 如果部署发布的时候是替换整个项目（不是用git pull增量更新），那么public路面需要给相应权限，不然静态资源会无法访问，所以推荐使用cdn
      url = $config.cdn.domain + url
    }
    return  url
  }

})
