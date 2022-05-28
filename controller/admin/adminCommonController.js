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
  },

  /**
   * 获取角色
   * @returns {Promise<void>}
   */
  async getRoles () {
    const { ctx, $service, $helper, $model } = app
    const { adminRole } = $model
    let r = await $service.baseService.query(adminRole, {status: 1})
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  async getRoleList () {
    const { ctx, $service, $helper } = app
    let { page, pageSize, status, searchKey } = ctx.request.body
    if(!page || page <= 0) {
      page = 1
    }
    if(!pageSize || pageSize < 0 ){
      pageSize = 10
    }

    let r = await $service.roleService.getList(page, pageSize, status, searchKey)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * 删除系统角色
   * @returns {Promise<void>}
   */
  async deleteRole () {
    // todo: 角色删除的时候连带着所有的关联都需要被删除
    const { ctx, $service, $helper, $model } = app
    const { adminRole } = $model
    const { id } = ctx.query
    if(!id){
      ctx.body = $helper.Result.fail(-1, '参数缺失（id不存在）！')
      return
    }
    let result = await $service.baseService.delete(adminRole, id)
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '删除失败！')
    }
  },

  /**
   * 新增角色
   * @returns {Promise<void>}
   */
  async saveRole () {
    const { ctx, $service, $helper, $model } = app
    const { adminRole } = $model
    const { content } = ctx.request.body
    if(!content.key || content.key === ''){
      ctx.body = $helper.Result.fail(-1,'key不能为空！')
      return
    }
    if(!content.name || content.name === ''){
      ctx.body = $helper.Result.fail(-1,'名字不能为空！')
      return
    }

    let exist = await $service.baseService.queryOne(adminRole,{key: content.key},)
    if(exist){
      ctx.body = $helper.Result.fail(-1,'key已存在，请勿重复保存！')
      return
    }

    let instance = {
      name: content.name,
      key: content.key,
      status: 1,
    }

    let result = await $service.baseService.save(adminRole, instance)
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '保存失败！')
    }
  },

  /**
   * 获取app缓存列表
   * @returns {Promise<void>}
   */
  async getCaches () {
    const { ctx, $service, $helper } = app
    let { page, pageSize, status, searchKey } = ctx.request.body
    if(!page || page <= 0) {
      page = 1
    }
    if(!pageSize || pageSize < 0 ){
      pageSize = 10
    }

    let r = await $service.cacheService.getList(page, pageSize, status, searchKey)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * 更新缓存缓存
   * @returns {Promise<void>}
   */
  async updateCaches () {
    const { ctx, $service, $helper, $model, $nodeCache } = app
    const { sysCache } = $model
    const { content, id } = ctx.request.body
    if(!id){
      ctx.body = $helper.Result.fail(-1,'id不存在！')
      return
    }

    // 下线的时候需要清掉对应缓存
    let exist = await $service.baseService.queryById(sysCache,id)
    if(exist && exist.key) {
      await $nodeCache.del(exist.key)
    }

    let r = await $service.baseService.updateById(sysCache, id, content)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '操作失败！')
    }
  },

  /**
   * 删除缓存配置
   * @returns {Promise<void>}
   */
  async deleteCaches () {
    const { ctx, $service, $helper, $model, $nodeCache } = app
    const { sysCache } = $model
    const { id } = ctx.query
    if(!id){
      ctx.body = $helper.Result.fail(-1, '参数缺失（id不存在）！')
      return
    }

    // 删除的时候需要刷掉缓存，全部走实时查询
    let exist = await $service.baseService.queryById(sysCache,id)
    if(exist && exist.key) {
      await $nodeCache.del(exist.key)
    }

    let result = await $service.baseService.delete(sysCache, id)
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '删除失败！')
    }
  },

  /**
   * 新增缓存配置
   * @returns {Promise<void>}
   */
  async saveCaches () {
    const { ctx, $service, $helper, $model } = app
    const { sysCache } = $model
    const { content } = ctx.request.body
    if(!content.key || content.key === ''){
      ctx.body = $helper.Result.fail(-1,'key不能为空！')
      return
    }

    if(!content.name || content.name === ''){
      ctx.body = $helper.Result.fail(-1,'名字不能为空！')
      return
    }

    let exist = await $service.baseService.queryOne(sysCache,{key: content.key},)
    if(exist){
      ctx.body = $helper.Result.fail(-1,'key已存在，请勿重复保存！')
      return
    }

    let instance = {
      name: content.name,
      key: content.key,
      status: 1,
    }

    let result = await $service.baseService.save(sysCache, instance)
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '保存失败！')
    }
  },

  /**
   * 刷掉指定缓存
   * @returns {Promise<void>}
   */
  async refreshCaches () {
    const { ctx, $helper, $nodeCache } = app;
    const { key } = ctx.query
    if(!key || key ===''){
      ctx.body = $helper.Result.fail(-1,'要清除的key不存在！')
      return
    }
    await $nodeCache.del(key)
    ctx.body = $helper.Result.success('操作成功！')
  },

  /**
   * 刷掉所有缓存
   * @returns {Promise<void>}
   */
  async refreshAllCaches () {
    const { ctx, $helper, $nodeCache } = app;
    await $nodeCache.flushAll()
    ctx.body = $helper.Result.success('操作成功！')
  },

  /**
   * 获取url权限配置列表
   * @returns {Promise<void>}
   */
  async getUrlPermissionList () {
    const { ctx, $service, $helper } = app
    let { page, pageSize, status, searchKey } = ctx.request.body
    if(!page || page <= 0) {
      page = 1
    }
    if(!pageSize || pageSize < 0 ){
      pageSize = 10
    }

    let r = await $service.permissionService.getUrlPermissionList(page, pageSize, status, searchKey)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * 获取UI权限配置列表
   * @returns {Promise<void>}
   */
  async getUiPermissionList () {
    const { ctx, $service, $helper } = app
    let { page, pageSize, status, searchKey } = ctx.request.body
    if(!page || page <= 0) {
      page = 1
    }
    if(!pageSize || pageSize < 0 ){
      pageSize = 10
    }

    let r = await $service.permissionService.getUiPermissionList(page, pageSize, status, searchKey)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * 获取用户的UI权限
   * @returns {Promise<void>}
   */
  async getUiPermissionOnline () {
    const { ctx, $service, $helper, $model  } = app
    const { adminUiPermission } = $model
    let r = await $service.baseService.query(adminUiPermission, {status: 1})
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * pv记录列表
   * @returns {Promise<void>}
   */
  async getPvList () {
    const { ctx, $service, $helper } = app
    let { page, pageSize, searchKey, startTime, endTime} = ctx.request.body
    if(!page || page <= 0) {
      page = 1
    }
    if(!pageSize || pageSize < 0 ){
      pageSize = 10
    }

    let r = await $service.recordService.getPvList(page, pageSize, searchKey, startTime, endTime)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * tp记录列表
   * @returns {Promise<void>}
   */
  async getTpList () {
    const { ctx, $service, $helper } = app
    let { page, pageSize, searchKey, startTime, endTime} = ctx.request.body
    if(!page || page <= 0) {
      page = 1
    }
    if(!pageSize || pageSize < 0 ){
      pageSize = 10
    }

    let r = await $service.recordService.getTpList(page, pageSize, searchKey, startTime, endTime)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * pv页面访问量排行统计数据
   * @returns {Promise<void>}
   */
  async getPvStaticsVisit () {
    const { ctx, $service, $helper } = app
    const { date, top } = ctx.query
    const interval = $helper.getDateInterval(date)
    let r = await $service.recordService.StaticsPvVisit({...interval, top: top })
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * tp统计数据
   * @returns {Promise<void>}
   */
  async getTpStaticsVisit () {
    const { ctx, $service, $helper } = app
    const { date, top, time, type } = ctx.query
    const interval = $helper.getDateInterval(date)
    const minMax = $helper.getTimeInterval(time)
    let r = await $service.recordService.StaticsTpVisit({...interval, top, ...minMax, type })
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * 统计当个页面tp数据
   * @returns {Promise<void>}
   */
  async getTpStaticsTotal () {
    const { ctx, $service, $helper } = app
    const { date, time, path } = ctx.query
    const interval = $helper.getDateInterval(date)
    const minMax = $helper.getTimeInterval(time)
    let r = await $service.recordService.StaticsTpTotal({...interval, path, ...minMax })
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * 获取单个页面TP趋势
   * @returns {Promise<void>}
   */
  async getTpStaticsTrend () {
    const { ctx, $service, $helper } = app
    const { date, time, path, type } = ctx.query
    const count = $helper.getDateCount(date)
    const minMax = $helper.getTimeInterval(time)
    let r = await $service.recordService.StaticsTpTrend({count, path, ...minMax, type })
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * pv总趋势统计数据
   * @returns {Promise<void>}
   */
  async getPvStaticsPvLine () {
    const { ctx, $service, $helper } = app
    const { date, path } = ctx.query
    // 计算需要group分组的日期个数
    const count = $helper.getDateCount(date)
    let r = await $service.recordService.StaticsPvLine({count, path})
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * uv总趋势统计数据
   * @returns {Promise<void>}
   */
  async getPvStaticsUvLine () {
    const { ctx, $service, $helper } = app
    const { date, path } = ctx.query
    // 计算需要group分组的日期个数
    const count = $helper.getDateCount(date)
    let r = await $service.recordService.StaticsUvLine({count, path})
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  }

})
