module.exports = app => ({
  /**
   * 获取用户默认角色下的菜单
   * @returns {Promise<void>}
   */
  async getUserMenu() {
    const { ctx, $service, $helper } = app
    let r = await $service.menuService.getAdminMenu()
    ctx.body = $helper.Result.success(r)
  },

  /**
   * 获取所有菜单配置
   * @returns {Promise<void>}
   */
  async getMenuList () {
    const { ctx, $service, $helper } = app
    let { page, pageSize, status, searchKey, level, orderSort, isCommon } = ctx.request.body
    if(!page || page <= 0) {
      page = 1
    }
    if(!pageSize || pageSize < 0 ){
      pageSize = 10
    }

    let r = await $service.menuService.getList(page, pageSize, status, searchKey, isCommon, level, orderSort)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * 更新菜单
   * @returns {Promise<void>}
   */
  async updateMenu () {
    const { ctx, $service, $helper, $model } = app
    const { adminMenu } = $model
    const { content, id } = ctx.request.body
    if(!id){
      ctx.body = $helper.Result.fail(-1,'id不存在！')
      return
    }

    if(content.isCommon === 0) {
      // 这是要设置一个菜单为非公共, 默认挂一个角色
      let exist = $service.baseService.queryById(adminMenu, id)
      if(!exist.roles || exist.roles.length < 1){
        content.roles = ['guest']
      }
    }

    let r = await $service.baseService.updateById(adminMenu, id, content)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '操作失败！')
    }
  }
})
