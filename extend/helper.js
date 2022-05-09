const errorCode = require('../common/errorCode')

const getRandom = function (n, m) {
  n = Number(n);
  m = Number(m);
  if(n > m){
    let tmp = n;
    n = m;
    m = tmp
  }
  return Math.floor(Math.random() * (m - n) + n);
}

module.exports = app => ({
  Result : {
    success (content) {
      return {
        success: true,
        data: content,
        errorCode: null,
        errorMessage: null
      }
    },

    fail (code, message) {
      return {
        success: false,
        data: null,
        errorCode: code,
        errorMessage: message ? message : ''
      }
    },

    error (errorKey) {
      let body = errorCode[errorKey] ? errorCode[errorKey] : errorCode['DEFAULT_ERROR']
      return {
        success: false,
        data: null,
        errorCode: body.code,
        errorMessage: body.message
      }
    }
  },

  /**
   *
   * @param success
   * @param msg
   * @param code
   * @returns {{result}}
   */
  wrapResult (success, msg, code) {
    let obj = {
      result: !!success,
    }
    if(success){
      obj.data = msg
    } else {
      obj.errorMessage = errorCode[msg] ? errorCode[msg].message : msg
      obj.errorCode = errorCode[msg] ? errorCode[msg].code :code
    }
    return obj
  },

  /**
   * 自定义分页器显示逻辑（这里有一些局限性，还可以再扩展的更好些）
   * @param total 总条数
   * @param cellCount 显示形式 7：显示 1、2、3、4、5 ... 10  这样7个UI的形式 小于7 这说明total <= 60不足以显示7个UI
   * @param currentPage 当前所在页数，判断前后时候有省略号
   * @param currentIndex 当前计算的index
   * @returns {string}
   */
  getPaginationCellText (total, cellCount = 7, currentPage, currentIndex) {
    let allPage = Math.ceil(total / 10) // allPage 总页数
    if(cellCount < 7 || allPage <= 7){
      // 只会有 [1,2,3,4,5,6]的形式，直接返回
      return '' + currentIndex
    }

    // 首页
    if(currentPage === 1){
      if(currentIndex < 6 || currentIndex === allPage){
        return  '' + currentIndex
      }
      return 'omitBack'
    }

    // 尾页
    if(currentPage === allPage){
      if(currentIndex > allPage - 5 || currentIndex === 1){
        return '' + currentIndex
      }
      return 'omitFront'
    }

    // 第二页（currentPage = 2）， 左边只有一位（首页），需要从右边多补齐一位
    if(currentPage === 2){
      if(currentIndex <= 5){
        return '' + currentIndex
      }
    }

    // 倒数第二页（allPage - 1），右边只有一位（尾页），需要从左边多补齐一位
    if(currentPage === allPage - 1){
      if(currentIndex > allPage - 5){
        return '' + currentIndex
      }
    }

    let pre = currentPage - 1
    let next = currentPage + 1

    // 首页、当前页、尾页、上一页、下一页必定显示数字
    if(currentIndex === currentPage || currentIndex === 1 || currentIndex === allPage || currentIndex === pre || currentIndex === next){
      return '' + currentIndex
    }

    // 2格以内 处理index = 3
    if(Math.abs(currentIndex - currentPage) <= 2 && currentPage <=3) {
      return '' + currentIndex
    }

    if(Math.abs(currentIndex - currentPage) <= 2 && currentPage >= allPage - 2) {
      return '' + currentIndex
    }

    // ['1','...',「3」,'4','5','...','9'] 像这种情况2就没必要用省略号了，直接显示
    if(Math.abs(currentIndex - currentPage) <= 2 && currentIndex - 1 <= 1) {
      return '' + currentIndex
    }
    // 同上
    if(Math.abs(currentIndex - currentPage) <= 2 && allPage - currentIndex <= 1) {
      return '' + currentIndex
    }

    // 其他的就直接返回省略号
    if(currentIndex < pre){
      return 'omitFront'
    }
    if(currentIndex > next){
      return 'omitBack'
    }
  },

  /**
   * 获取分页器初始化参数（前端）
   */
  getPaginationData (total, page, preHref, ctx) {
    let allPage = Math.ceil(total / 10)
    let cellCount = Math.min(allPage, 7)
    let paginationContent = []
    let keyMap = {}
    for (let i = 0; i < allPage; i ++){
      let text = this.getPaginationCellText(total, cellCount, page, i + 1)
      let href = preHref + text + ctx.search
      let item = {
        text: text,
        href: (text - 0 > 0) ? href : null,
        cursorPointer: true
      }
      if(keyMap[text]){
        continue
      }
      keyMap[text] = text
      if(page + '' === text){
        item.cellActive = true
      }
      if(text === 'omitFront' || text === 'omitBack'){
        item.cursorPointer = false
        item.text = '...'
      }
      paginationContent.push(item)
    }

    return  {
      content: paginationContent,
      textDisable: page === 1,
      leftDisable: page === 1,
      rightDisable: page === Math.ceil(total / 10),
      firstHref: page === 1 ? null : (preHref + '1') + ctx.search,
      preHref: (page === 1 || page - 1 < 1) ? null : preHref + (page - 1) + ctx.search,
      nextHref: (page === cellCount || page + 1 > Math.ceil(total / 10)) ? null : preHref + (page + 1) + ctx.search
    }
  },

  /**
   * 获取页面tdk信息
   * @param path
   * @param force 为true是未匹配到path对应的tdk则返回 null, 否则返回默认配置项，为true可能会在某些值为null的时候导致页面渲染错误
   * @returns {null|{path: string, keywords: string, description: string, title: string}|*}
   */

  getTdkByPath (path, force = false) {
    // 这里只能拿到url的path，如果有唯一key来处理会舒服很多，因为新闻详情的path会被改变
    let nodeCache = app.$nodeCache
    let constants = app.$constants

    if(!nodeCache.get('page_tdk_config')){
      return force ? null : constants.TDK_DEFAULT
    }

    let config = nodeCache.get('page_tdk_config')
    if(path && path !== '' && config[path]) {
      return config[path]
    }

    if(config['default'] && !force){
      return config['default']
    }

    return force ? null : constants.TDK_DEFAULT
  },

  /**
   * 转化tag为标准object格式
   * @param map
   * @param array
   * @returns {[]|*[]|*}
   */
  transTag (map, array) {
    const { $utils } = app
    if(!Array.isArray(array) || !map || $utils.isEmptyObject(map)){
      return array
    }
    if(!array || array.length < 1){
      return  []
    }
    let tmp = []
    array.forEach(item=>{
      let t = {
        key: item,
        name: map[item].name
      }
      tmp.push(t)
    })
    return tmp
  },

  /**
   * 获取ip
   * @param req
   * @returns {string|null}
   */

  getClientIP (req) {
    if(!req.headers){
      return null
    }
    let ip = req.headers['x-forwarded-for'] ||
      req.ip ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress || '';
    if(ip.split(',').length>0){
      ip = ip.split(',')[0]
    }
    ip = ip.substr(ip.lastIndexOf(':') + 1, ip.length)
    return ip
  },

  /**
   * 获取随机验证码
   * @returns {string}
   */
  getRandomCode () {
    const {SMS_CODE_LENGTH, SMS_CODE_CHAR_LENGTH, SMS_CODE_CHAR_SET } = app.$constants
    // 开发环境没必要发真的验证码，直接返回1，固定死
    if(process.env.NODE_ENV === 'development'){
      return '1'
    }
    let str = '';
    // 验证码有几位就循环几次
    for (let i = 0; i < SMS_CODE_LENGTH; i ++) {
      let ran = getRandom(0, SMS_CODE_CHAR_LENGTH);
      str += SMS_CODE_CHAR_SET.charAt(ran);
    }
    return str
  }
})
