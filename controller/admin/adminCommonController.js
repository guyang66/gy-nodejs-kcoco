module.exports = app => ({
  /**
   * 获取首页banner配置项
   * @returns {Promise<void>}
   */
  async getIndexBanner() {
    //todo: 把首页配置项用json string处理，方便扩展
    const { ctx, $service, $helper } = app
    const indexBannerData = await $service.commonConfigService.getCommonConfig('page_index_banners', 'v2')
    ctx.body = $helper.Result.success(indexBannerData)
  },

  /**
   * 更新首页banner配置项
   * @returns {Promise<void>}
   */
  async updateIndexBanner() {
    const { ctx, $service, $helper } = app
    const { content } = ctx.request.body
    if(!content){
      ctx.body = $helper.Result.fail('-1', '内容不存在！')
    }
    let r = await $service.commonConfigService.updateCommonConfig('page_index_banners', 'v2', content)
    ctx.body = $helper.Result.success(r)
  },

  /**
   * 获取首页banner的action
   * @returns {Promise<void>}
   */
  async getIndexBannersAction() {
    const { ctx, $service, $helper, $model } = app
    const { pageIndexBannerAction } = $model
    const { _id } = ctx.query
    let options = _id ? {sort: { _id: 1 }} : null
    let r = await $service.baseService.query(pageIndexBannerAction, {status: 1}, {}, options)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * 获取首页news配置项
   * @returns {Promise<void>}
   */
  async getIndexNews() {
    const { ctx, $service, $helper } = app
    const indexBannerData = await $service.commonConfigService.getCommonConfig('page_index_news', 'v2')
    ctx.body = $helper.Result.success(indexBannerData)
  },


  /**
   * 更新首页banner配置项
   * @returns {Promise<void>}
   */
  async updateIndexNews() {
    const { ctx, $service, $helper } = app
    const { content } = ctx.request.body
    if(!content){
      ctx.body = $helper.Result.fail('-1', '内容不存在！')
    }
    let r = await $service.commonConfigService.updateCommonConfig('page_index_news', 'v2', content)
    ctx.body = $helper.Result.success(r)
  },

  /**
   * 获取首页column配置项
   * @returns {Promise<void>}
   */
  async getIndexColumn() {
    const { ctx, $service, $helper } = app
    const indexBannerData = await $service.commonConfigService.getCommonConfig('page_index_columns', 'v2')
    ctx.body = $helper.Result.success(indexBannerData)
  },


  /**
   * 更新首页column配置项
   * @returns {Promise<void>}
   */
  async updateIndexColumn() {
    const { ctx, $service, $helper } = app
    const { content } = ctx.request.body
    if(!content){
      ctx.body = $helper.Result.fail('-1', '内容不存在！')
    }
    let r = await $service.commonConfigService.updateCommonConfig('page_index_columns', 'v2', content)
    ctx.body = $helper.Result.success(r)
  },

})
