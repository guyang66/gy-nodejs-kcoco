const utils = require('../extend/utils')
const getSearchParam = (searchKey, status) => {
  let searchParams = {}
  if(searchKey && searchKey !== ''){
    let p1 = {
      "$or": [
        {
          "title": new RegExp(searchKey,'i')
        },
        {
          "desc": new RegExp(searchKey,'i')
        }
      ]
    }
    let p2 = {}
    // status = 0 也会进入false判断
    if(status !== null && status !== undefined){
      p2.status = status
    }
    searchParams = utils().isEmptyObject(p2) ? p1 : {"$and": [p1, p2]}
  } else {
    if(status !== null && status !== undefined){
      searchParams.status = status
    }
  }
  return searchParams
}

const getSortParam = (orderSort) => {
  let sortParams = {}
  if(orderSort && orderSort !== ''){
    sortParams.order = orderSort === 'ascend' ? -1 : 1
  }
  sortParams._id = -1
  return sortParams
}

module.exports = app => ({
  /**
   * 分页获取产品活动
   * @param page
   * @param pageSize
   * @param status
   * @param searchKey
   * @param orderSort
   * @returns {Promise<{total: *, list: *}>}
   */
  async getProductActivityList (page = 1, pageSize = 10, status, searchKey, orderSort) {
    const { $log4, $model } = app
    const { errorLogger } = $log4
    const { pageProductActivity } = $model
    let sortParams = getSortParam(orderSort)
    // 强制让主位置cell排序第一
    sortParams = {type: 1, ...sortParams}
    let total = await pageProductActivity.find(getSearchParam(searchKey, status)).countDocuments()
    let list = await pageProductActivity.find(getSearchParam(searchKey, status), null, {skip: pageSize * (page < 1 ? 0 : (page - 1)), limit: (pageSize - 0), sort: sortParams }, function (err){
      if(err){
        errorLogger.error(err)
      }
    })
    return { list, total }
  },

  /**
   * 分页热门产品活动
   * @param page
   * @param pageSize
   * @param status
   * @param searchKey
   * @param orderSort
   * @returns {Promise<{total: *, list: *}>}
   */
  async getHotActivityList (page = 1, pageSize = 10, status, searchKey, orderSort) {
    const { $log4, $model } = app
    const { errorLogger } = $log4
    const { pageHotActivity } = $model
    let total = await pageHotActivity.find(getSearchParam(searchKey, status)).countDocuments()
    let list = await pageHotActivity.find(getSearchParam(searchKey, status), null, {skip: pageSize * (page < 1 ? 0 : (page - 1)), limit: (pageSize - 0), sort: getSortParam(orderSort) }, function (err){
      if(err){
        errorLogger.error(err)
      }
    })
    return { list, total }
  },

  /**
   * 分页获取品牌活动
   * @param page
   * @param pageSize
   * @param status
   * @param searchKey
   * @param orderSort
   * @returns {Promise<{total: *, list: *}>}
   */
  async getBrandActivityList (page = 1, pageSize = 10, status, searchKey, orderSort) {
    const { $log4, $model } = app
    const { errorLogger } = $log4
    const { pageBrandActivity } = $model
    let total = await pageBrandActivity.find(getSearchParam(searchKey, status)).countDocuments()
    let list = await pageBrandActivity.find(getSearchParam(searchKey, status), null, {skip: pageSize * (page < 1 ? 0 : (page - 1)), limit: (pageSize - 0), sort: getSortParam(orderSort) }, function (err){
      if(err){
        errorLogger.error(err)
      }
    })
    return { list, total }
  },

  /**
   * 设置为主位置活动
   * @param id
   * @returns {Promise<boolean>}
   */
  async setMainProductActivity (id) {
    const { $log4, $model } = app
    const { errorLogger } = $log4
    const { pageProductActivity } = $model
    try {
      await pageProductActivity.updateMany({},{$set: {type: 'normal'}})
      await pageProductActivity.findByIdAndUpdate(id, {$set: {type: 'main'}})
      return true
    } catch (e) {
      errorLogger.eror('【activityService】——setMainProductActivity：' + e.toString())
      return false
    }
  }
})
