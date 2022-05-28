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
        console.log(err)
        errorLogger.error('【resourceService】- getList：' + err.toString())
      }
    })

    return { list, total }
  },

  /**
   * 更新资源下载量
   * @param id
   * @param num
   * @returns {Promise<boolean>}
   */
  async updateResourceCount (id, count) {
    const { $model } = app
    const { pageResourceDownload } = $model
    try {
      await pageResourceDownload.findByIdAndUpdate(id, {$inc: { download: count}})
      return true
    } catch (e){
      console.log(e)
      return false
    }
  },

  /**
   * 分页获取资源埋点数据列表
   * @param page
   * @param pageSize
   * @returns {Promise<{total: *, list: *}>}
   */
  async getRecordList (page = 1, pageSize = 10) {
    const { $model, $log4 } = app
    const { errorLogger } = $log4
    const { bizResourceRecord } = $model
    let searchParams = {}
    let sortParam = {_id: -1}
    // 这里需要联表查询
    const joinFind = new Promise((resolve,reject)=>{
      bizResourceRecord.find(searchParams, null, {skip: pageSize * (page < 1 ? 0 : (page - 1)), limit: (pageSize - 0), sort : sortParam}).populate('objectId').exec((err,docs)=>{
        if(err){
          console.log(err)
          errorLogger.error('【resourceService】-getRecordList - joinFind:' + err.toString())
          reject(err)
        } else {
          resolve(docs)
        }
      })
    })
    let total = await bizResourceRecord.find(searchParams).countDocuments()
    let list = await joinFind
    return { list, total }
  },

  /**
   * 获取分类统计数据
   * @param params
   * @returns {Promise<boolean|[]>}
   * @constructor
   */
  async StaticsType (params) {
    const { $model, $log4 } = app
    const { bizResourceRecord } = $model
    const { errorLogger } = $log4
    const { startTime, endTime } = params
    let p1 = {
      type: 'download'
    }
    let p2 = {
      type: 'click'
    }
    if(startTime && endTime) {
      p1.createTime = {"$gt": startTime, "$lt": endTime}
      p2.createTime = {"$gt": startTime, "$lt": endTime}
    }
    let list = []
    try {
      let r2 = await bizResourceRecord.find(p2).countDocuments()
      list.push({
        name: '总点击量',
        count: r2,
        type: 'click'
      })
      let r1 = await bizResourceRecord.find(p1).countDocuments()
      list.push({
        name: '总下载量',
        count: r1,
        type: 'download'
      })
      return list
    } catch (e){
      errorLogger.error('【resourceService】- StaticsType:' + e.toString())
      console.log(e)
      return false
    }
  },

  /**
   * 分类统计资源名字
   * @param params
   * @returns {Promise<this>}
   * @constructor
   */
  async StaticsName (params) {
    const { $model,$log4 } = app
    const { errorLogger } = $log4
    const { bizResourceRecord, pageResourceDownload } = $model
    const { type, startTime, endTime } = params
    let queryParams = {}
    if(type && type !== 'all'){
      queryParams.type = type
    }
    if(startTime && endTime) {
      queryParams.createTime = {"$gt": startTime, "$lt": endTime}
    }
    let list
    try {
      list = await bizResourceRecord.distinct('objectId', queryParams)
    } catch (e){
      console.log(e)
      errorLogger.error('【resourceService】- StaticsName - distinct:' + e.toString())
    }
    let tmp = []
    for(let i = 0 ; i < list.length; i++){
      let resourceDetail
      try {
        resourceDetail = await pageResourceDownload.findById(list[i])
      } catch (e) {
        console.log(e)
        errorLogger.error('【resourceService】- StaticsName - findById:' + e.toString())
      }
      let q = { objectId: list[i]}
      if(startTime && endTime) {
        q.createTime = {"$gt": startTime, "$lt": endTime}
      }
      if(type && type !== 'all'){
        q.type = type
      }

      let total
      try {
        total = await bizResourceRecord.find(q).countDocuments()
      } catch (e) {
        console.log(e)
        errorLogger.error('【resourceService】- StaticsName - countDocuments:' + e.toString())
      }
      tmp.push({
        name: resourceDetail.title || '未知',
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
})
