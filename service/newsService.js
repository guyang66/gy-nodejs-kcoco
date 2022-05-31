module.exports = app => ({
  /**
   * 分页查询
   * @param page
   * @param pageSize
   * @param status
   * @param isTop
   * @param isRecommend
   * @param isHot
   * @param searchKey
   * @param category
   * @param orderSort
   * @param viewCountSort
   * @returns {Promise<{total: *, list: *}>}
   */
  async getList (page = 1, pageSize = 10, status, isTop, isRecommend, isHot, searchKey, category, orderSort, viewCountSort) {
    const { $utils, $log4, $model } = app
    const { errorLogger } = $log4
    const { pageNews } = $model
    let searchParams = {}
    if(searchKey && searchKey !== ''){
      let p1 = {
        "$or": [
          {
            "title":new RegExp(searchKey,'i')
          },
          {
            "summary":new RegExp(searchKey,'i')
          },
          {
            "author":new RegExp(searchKey,'i')
          },
          {
            "date":new RegExp(searchKey,'i')
          },
          {
            "search":{
              $elemMatch: {$regex: new RegExp(searchKey,'i')}
            }
          },
          {
            "tag":{
              $elemMatch: {$regex: new RegExp(searchKey,'i')}
            }
          }
        ]
      }
      let p2 = {}
      // status = 0 也会进入false判断
      if(status !== null && status !== undefined){
        p2.status = status
      }
      if(isTop !== null && isTop !== undefined){
        p2.isTop = isTop
      }
      if(isRecommend !== null && isRecommend !== undefined){
        p2.isRecommend = isRecommend
      }
      if(isHot !== null && isHot !== undefined){
        p2.isHot = isHot
      }
      if(category){
        p2.type = category
      }
      searchParams = $utils.isEmptyObject(p2) ? p1 : {"$and": [p1, p2]}
    } else {
      if(status !== null && status !== undefined){
        searchParams.status = status
      }
      if(isTop !== null && isTop !== undefined){
        searchParams.isTop = isTop
      }
      if(isRecommend !== null && isRecommend !== undefined){
        searchParams.isRecommend = isRecommend
      }
      if(isHot !== null && isHot !== undefined){
        searchParams.isHot = isHot
      }
      if(category){
        searchParams.type = category
      }
    }
    let sortParam = {}
    if(orderSort && orderSort !== ''){
      sortParam.order = orderSort === 'ascend' ? -1 : 1
    }
    if(viewCountSort && viewCountSort !== ''){
      sortParam.viewCount = viewCountSort === 'ascend' ? -1 : 1
    }
    // 按id 排序放最后
    sortParam._id = -1
    let total = await pageNews.find(searchParams).countDocuments()
    let list = await pageNews.find(searchParams, null, {skip: pageSize * (page < 1 ? 0 : (page - 1)), limit: (pageSize - 0), sort: sortParam }, function (err){
      if(err){
        console.log(err)
        errorLogger.error('【newsService】- getList：' + err.toString())
      }
    })
    return { list, total }
  },

  /**
   * （客户端）分页获取新闻列表
   * @param page
   * @param pageSize
   * @param params
   * @returns {Promise<{total: *, list: *}>}
   */
  async getMatchList (page = 1, pageSize = 10, params) {
    const { $log4, $model } = app
    const { errorLogger } = $log4
    const { pageNews } = $model
    const { searchKey, status, type } = params
    let list = []
    let searchParams = {}
    if(searchKey && searchKey !== ''){
      let p1 = {}
      if( status !== undefined && status !== null){
        p1.status = status
      }
      if(type && type !== ''){
        p1.type = type
      }
      let p2 = {
        "$or":
          [
            {
              "search":{
                $elemMatch: {$regex: new RegExp(searchKey,'i')}
              }
            },
            {
              "tag": {
                $elemMatch: {$regex: new RegExp(searchKey,'i')}
              }
            },
            {
              "title": new RegExp(searchKey,'i')
            },
            {
              "date": new RegExp(searchKey,'i')
            },
            {
              "author": new RegExp(searchKey,'i')
            },
            {
              "summary": new RegExp(searchKey,'i')
            }
          ]
      }
      searchParams = {
        "$and": [p1, p2]
      }
    } else {
      if( status !== undefined && status !== null){
        searchParams.status = status
      }
      if(type && type !== ''){
        searchParams.type = type
      }
    }

    // 置顶优先级大于排序
    let sortParam = {
      isTop: -1,
      order: -1,
      _id: -1
    }
    let total = await pageNews.find(searchParams).countDocuments()
    list = await pageNews.find(searchParams, null, {skip: pageSize * (page < 1 ? 0 : (page - 1)), limit: pageSize, sort : sortParam }, function (err, docs){
      if(err){
        errorLogger.error('【newsService】—— getMatchList：' + err.toString())
      }
    })
    return { list, total }
  },

  /**
   * （客户端）获取相邻文章
   * @param id
   * @param key
   * @returns {Promise<*|null>}
   */
  async getAdjacentDetailById (id, key){
    const { $log4, $model } = app
    const { errorLogger } = $log4
    const { pageNews } = $model
    let result
    try{
      if(key && key === 'prev'){
        result = await pageNews.findOne({'id': { '$lt': id }}).sort({ _id: -1})
      } else {
        result = await pageNews.findOne({'id': { '$gt': id }}).sort({ _id: 1})
      }
    } catch (e) {
      console.log(e)
      errorLogger.error('【newsService】—— getAdjacentDetailById：' + e.toString())
      return null
    }
    if(!result || result.status < 1){
      // 未被使用
      return null
    }
    return  result
  },

  /**
   * 新闻浏览量排名
   * @param top
   * @returns {Promise<this>}
   * @constructor
   */
  async StaticsViewCount (top) {
    const { $model, $service, $log4 } = app
    const { errorLogger } = $log4
    const { pageNews } = $model
    let limit = !top ? 100000 : top - 0
    let result
    try {
      result = await $service.baseService.query(pageNews,{},{},{ limit: limit, sort: { viewCount: -1}})
    } catch (e) {
      console.log(e)
      errorLogger('【newsService】- StaticsViewCount:' + e.toString())
    }
    let tmp = []
    result.forEach(item=>{
      tmp.push(
        {
          name: item.title,
          count: item.viewCount
        }
      )
    })
    tmp = tmp.sort((v1,v2)=>{
      if(v1.count < v2.count ){
        return 1
      } else {
        return -1
      }
    })
    return tmp
  }
})
