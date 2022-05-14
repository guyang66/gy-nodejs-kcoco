module.exports = app => ({
  /**
   * 获取所有上线新闻列表
   * @returns {Promise<void>}
   */
  async getAllOnlineNews () {
    const { ctx, $service, $helper, $model } = app
    const { pageNews } = $model
    let r = await $service.baseService.query(pageNews, {status: 1})
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  }
})
