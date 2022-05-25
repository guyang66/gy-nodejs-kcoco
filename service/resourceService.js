module.exports = app => ({

  /**
   * 分页获取资源列表
   * @param page
   * @param pageSize
   * @param status
   * @param searchKey
   * @param category
   * @param orderSort
   * @param downloadSort
   * @returns {Promise<{total: *, list: *}>}
   */
  async getList (page = 1, pageSize = 10, status, searchKey, category, orderSort, downloadSort) {
    const { $utils, $log4, $model } = app
    const { errorLogger } = $log4
    const { pageResourceDownload } = $model

    let searchParams = {}
    if(searchKey && searchKey !== ''){
      let p1 = {
        "$or": [
          {
            "title": new RegExp(searchKey,'i')
          },
          {
            "desc": new RegExp(searchKey,'i')
          },
          {
            "date": new RegExp(searchKey,'i')
          },
          {
            "type": new RegExp(searchKey,'i')
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
      if(category){
        p2.key = category
      }
      if(status !== null && status !== undefined){
        p2.status = status
      }
      searchParams = $utils.isEmptyObject(p2) ? p1 : {"$and": [p1, p2]}
    } else {
      if(status !== null && status !== undefined){
        searchParams.status = status
      }
      if(category){
        searchParams.key = category
      }
    }
    let sortParam = {}
    if(downloadSort && downloadSort !== ''){
      sortParam.download = downloadSort === 'ascend' ? -1 : 1
    }
    if(orderSort && orderSort !== ''){
      sortParam.order = orderSort === 'ascend' ? -1 : 1
    }
    sortParam._id = -1
    let list
    let total = await pageResourceDownload.find(searchParams).countDocuments()
    list = await pageResourceDownload.find(searchParams, null, {skip: pageSize * (page < 1 ? 0 : (page - 1)), limit: (pageSize - 0), sort: sortParam }, function (err){
      if(err){
        errorLogger.error(err)
      }
    })

    return { list, total }
  },
})
