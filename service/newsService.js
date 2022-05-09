module.exports = app => ({
  /**
   * 分页查询
   * @param id
   * @param model
   * @returns {Promise<*|boolean>}
   */
  async getList (page = 1, pageSize = 10, params, sort) {
    const { errorLogger } = app.$log4
    const { pageNews } = app.$model

    let list = []
    let searchParams = {...params}

    let sortParam = sort ? sort : { _id: -1 }

    list = await pageNews.find(searchParams, null, {skip: pageSize * (page < 1 ? 0 : (page - 1)), limit: pageSize, sort : sortParam }, function (err, docs){
      if(err){
        errorLogger.error('【newsService】—— getList：' + err.toString())
      }
    })
    return list
  },

  /**
   * 获取官网查询的新闻列表
   */
  async getMatchList (page = 1, pageSize = 10, params) {
    const { errorLogger } = app.$log4
    const { pageNews } = app.$model
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

    let sortParam = {
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
   * 客户端获取相邻文章
   * @param id
   * @param key
   * @returns {Promise<*|null>}
   */
  async getAdjacentDetailById (id, key){
    const { pageNews } = app.$model
    const { errorLogger } = app.$log4
    let result
    try{
      if(key && key === 'prev'){
        result = await pageNews.findOne({'id': { '$lt': id }}).sort({ _id: -1})
      } else {
        result = await pageNews.findOne({'id': { '$gt': id }}).sort({ _id: 1})
      }
    } catch (e) {
      errorLogger.error('【newsService】—— getAdjacentDetailById：' + e.toString())
      return null
    }
    if(!result || result.status < 1){
      // 未被使用
      return null
    }
    return  result
  },
})
