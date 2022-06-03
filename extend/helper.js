const errorCode = require('../common/errorCode')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const fs = require('fs')
const path = require('path')


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

const getStat = function (filePath) {
  // 封装为promise
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        resolve(false)
      } else {
        resolve(stats);
      }
    })
  })
}

const mkdir = function (dir) {
  // 封装为promise
  return new Promise((resolve, reject) => {
    fs.mkdir(dir, (err) => {
      if (err) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
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
        name: map[item] ? map[item].name : null
      }
      if(t.name){
        tmp.push(t)
      }
    })
    return tmp
  },

  /**
   * 获取ip(如果有代理服务器，注意添加转化)
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
    let { $config, $constants } = app;
    const {SMS_CODE_LENGTH, SMS_CODE_CHAR_LENGTH, SMS_CODE_CHAR_SET } = $constants
    // 开发环境没必要发真的验证码，直接返回1，固定死
    if(process.env.NODE_ENV !== 'production' || $config.smsMock){
      return '1'
    }
    let str = '';
    // 验证码有几位就循环几次
    for (let i = 0; i < SMS_CODE_LENGTH; i ++) {
      let ran = getRandom(0, SMS_CODE_CHAR_LENGTH);
      str += SMS_CODE_CHAR_SET.charAt(ran);
    }
    return str
  },

  /**
   * 生成token
   * @returns {Promise<void>}
   */
  async createToken( data ) {
    let { $config, $jwtKey } = app;
    // 测试环境用固定secret，不然一直重启，管理后台一直需要重新登录，影响开发效率
    if($config.jwt.resetWhenReload || process.env.NODE_ENV === 'production'){
      return await jwt.sign(data, $jwtKey, {expiresIn: 30 * 24 * 60 * 60 + 's'});
    }
    return await jwt.sign(data, $config.jwt.secret, {expiresIn: 30 * 24 * 60 * 60 + 's'});
  },

  /**
   * 检查token
   * @param token
   * @returns {Promise<void>}
   */
  async checkToken (token) {
    let { $config, $jwtKey } = app;
    if($config.jwt.resetWhenReload || process.env.NODE_ENV === 'production'){
      return await jwt.verify(token, $jwtKey)
    }
    return await jwt.verify(token, $config.jwt.secret)
  },

  /**
   * decode token
   * @param token
   * @returns {Promise<*>}
   */
  async decodeToken (token) {
    return await jwt.decode(token)
  },

  /**
   * 密码加密
   * @param password
   * @returns {Promise<string>}
   */
  async createPassword (password) {
    let { $config } = app;
    const hmac = crypto.createHash("sha256", $config.crypto.secret);
    hmac.update(password.toString());
    return hmac.digest("hex");
  },

  /**
   * 校验密码
   * @param password
   * @param dbPassword
   * @returns {Promise<boolean>}
   */
  async checkPassword (password, dbPassword) {
    let target = await this.createPassword(password);
    return target === dbPassword
  },

  /**
   * 根据path创建指定文件目录
   * @param dir
   * @returns {Promise<boolean|*>}
   */
  async pathToDir (dir) {
    let stat = await getStat(dir)
    // 如果该路径存在且不是文件，返回true
    if (stat && stat.isDirectory()) {
      return true
    } else if (stat) {  // 这个路径对应一个文件，无法再创建文件了
      return false
    }
    // 如果该路径不存在
    let tempDir = path.parse(dir).dir  //拿到上级路径
    // 递归判断，如果上级路径也不存在，则继续循环执行，直到存在
    let status = await this.pathToDir(tempDir)
    let mkdirStatus
    if (status) {
      mkdirStatus = await mkdir(dir)
    }
    return mkdirStatus
  },

  /**
   * 转化日期区间为可用查询条件
   * @param key
   * @returns {{startTime: Date, endTime: Date}|{startTime: null, endTime: null}}
   */
  getDateInterval(key){
    let startTime = null
    let endTime = null
    if(!key || key === '' || key === 'all'){
      return { startTime, endTime }
    }
    endTime = new Date(new Date().setHours(0,0,0,0) + (24 * 60 * 60 * 1000 - 1))
    if(key === 'last_one_day'){
      startTime = new Date(endTime.getTime() - (24 * 60 * 60 * 1000 - 1))
    } else if (key === 'last_three_day'){
      startTime = new Date(endTime.getTime() - (3 * 24 * 60 * 60 * 1000 - 1))
    } else if (key === 'last_one_week'){
      startTime = new Date(endTime.getTime() - (7 * 24 * 60 * 60 * 1000 - 1))
    } else if (key === 'last_one_month'){
      startTime = new Date(endTime.getTime() - (30 * 24 * 60 * 60 * 1000 - 1))
    } else if (key === 'last_three_month'){
      startTime = new Date(endTime.getTime() - (90 * 24 * 60 * 60 * 1000 - 1))
    } else if (key === 'last_one_year'){
      startTime = new Date(endTime.getTime() - (365 * 24 * 60 * 60 * 1000 - 1))
    } else {
      startTime = new Date(endTime.getTime() - (24 * 60 * 60 * 1000 - 1))
    }
    // startTime = this.localTimeZone(startTime,true)
    // endTime = this.localTimeZone(endTime,true)
    return { startTime, endTime }
  },

  /**
   * 日期分组个数
   * @param key
   * @returns {number}
   */
  getDateCount (key) {
    let count = 0
    if(key === 'last_one_day'){
      count = 1
    } else if (key === 'last_three_day'){
      count = 3
    } else if (key === 'last_one_week'){
      count = 7
    } else if (key === 'last_one_month'){
      count = 30
    } else if (key === 'last_three_month'){
      count = 30 * 3
    } else if (key === 'last_one_year'){
      count = 365
    } else {
      count = 1
    }
    return count
  },

  /**
   * 时间区间转化
   * @param key
   * @returns {{min: null, max: null}|{min: number, max: number}}
   */
  getTimeInterval (key) {
    let min = null
    let max = null
    if(!key || key === '' || key === 'all'){
      return { min, max }
    }
    if(key === '2s-1m'){
      min = 2
      max = 60
    } else if(key === '2s-3m'){
      min = 2
      max = 3 * 60
    } else if(key === '2s-5m'){
      min = 2
      max = 5 * 60
    } else if(key === '2s-10m'){
      min = 2
      max = 10 * 60
    } else if(key === '2s-30m'){
      min = 2
      max = 30 * 60
    } else {
      min = 2
      max = 60
    }
    return { min, max }
  },

  /**
   * 时区本地化（无论你处于那个时区，都显示本地时间，避免时差带来的8小时误差，导致统计数据误差很大）
   * @param v
   */
  localDate(v){
    const d = new Date(v || Date.now())
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString()
  },

  /**
   * 转化为系统时区（查询的时候）自动转化为零时区
   * 比如查询的时候你查询2022-01-02日期的数据，如果不转化时区，则会把2022-01-03凌晨的数据也查询出来，但是前端显示正常（因为数据库的时区和前端时区不一样）
   * new Date().getTimezoneOffset() = -480: 获取本地时差（分钟），比如我本地（中国）是-480（即相差8个小时）
   *
   * 解决方案：
   * 1、数据库设置时区
   * 2、转化时区，统一的时区下去处理数据，如给save加一层拦截器
   * 3、mongoose-timezone用插件来做，插件也可能有问题，
   * 4、将日期存储为字符串，需要用的时候取出来解析成日期
   */
  localTimeZone(v){
    const d = new Date(v || Date.now())
    let dateOffset = new Date().getTimezoneOffset()
    if(dateOffset < 0){
      // todo:正时差还没测试过，
      return new Date(d.setMinutes(d.getMinutes() + d.getTimezoneOffset()))
    }
    return d
  }
})
