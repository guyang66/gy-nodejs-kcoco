module.exports = app => ({

  /**
   * 获取线索列表
   * @returns {Promise<void>}
   */
  async getClueList () {
    const { ctx, $service, $helper } = app
    let { page, pageSize, searchKey, startTime, endTime } = ctx.request.body
    if(!page || page <= 0) {
      page = 1
    }
    if(!pageSize || pageSize < 0 ){
      pageSize = 10
    }

    let r = await $service.clueService.getList(page, pageSize, searchKey, startTime, endTime)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * 获取线索类型统计数据
   * @returns {Promise<void>}
   */
  async getClueStaticsType () {
    const { ctx, $service, $helper } = app
    const { date } = ctx.query
    const interval = $helper.getDateInterval(date)
    let r = await $service.clueService.staticsColumn({...interval, column: 'type'})
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * 线索需求统计数据
   * @returns {Promise<void>}
   */
  async getClueStaticsNeed () {
    const { ctx, $service, $helper } = app
    const { date } = ctx.query
    const interval = $helper.getDateInterval(date)
    let r = await $service.clueService.staticsColumn({...interval, column: 'need'})
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * 线索来源入口统计数据
   * @returns {Promise<void>}
   */
  async getClueStaticsOriginHref () {
    const { ctx, $service, $helper } = app
    const { startTime, endTime } = ctx.query
    let r = await $service.clueService.staticsOriginHref({startTime, endTime})
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  }
})
