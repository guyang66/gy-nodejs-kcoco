module.exports = app => ({
  /**
   * 获取所有可用的路由
   * @returns {Promise<void>}
   */
  async getRoute() {
    const { ctx, $service, $helper } = app
    let r = await $service.routeService.getAdminRoute()
    ctx.body = $helper.Result.success(r)
  },

  /**
   * 获取路由列表
   * @returns {Promise<void>}
   */
  async getRouteList () {
    const { ctx, $service, $helper } = app
    let { page, pageSize, status, searchKey} = ctx.request.body
    if(!page || page <= 0) {
      page = 1
    }
    if(!pageSize || pageSize < 0 ){
      pageSize = 10
    }

    let r = await $service.routeService.getList(page, pageSize, status, searchKey)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * 更新路由
   * @returns {Promise<void>}
   */
  async updateRoute () {
    const { ctx, $service, $helper, $model } = app
    const { adminRoute } = $model
    const { content, id } = ctx.request.body
    if(!id){
      ctx.body = $helper.Result.fail(-1,'id不存在！')
      return
    }
    let r = await $service.baseService.updateById(adminRoute, id, content)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '操作失败！')
    }
  }
})
