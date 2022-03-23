module.exports = app => ({

  async getMenus () {
    const { ctx, $service, $helper, $model, $constants } = app
    const { menu } = $model
    let r = await $service.baseService.query(menu)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail($constants.errorCode.SYSTEM_ERROR, '系统错误！')
    }
  }

})
