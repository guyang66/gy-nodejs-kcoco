module.exports = app => ({
  /**
   * 搜索关键词统计
   * @param params
   * @returns {Promise<any[]>}
   * @constructor
   */
  async StaticsKeywords (params) {
    const { $model, $log4 } = app
    const { errorLogger } = $log4
    const { bizSearchKey } = $model
    const { startTime, endTime, type } = params
    let queryParams = {
      type: type
    }
    if(startTime && endTime) {
      queryParams.createTime = {"$gt": startTime, "$lt": endTime}
    }
    // 聚合
    let groupResult = await bizSearchKey.aggregate(
      [
        { $match: { ...queryParams}},
        { $group: { _id: "$key" , count:  { $sum: 1 }}}
      ],
      function (err,doc) {
        if(err){
          console.log(err)
          errorLogger.error('【searchKeyService】- StaticsKeywords - aggregate:' + err.toString())
        }
      }
    )
    let tmp = []
    groupResult.forEach(item=>{
      tmp.push({
        name: item._id,
        count: item.count
      })
    })
    tmp = tmp.sort((v1,v2)=>{
      if(v1.count < v2.count ){
        return 1
      } else {
        return -1
      }
    })
    return tmp.slice(0, 20)
  },
  /**
   * 获取热门搜索词
   * @param type
   * @param count
   * @returns {Promise<*[]>}
   */
  async getTopKeywords (type, count = 10000) {
    const { $model, $log4 } = app
    const { errorLogger } = $log4
    const { bizSearchKey } = $model
    let queryParams = { type: type }
    // 聚合
    let groupResult = await bizSearchKey.aggregate(
      [
        { $match: { ...queryParams}},
        { $group: { _id: "$key" , count:  { $sum: 1 }}}
      ],
      function (err,doc) {
        if(err){
          console.log(err)
          errorLogger.error('【searchKeyService】- getTopKeywords - aggregate:' + err.toString())
        }
      }
    )
    groupResult = groupResult.sort((v1,v2)=>{
      if(v1.count < v2.count ){
        return 1
      } else {
        return -1
      }
    })
    let tmp = []
    groupResult.forEach(item=>{
      tmp.push(item._id)
    })
    return tmp.slice(0, count)
  }
})
