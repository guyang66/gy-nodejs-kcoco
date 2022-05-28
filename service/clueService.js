module.exports = app => ({
  /**
   * 分页获取线索
   * @param page
   * @param pageSize
   * @param searchKey
   * @param startTime
   * @param endTime
   * @returns {Promise<{total: *, list: *}>}
   */
  async getList (page = 1, pageSize = 10, searchKey, startTime, endTime) {
    const { $utils, $log4, $model, $format } = app
    const { errorLogger } = $log4
    const { bizClue } = $model
    let searchParams = {}
    if(startTime && endTime) {
      startTime = $format.getCurrentDayStart(startTime)
      endTime = $format.getCurrentDayEnd(endTime)
    }
    if(searchKey && searchKey !== ''){
      let p1 = {
        "$or": [
          {
            "company": new RegExp(searchKey,'i')
          },
          {
            "email": new RegExp(searchKey,'i')
          },
          {
            "phone": new RegExp(searchKey,'i')
          },
          {
            "position": new RegExp(searchKey,'i')
          },
          {
            "name": new RegExp(searchKey,'i')
          },
          {
            "need": new RegExp(searchKey,'i')
          },
          {
            "origin": new RegExp(searchKey,'i')
          },
          {
            "pageOrigin": new RegExp(searchKey,'i')
          },
          {
            "ip": new RegExp(searchKey,'i')
          }
        ]
      }
      let p2 = {}
      if(startTime && endTime){
        p2.createTime = {"$gt": startTime, "$lt": endTime}
      }
      searchParams = $utils.isEmptyObject(p2) ? p1 : {"$and": [p1, p2]}
    } else {
      if (startTime && startTime) {
        searchParams.createTime = {"$gt": startTime, "$lt": endTime}
      }
    }
    let sortParam = {_id: -1}
    let total = await bizClue.find(searchParams).countDocuments()
    let list = await bizClue.find(searchParams, null, {skip: pageSize * (page < 1 ? 0 : (page - 1)), limit: (pageSize - 0), sort: sortParam }, function (err){
      if(err){
        console.log(err)
        errorLogger.error('【clueService】- getList:' + err.toString())
      }
    })

    return { list, total }
  },

  /**
   * 统计指定字段分类和sum
   * @returns {Promise<this>}
   */
  async staticsColumn (params) {
    const { $model, $log4 } = app
    const { errorLogger } = $log4
    const { bizClue } = $model
    const { startTime, endTime, column } = params
    let queryParams = {}
    if(startTime && endTime) {
      queryParams.createTime = {"$gt": startTime, "$lt": endTime}
    }
    let list = await bizClue.distinct(column, queryParams)
    let tmp = []
    // 数据量大了之后，遍历查询效率会很低。
    // 这里可以用聚合（类似 group by，请自行查阅文档或者其他示例）来查询，只用一次查询就拿到结果，
    for(let i = 0 ; i < list.length; i++){
      let q = {}
      q[column] = list[i]
      if(startTime && endTime) {
        q.createTime = {"$gt": startTime, "$lt": endTime}
      }
      let total
      try {
        total = await bizClue.find(q).countDocuments()
      } catch (e) {
        console.log(e)
        errorLogger.error('【clueService】- staticsColumn:' + e.toString())
      }
      tmp.push({
        name: list[i],
        count: total
      })
    }
    tmp = tmp.sort((v1,v2)=>{
      if(v1.count < v2.count ){
        return 1
      } else {
        return -1
      }
    })
    return tmp
  },

  /**
   * 统计来源入口数据
   * @param params
   * @returns {Promise<this>}
   */
  async staticsOriginHref (params) {
    const { $nodeCache, $model, $log4 } = app
    const { errorLogger } = $log4
    const { bizClue } = $model
    let { startTime, endTime } = params
    if(startTime){
      startTime = new Date(startTime)
    }
    if(endTime){
      endTime = new Date(endTime)
      endTime = new Date(endTime.getTime() + (24 * 60 * 60 * 1000 - 1))
    }
    let queryParams = {}
    if(startTime && endTime) {
      queryParams.createTime = {"$gt": startTime, "$lt": endTime}
    }
    let list
    try {
      list = await bizClue.distinct('originHref', queryParams)
    } catch (e) {
      console.log(e)
      errorLogger.error('【clueService】- staticsOriginHref - distinct:' + e.toString())
    }
    let tmp = []
    for(let i = 0 ; i < list.length; i++){
      let q = {originHref: list[i]}
      if(startTime && endTime) {
        q.createTime = {"$gt": startTime, "$lt": endTime}
      }
      let total
      // 用 try catch 保证不退出循环
      try {
        total = await bizClue.find(q).countDocuments()
      } catch (e) {
        console.log(e)
        errorLogger.error('【clueService】- staticsOriginHref - countDocuments:' + e.toString())
      }
      tmp.push({
        name: list[i],
        count: total
      })
    }
    //合并同一种页面
    const tdk = $nodeCache.get('page_tdk_config')
    let tagMap = {}
    const pushItem = (obj) => {
      if(tagMap[obj.name]){
        tagMap[obj.name].count = tagMap[obj.name].count + obj.count
      } else {
        tagMap[obj.name] = obj
      }
    }
    tmp.forEach(item=>{
      let target = tdk[item.name]
      if(target){
        pushItem({
          name: target.name,
          count: item.count
        })
      } else if (item.name === '/'){
        // 首页 / 和 /index 都是首页，合并掉
        pushItem({
          name: tdk['/index'].name,
          count: item.count
        })
      } else if (item.name.indexOf('/about/news/detail/') > -1){
        pushItem({
          name: '新闻详情',
          count: item.count
        })
      } else if (item.name.indexOf('/about/news/') > -1){
        // 新闻是有分页的需要合并
        pushItem({
          name: '新闻列表',
          count: item.count
        })
      } else {
        pushItem({
          name: '其它',
          count: item.count
        })
      }
    })

    // 拍平对象
    let result = []
    for(let key in tagMap){
      result.push(tagMap[key])
    }

    result = result.sort((v1,v2)=>{
      if(v1.count < v2.count ){
        return -1
      } else {
        return 1
      }
    })
    return result
  },

  /**
   * 计算区间内线索总数量
   */
  async staticsCount (startTime, endTime) {
    const { $model, $format, $log4 } = app
    const { errorLogger } = $log4
    const { bizClue } = $model
    let searchParams = {}
    if(startTime && endTime) {
      startTime = $format.getCurrentDayStart(startTime)
      endTime = $format.getCurrentDayEnd(endTime)
    }
    if(startTime && endTime) {
      searchParams.createTime = {"$gt": startTime, "$lt": endTime}
    }
    let total
    try {
      total = await bizClue.find(searchParams).countDocuments()
    } catch (e) {
      console.log(e)
      errorLogger.error('【clueService】- staticsCount:' + e.toString())
    }
    if(total !== null && total !== undefined){
      return total
    } else {
      return false
    }
  }
})
