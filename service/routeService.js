const selectUserKey = { path: 1, roles: 1, _id: 0, key: 1, backUrl: 1, exact: 1, name: 1 };
module.exports = app => ({
  /**
   * 获取客户端可用权限路由
   * @returns {Promise<*>}
   */
  async getAdminRoute () {
    const { $model, $log4 } = app
    const { adminRoute } = $model
    const { errorLogger } = $log4
    // 获取正在使用的路由
    return await adminRoute.find( { status: 1}, selectUserKey, function (err){
      if(err){
        console.log(err)
        errorLogger.error('【getAdminRoute】- getAdminRoute：' + err.toString())
      }
    })
  },

  /**
   * 分页获取所有路由
   * @param page
   * @param pageSize
   * @param status
   * @param searchKey
   * @returns {Promise<{total: *, list: *}>}
   */
  async getList (page = 1, pageSize = 10, status, searchKey) {
    const { $utils, $log4, $model } = app
    const { errorLogger } = $log4
    const { adminRoute } = $model
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
          {
            "path": new RegExp(searchKey,'i')
          }
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
      _id: 1
    }
    let total = await adminRoute.find(searchParams).countDocuments()
    let list = await adminRoute.find(searchParams, null, {skip: pageSize * (page < 1 ? 0 : (page - 1)), limit: (pageSize - 0), sort: sortParam }, function (err){
      if(err){
        console.log(err)
        errorLogger.error('【routeService】- getList:' + err.toString())
      }
    })
    return { list, total }
  }
})
