module.exports = app => ({

  async getList() {
    const {ctx, $helper, $service} = app
    let { page, pageSize, name, company} = ctx.request.query

    if(!page || page <= 0) {
      page = 1
    }
    if(!pageSize || pageSize < 0 ){
      pageSize = 10
    }
    let r = await $service.customerService.getList( page, pageSize, {name, company})
    if(r){
      ctx.body = $helper.Result.success(r)
      return
    }
    ctx.body = $helper.Result.fail(-1, '获取列表失败！')
  }
})
