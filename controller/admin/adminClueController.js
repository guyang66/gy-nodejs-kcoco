module.exports = app => ({
  async getClueList () {
    const { ctx, $service, $helper } = app
    let { page, pageSize, status, searchKey } = ctx.request.body
    if(!page || page <= 0) {
      page = 1
    }
    if(!pageSize || pageSize < 0 ){
      pageSize = 10
    }

    let r = await $service.clueService.getList(page, pageSize, status, searchKey)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },
})
