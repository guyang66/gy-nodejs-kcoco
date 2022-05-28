module.exports = app => ({
  /**
   * 分页查询
   * @param page
   * @param pageSize
   * @param status
   * @param searchKey
   * @param orderSort
   * @returns {Promise<{total: *, list: *}>}
   */
  async getList (page = 1, pageSize = 10, status, searchKey, orderSort) {
    const { $utils, $log4, $model } = app
    const { errorLogger } = $log4
    const { pageCase } = $model

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
            "key":{
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
      searchParams = $utils.isEmptyObject(p2) ? p1 : {"$and": [p1, p2]}
    } else {
      if(status !== null && status !== undefined){
        searchParams.status = status
      }
    }
    let sortParam = {}
    if(orderSort && orderSort !== ''){
      sortParam.order = orderSort === 'ascend' ? -1 : 1
    }
    sortParam._id = -1
    let total = await pageCase.find(searchParams).countDocuments()
    let list = await pageCase.find(searchParams, null, {skip: pageSize * (page < 1 ? 0 : (page - 1)), limit: (pageSize - 0), sort: sortParam }, function (err){
      if(err){
        console.log(err)
        errorLogger.error('【caseService】- getList:' + err.toString())
      }
    })
    return { list, total }
  },

  /**
   * 案例访问数据
   * @returns {Promise<this>}
   * @constructor
   */
  async StaticsVisit (params) {
    const { $model, $service, $log4 } = app
    const { errorLogger } = $log4
    const { pageCase, bizCaseRecord } = $model
    let { startTime, endTime, top } = params
    let limit = !top ? 100000 : top - 0
    let searchParams = {}
    if(startTime && endTime){
      searchParams.createTime = {"$gt": startTime, "$lt": endTime}
    }
    // 这里需要联表查询
    let groupResult = await bizCaseRecord.aggregate(
      [
        { $match: { ...searchParams}},
        { $group: { _id: "$objectId" , count:  { $sum: 1 }}}
      ],
      function (err) {
        if(err){
          errorLogger.error('【clueService】- StaticsVisit - aggregate:' + err.toString())
        }
      }
    )
    let tmp = []
    for(let i = 0; i < groupResult.length; i++){
      // todo：优化：数据一多，这里同步查询肯定慢
      let caseDetail
      try {
        caseDetail = await $service.baseService.queryById(pageCase, groupResult[i]._id)
      } catch (e) {
        console.log(e)
        errorLogger.error('【caseService】- StaticsVisit - queryById:' + e.toString())
      }
      tmp.push(
        {
          name: caseDetail.title,
          count: groupResult[i].count
        }
      )
    }
    tmp = tmp.sort((v1,v2)=>{
      if(v1.count < v2.count ){
        return 1
      } else {
        return -1
      }
    })
    return tmp.slice(0, limit)
  }
})
