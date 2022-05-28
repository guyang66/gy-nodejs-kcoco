module.exports = app => ({
  /**
   * 分页获取案例访问记录列表（埋点）
   * @param page
   * @param pageSize
   * @param searchKey
   * @param startTime
   * @param endTime
   * @returns {Promise<{total: *, list: unknown}>}
   */
  async getCaseRecordList (page = 1, pageSize = 10, searchKey, startTime, endTime) {
    const { $utils, $log4, $model, $format } = app
    const { errorLogger } = $log4
    const { bizCaseRecord } = $model
    let searchParams = {}
    if(startTime && endTime) {
      startTime = $format.getCurrentDayStart(startTime)
      endTime = $format.getCurrentDayEnd(endTime)
    }
    if(searchKey && searchKey !== ''){
      let p1 = {
        "$or": [
          {
            "type": new RegExp(searchKey,'i')
          },
          {
            "typeString": new RegExp(searchKey,'i')
          },
          {
            "name": new RegExp(searchKey,'i')
          },
          {
            "phone": new RegExp(searchKey,'i')
          },
          {
            "ip": new RegExp(searchKey,'i')
          },
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

    const joinFind = new Promise((resolve,reject)=>{
      bizCaseRecord.find(searchParams, null, {skip: pageSize * (page < 1 ? 0 : (page - 1)), limit: (pageSize - 0), sort : sortParam}).populate('objectId').exec((err,docs)=>{
        if(err){
          errorLogger.error('【recordService】-getCaseRecordList-joinFind:' + err.toString())
          reject(err)
        } else {
          resolve(docs)
        }
      })
    })
    let total = await bizCaseRecord.find(searchParams).countDocuments()
    let list = await joinFind
    return { list, total }
  },

  /**
   * 分页获取活动埋点记录列表
   * @param page
   * @param pageSize
   * @param category
   * @param searchKey
   * @param startTime
   * @param endTime
   * @returns {Promise<{total: *, list: *}>}
   */
  async getActivityRecordList (page = 1, pageSize = 10, category, searchKey, startTime, endTime) {
    const { $utils, $log4, $model, $format } = app
    const { errorLogger } = $log4
    const { bizActivityRecord } = $model
    let searchParams = {}
    if(startTime && endTime) {
      startTime = $format.getCurrentDayStart(startTime)
      endTime = $format.getCurrentDayEnd(endTime)
    }
    //todo:注意mongodb的时区，可能落后8小时，夏令时的问题，发现凌晨00:01:01的时间被记录为第二天的上午12:01:01，很鸡贼！
    // 有些系统00:00:00会被划分到前一天，有的系统会被划分为第二天...所以处理不带时分秒的时间时一点要谨慎。这些问题也是边做边遇到的，所以架构很重要
    if(searchKey && searchKey !== ''){
      let p1 = {
        "$or": [
          {
            "type": new RegExp(searchKey,'i')
          },
          {
            "typeString": new RegExp(searchKey,'i')
          },
          {
            "name": new RegExp(searchKey,'i')
          },
          {
            "phone": new RegExp(searchKey,'i')
          },
          {
            "ip": new RegExp(searchKey,'i')
          },
        ]
      }
      let p2 = {}
      if(startTime && endTime){
        p2.createTime = {"$gt": startTime, "$lt": endTime}
      }
      if(category && category !== 'all' && category !== ''){
        p2.category = category
      }
      searchParams = $utils.isEmptyObject(p2) ? p1 : {"$and": [p1, p2]}
    } else {
      if (startTime && startTime) {
        searchParams.createTime = {"$gt": startTime, "$lt": endTime}
      }
      if(category && category !== 'all' && category !== ''){
        searchParams.category = category
      }
    }
    let sortParam = {
      _id: -1
    }
    let list
    let total = await bizActivityRecord.find(searchParams).countDocuments()
    list = await bizActivityRecord.find(searchParams, null, {skip: pageSize * (page < 1 ? 0 : (page - 1)), limit: (pageSize - 0), sort: sortParam }, function (err){
      if(err){
        errorLogger.error('【recordService】- getActivityRecordList:' + err.toString())
      }
    })

    return { list, total }
  },

  /**
   * 分页获取pv记录列表
   * @param page
   * @param pageSize
   * @param searchKey
   * @param startTime
   * @param endTime
   * @returns {Promise<{total: *, list: *}>}
   */
  async getPvList (page = 1, pageSize = 10, searchKey, startTime, endTime) {
    const { $utils, $log4, $model, $format } = app
    const { errorLogger } = $log4
    const { bizPv } = $model
    let searchParams = {}
    if(startTime && endTime) {
      startTime = $format.getCurrentDayStart(startTime)
      endTime = $format.getCurrentDayEnd(endTime)
    }
    if(searchKey && searchKey !== ''){
      let p1 = {
        "$or": [
          {
            "pageName": new RegExp(searchKey,'i')
          },
          {
            "path": new RegExp(searchKey,'i')
          },
          {
            "name": new RegExp(searchKey,'i')
          },
          {
            "phone": new RegExp(searchKey,'i')
          },
          {
            "ip": new RegExp(searchKey,'i')
          },
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
    let total = await bizPv.find(searchParams).countDocuments()
    let list = await bizPv.find(searchParams, null, {skip: pageSize * (page < 1 ? 0 : (page - 1)), limit: (pageSize - 0), sort: sortParam }, function (err){
      if(err){
        errorLogger.error('【recordService】- getPvList:' + err.toString())
      }
    })
    return { list, total }
  },

  /**
   * 统计pv
   * @param params
   * @returns {Promise<any[]>}
   * @constructor
   */
  async StaticsPvVisit (params) {
    const { $model, $log4 } = app
    const { errorLogger } = $log4
    const { bizPv } = $model
    let { startTime, endTime, top } = params
    let limit = !top ? 100000 : top - 0
    let searchParams = {}
    if(startTime && endTime){
      searchParams.createTime = {"$gt": startTime, "$lt": endTime}
    }
    let groupResult = await bizPv.aggregate(
      [ { $match: { ...searchParams}},
        { $group: { _id: "$pageName" , count:  { $sum: 1 }}},
        { $sort: { count: -1}}
      ],
      function (err,doc) {
        if(err){
          errorLogger.error('【recordService】- StaticsPvVisit - aggregate:' + err.toString())
        }
      }
    )
    let tmp = []
    for(let i = 0 ; i < groupResult.length; i++){
      tmp.push({
        name: groupResult[i]._id || '未知',
        count: groupResult[i].count
      })
    }
    tmp = tmp.sort((v1,v2)=>{
      if(v1.count < v2.count ){
        return 1
      } else {
        return -1
      }
    })
    return tmp.slice(0, limit)
  },

  /**
   * pv趋势数据（按日期）
   * @param params
   *      count：周期/日期
   *      path：页面名字，不指定则为全部页面
   * @returns {Promise<this>}
   * @constructor
   */
  async StaticsPvLine (params) {
    const { $model, $format, $log4 } = app
    const { errorLogger } = $log4
    const { bizPv } = $model
    const { count, path } = params
    let endTime = new Date(new Date().setHours(0,0,0,0) + (24 * 60 * 60 * 1000 * 2 - 1))
    let startTime = new Date(new Date().setHours(0,0,0,0) + (24 * 60 * 60 * 1000 ) + 1)
    let tmp = []
    let queryParams = {}
    if(path && path !== ''){
      queryParams.path = path
    }
    // 通过日期来聚合/分组，计算每一天的访问量
    // $dateToString: { format: "%Y-%m-%d", date: "$createTime" } 怎么去矫正这个时区
    // todo: key = '2022-05-26' 会把2022-05-27 00:01:01的数据匹配到 得加个时区，前端实现是没有问题的，查询的时候会出错
    let groupResult = await bizPv.aggregate(
      [ { $match: queryParams},
        { $project: { yearMonthDay: { $dateToString: { format: "%Y-%m-%d", date: "$createTime", timezone: "+08:00" } }}},
        { $group: { _id:  "$yearMonthDay", count:  { $sum: 1 }}},
        { $sort: { count: -1}}
      ],
      function (err,doc) {
        if(err){
          console.log(err)
          errorLogger.error('【recordService】- StaticsPvLine - aggregate:' + err.toString())
        }
      }
    )
    let groupResultMap = {}
    groupResult.forEach(item=>{
      groupResultMap[item._id] = item
    })
    for(let i = 0 ; i < count; i++){
      endTime = new Date(endTime.getTime() - (24 * 60 * 60 * 1000))
      startTime = new Date(startTime.getTime() - (24 * 60 * 60 * 1000))
      let dateTag = $format.formatDateYYMMDD(startTime)
      if(groupResultMap[dateTag]){
        tmp.push({
          key: 'pv',
          name: dateTag,
          count: groupResultMap[dateTag].count
        })
      } else {
        tmp.push({
          key: 'pv',
          name: dateTag,
          count: 0
        })
      }
    }
    // 按日期从大到小排序，方便前端使用
    tmp = tmp.sort((v1,v2)=>{
      if(new Date(v1.name).getTime() > new Date(v2.name).getTime()){
        return 1
      } else {
        return -1
      }
    })
    return tmp
  },

  /**
   * UV趋势数据
   * @param params
   *      count：周期/日期
   *      path：页面名字，不指定则为全部页面
   * @returns {Promise<this>}
   * @constructor
   */
  async StaticsUvLine (params) {
    const { $model, $format, $log4 } = app
    const { errorLogger } = $log4
    const { bizPv } = $model
    const { count, path } = params
    let queryParams = {}
    if(path && path !== ''){
      queryParams.path = path
    }
    let endTime = new Date(new Date().setHours(0,0,0,0) + (24 * 60 * 60 * 1000 * 2 - 1))
    let startTime = new Date(new Date().setHours(0,0,0,0) + (24 * 60 * 60 * 1000 ) + 1)
    let groupResult = await bizPv.aggregate(
      [ { $match: queryParams},
        { $project: { yearMonthDay: { $dateToString: { format: "%Y-%m-%d", date: "$createTime", timezone: "+08:00" }}, ip: "$ip"}},
        { $group: { _id:  "$yearMonthDay", count:  { $addToSet: "$ip" }}}
      ],
      // 回调函数
      function (err,doc) {
        if(err){
          console.log(err)
          errorLogger.error('【recordService】- StaticsUvLine - aggregate:' + err.toString())
        }
      }
    )
    let groupResultMap = {}
    groupResult.forEach(item=>{
      groupResultMap[item._id] = {
        _id: item._id,
        count: item.count.length
      }
    })
    let tmp = []
    for(let i = 0 ; i < count; i++){
      endTime = new Date(endTime.getTime() - (24 * 60 * 60 * 1000))
      startTime = new Date(startTime.getTime() - (24 * 60 * 60 * 1000))
      let dateTag = $format.formatDateYYMMDD(startTime)
      if(groupResultMap[dateTag]){
        tmp.push({
          key: 'uv',
          name: dateTag,
          count: groupResultMap[dateTag].count
        })
      } else {
        tmp.push({
          key: 'uv',
          name: dateTag,
          count: 0
        })
      }
    }
    // 按日期排序
    tmp = tmp.sort((v1,v2)=>{
      if(new Date(v1.name).getTime() > new Date(v2.name).getTime()){
        return 1
      } else {
        return -1
      }
    })
    return tmp
  },

  /**
   * 分页获取tp记录列表
   * @param page
   * @param pageSize
   * @param searchKey
   * @param startTime
   * @param endTime
   * @returns {Promise<{total: *, list: *}>}
   */
  async getTpList (page = 1, pageSize = 10, searchKey, startTime, endTime) {
    const { $utils, $log4, $model, $format } = app
    const { errorLogger } = $log4
    const { bizTp } = $model
    let searchParams = {}
    if(startTime && endTime) {
      startTime = $format.getCurrentDayStart(startTime)
      endTime = $format.getCurrentDayEnd(endTime)
    }
    if(searchKey && searchKey !== ''){
      let p1 = {
        "$or": [
          {
            "pageName": new RegExp(searchKey,'i')
          },
          {
            "path": new RegExp(searchKey,'i')
          },
          {
            "name": new RegExp(searchKey,'i')
          },
          {
            "phone": new RegExp(searchKey,'i')
          },
          {
            "ip": new RegExp(searchKey,'i')
          },
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
    let total = await bizTp.find(searchParams).countDocuments()
    let list = await bizTp.find(searchParams, null, {skip: pageSize * (page < 1 ? 0 : (page - 1)), limit: (pageSize - 0), sort: sortParam }, function (err){
      if(err){
        errorLogger.error('【recordService】- getTpList:' + err.toString())
      }
    })
    return { list, total }
  },

  /**
   * 统计tp时间
   * @returns {Promise<any[]>}
   * @constructor
   */
  async StaticsTpVisit (params) {
    const { $model, $log4} = app
    const { errorLogger } = $log4
    const { bizTp } = $model
    const { type, startTime, endTime, min, max, top } = params
    let limit = !top ? 100000 : top - 0
    let queryParams = {}
    if(startTime && endTime) {
      queryParams.createTime = {"$gt": startTime, "$lt": endTime}
    }
    if(min && max) {
      queryParams.time = {"$gt": min, "$lt": max}
    }
    let dis = { $sum: "$time"}
    if(type === 'max'){
      dis = { $max: "$time"}
    } else if (type === 'avg') {
      dis = { $avg: "$time"}
    }
    let groupResult = await bizTp.aggregate(
      [ { $match: queryParams},
        { $group: { _id:  "$pageName", time:  dis }},
        { $sort: { count: -1}}
      ],
      function (err) {
        if(err){
          errorLogger.error('【recordService】- StaticsTpVisit - aggregate:' + err.toString())
        }
      }
    )
    let tmp = []
    groupResult.forEach(item=>{
      tmp.push({
        name: item._id || '未知',
        key: type ? type : 'total',
        count: item.time.toFixed(1) - 0
      })
    })
    tmp = tmp.sort((v1,v2)=>{
      if(v1.count < v2.count ){
        return 1
      } else {
        return -1
      }
    })
    return tmp.slice(0, limit)
  },

  /**
   * 统计单个页面的总停留时间
   * @returns {Promise<[]>}
   * @constructor
   */
  async StaticsTpTotal (params) {
    const { $model, $log4} = app
    const { errorLogger } = $log4
    const { bizTp } = $model
    const { startTime, endTime, path, min, max } = params
    let queryParams = {}
    if(startTime && endTime) {
      queryParams.createTime = {"$gt": startTime, "$lt": endTime}
    }
    if(min && max) {
      queryParams.time = {"$gt": min, "$lt": max}
    }
    let tmp = []
    let t = await bizTp.aggregate(
      [ { $match: { path: path, ...queryParams}},
        { $group: { _id: null , time: { $sum: "$time"}}},
        { $sort: { time: -1}}
      ],
      function (err) {
        if(err){
          errorLogger.error('【recordService】- StaticsTpTotal - aggregate - sum:' + err.toString())
        }
      }
    )
    tmp.push({
      name: '总停留时间',
      count: t[0] ? (parseFloat(t[0].time).toFixed(2) - 0 || 0) : 0
    })
    let a = await bizTp.aggregate(
      [ { $match: { path: path, ...queryParams}},
        { $group: { _id: null , time: { $avg: '$time'}}},
        { $sort: { time: -1}}
      ],
      function (err) {
        if(err){
          errorLogger.error('【recordService】- StaticsTpTotal - aggregate - avg:' + err.toString())
        }
      }
    )
    tmp.push({
      name: '平均停留时间',
      count: a[0] ? (parseFloat(a[0].time).toFixed(2) - 0 || 0) : 0
    })
    return tmp
  },

  /**
   * 页面tp趋势图
   * @returns {Promise<this>}
   * @constructor
   */
  async StaticsTpTrend (params) {
    const { $format, $model, $log4 } = app
    const { errorLogger } = $log4
    const { bizTp } = $model
    const { count, path, min, max, type } = params
    let queryParams = {}
    if(path && path !== ''){
      queryParams.path = path
    }
    if(min && max) {
      queryParams.time = {"$gt": min, "$lt": max}
    }
    let endTime = new Date(new Date().setHours(0,0,0,0) + (24 * 60 * 60 * 1000 * 2 - 1))
    let startTime = new Date(new Date().setHours(0,0,0,0) + (24 * 60 * 60 * 1000 ) + 1)
    let tmp = []
    let groupResult = await bizTp.aggregate(
      [ { $match:  {...queryParams} },
        { $project: { yearMonthDay: { $dateToString: { format: "%Y-%m-%d", date: "$createTime", timezone: "+08:00" } }, time: "$time"}},
        { $group: { _id:  "$yearMonthDay", total: { $sum: "$time"}, avg: {$avg: "$time"}, max: { $max: "$time"} }},
        { $sort: { count: -1}}
      ],
      function (err) {
        if(err){
          errorLogger.error('【recordService】- StaticsTpTrend - aggregate:' + err.toString())
        }
      }
    )
    let groupResultMap = {}
    groupResult.forEach(item=>{
      groupResultMap[item._id] = item
    })
    const trans = (dateTag, key) => {
      return parseFloat(groupResultMap[dateTag][key]).toFixed(2) - 0 || 0
    }
    for(let i = 0 ; i < count; i++){
      endTime = new Date(endTime.getTime() - (24 * 60 * 60 * 1000))
      startTime = new Date(startTime.getTime() - (24 * 60 * 60 * 1000))
      let dateTag = $format.formatDateYYMMDD(startTime)
      if(groupResultMap[dateTag]){
        tmp.push({
          name: dateTag,
          count: trans(dateTag, type),
        })
      } else {
        tmp.push({
          name: dateTag,
          count: 0,
        })
      }
    }
    tmp = tmp.sort((v1,v2)=>{
      if(new Date(v1.name).getTime() > new Date(v2.name).getTime()){
        return 1
      } else {
        return -1
      }
    })
    return tmp
  }
})
