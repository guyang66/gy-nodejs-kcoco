module.exports = app => ({

  /**
   * 搜索关键词统计
   * @param params
   * @returns {Promise<any[]>}
   * @constructor
   */
  async StaticsKeywords (params) {
    const { $model } = app
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
      ]
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
  }
})
