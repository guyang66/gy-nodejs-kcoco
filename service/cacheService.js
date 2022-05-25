module.exports = app => ({

  /**
   * 分页获取缓存列表
   * @param page
   * @param pageSize
   * @param status
   * @param searchKey
   * @returns {Promise<{total: *, list: *}>}
   */
  async getList (page = 1, pageSize = 10, status, searchKey) {
    const { $utils, $log4, $model } = app
    const { errorLogger } = $log4
    const { sysCache } = $model

    let searchParams = {}
    if(searchKey && searchKey !== ''){
      let p1 = {
        "$or": [
          {
            "name": new RegExp(searchKey,'i')
          },
          {
            "key": new RegExp(searchKey,'i')
          },
        ]
      }
      let p2 = {}
      if(status !== null && status !== undefined){
        p2.status = status
      }
      searchParams = $utils.isEmptyObject(p2) ? p1 : {"$and": [p1, p2]}
    } else {
      if(status !== null && status !== undefined){
        searchParams.status = status
      }
    }
    let sortParam = {
      _id: -1
    }
    let list
    let total = await sysCache.find(searchParams).countDocuments()
    list = await sysCache.find(searchParams, null, {skip: pageSize * (page < 1 ? 0 : (page - 1)), limit: (pageSize - 0), sort: sortParam }, function (err){
      if(err){
        errorLogger.error(err)
      }
    })

    return { list, total }
  },
})
