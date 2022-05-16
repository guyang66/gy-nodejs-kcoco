module.exports = app => ({
  /**
   * 根据查询条件查询简历列表
   * @param page
   * @param pageSize
   * @param status
   * @param column
   * @param searchKey
   * @param place
   * @param category
   * @returns {Promise<{total: *, list: *}>}
   */
  async getList (page = 1, pageSize = 10, status, column, searchKey, place, category, orderSort) {
    const { $utils, $log4, $model } = app
    const { errorLogger } = $log4
    const { pageResume } = $model

    let searchParams = {}
    if(searchKey && searchKey !== ''){
      let p1 = {
        "$or": [
          {
            "title":new RegExp(searchKey,'i')
          },
          {
            "department":new RegExp(searchKey,'i')
          },
          {
            "desc":new RegExp(searchKey,'i')
          },
          {
            "date":new RegExp(searchKey,'i')
          },
        ]
      }
      let p2 = {}
      if(column){
        p2.key = column
      }
      // status = 0 也会进入false判断
      if(status !== null && status !== undefined){
        p2.status = status
      }
      if(category){
        p2.category = category
      }
      if(place){
        p2.place = place
      }
      searchParams = $utils.isEmptyObject(p2) ? p1 : {"$and": [p1, p2]}
    } else {
      if(column){
        searchParams.key = column
      }
      if(status !== null && status !== undefined){
        searchParams.status = status
      }
      if(category){
        searchParams.category = category
      }
      if(place){
        searchParams.place = place
      }
    }
    let sortParam = {}
    if(orderSort && orderSort !== ''){
      sortParam.order = orderSort === 'ascend' ? -1 : 1
    }
    // 按id 排序放最后
    sortParam._id = -1
    let total = await pageResume.find(searchParams).countDocuments()
    list = await pageResume.find(searchParams, null, {skip: pageSize * (page < 1 ? 0 : (page - 1)), limit: (pageSize - 0), sort: sortParam }, function (err){
      if(err){
        errorLogger.error(err)
      }
    })

    return { list, total }
  },

  /**
   * 分页查询岗位类型分类列表
   * @param page
   * @param pageSize
   * @param status
   * @returns {Promise<{total: *, list: *}>}
   */
  async getCategoryList (page = 1, pageSize = 100, status) {
    const { $log4, $model } = app
    const { errorLogger } = $log4
    const { pageResumeCategory } = $model
    let searchParams = {}
    if(status !== null && status !== undefined){
      searchParams.status = status
    }
    let sortParam = { order: -1, _id: 1 }
    let total = await pageResumeCategory.find(searchParams).countDocuments()
    let list = await pageResumeCategory.find(searchParams, null, {skip: pageSize * (page < 1 ? 0 : (page - 1)), limit: (pageSize - 0), sort: sortParam }, function (err){
      if(err){
        errorLogger.error(err)
      }
    })
    return { list, total }
  },

  /**
   * 分页查询岗位地区分类列表
   * @param page
   * @param pageSize
   * @param status
   * @returns {Promise<{total: *, list: *}>}
   */
  async getPlaceList (page = 1, pageSize = 100, status) {
    const { $log4, $model } = app
    const { errorLogger } = $log4
    const { pageResumePlace } = $model
    let searchParams = {}
    if(status !== null && status !== undefined){
      searchParams.status = status
    }
    let sortParam = { order: -1, _id: 1 }
    let total = await pageResumePlace.find(searchParams).countDocuments()
    let list = await pageResumePlace.find(searchParams, null, {skip: pageSize * (page < 1 ? 0 : (page - 1)), limit: (pageSize - 0), sort: sortParam }, function (err){
      if(err){
        errorLogger.error(err)
      }
    })
    return { list, total }
  }
})
