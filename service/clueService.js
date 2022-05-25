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
    const { $utils, $log4, $model } = app
    const { errorLogger } = $log4
    const { bizClue } = $model

    let searchParams = {}
    if(startTime && endTime) {
      startTime = new Date(startTime)
      endTime = new Date(endTime)
      endTime = new Date(endTime.getTime() + (24 * 60 * 60 * 1000 - 1))
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
    let sortParam = {
      _id: -1
    }
    let list
    let total = await bizClue.find(searchParams).countDocuments()
    list = await bizClue.find(searchParams, null, {skip: pageSize * (page < 1 ? 0 : (page - 1)), limit: (pageSize - 0), sort: sortParam }, function (err){
      if(err){
        errorLogger.error(err)
      }
    })

    return { list, total }
  },
})
