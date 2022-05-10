module.exports = app => ({
  /**
   * 获取用户默认角色下的菜单
   * @returns {Promise<void>}
   */
  async getMenu() {
    const { ctx, $service, $helper } = app
    let r = await $service.menuService.getAdminMenu()
    ctx.body = $helper.Result.success(r)
  },
})
