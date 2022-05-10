const selectUserKey = { path: 1, roles: 1, _id: 0, key: 1, backUrl: 1, exact: 1, name: 1 };
module.exports = app => ({
  /**
   * 获取可用权限路由
   * @returns {Promise<*>}
   */
  async getAdminRoute () {
    const { adminRoute } = app.$model
    const { errorLogger } = app.$log4
    // 获取正在使用的路由
    let r = await adminRoute.find( { status: 1}, selectUserKey, function (err){
      if(err){
        errorLogger.error(err)
      }
    })
    return r
  },
})
