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

  /**
   * 获取可用标签
   * @returns {Promise<void>}
   */
  async getOnlineTagList () {
    const { ctx, $service, $helper, $model } = app
    const { pageCommonTag } = $model
    const { key } = ctx.query
    if(!key || key === ''){
      ctx.body = $helper.Result.fail(-1, '参数缺失（key不存在）！')
      return
    }
    // todo: 这里需要给前端处理一下字段名字把secKey 映射到key 上，和其他数据模型保持一致，方便前端使用
    let result = await $service.baseService.query(pageCommonTag, {mainKey: key, status: 1}, {key: "$secKey", name: 1, mainKey: 1, desc: 1, remark: 1})
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  }

})
