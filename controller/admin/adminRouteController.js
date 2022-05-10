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
})
