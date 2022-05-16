module.exports = app => ({

  /**
   * 获取案例列表
   * @returns {Promise<void>}
   */
  async getCaseList () {
    const { ctx, $service, $helper } = app
    let { page, pageSize, status, searchKey, orderSort } = ctx.request.body
    if(!page || page <= 0) {
      page = 1
    }
    if(!pageSize || pageSize < 0 ){
      pageSize = 10
    }

    let r = await $service.caseService.getList(page, pageSize, status, searchKey, orderSort)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * 更新案例内容
   * @returns {Promise<void>}
   */
  async updateCase () {
    const { ctx, $service, $helper, $model } = app
    const { pageCase } = $model
    const { content, id } = ctx.request.body
    if(!id){
      ctx.body = $helper.Result.fail(-1,'id不存在！')
      return
    }
    let r = await $service.baseService.updateById(pageCase, id, content)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '操作失败！')
    }
  },

  /**
   * 删除案例
   * @returns {Promise<void>}
   */
  async deleteCase () {
    const { ctx, $service, $helper, $model } = app
    const { pageCase } = $model
    const { id } = ctx.query
    if(!id){
      ctx.body = $helper.Result.fail(-1, '参数缺失（id不存在）！')
      return
    }
    let result = await $service.baseService.delete(pageCase, id)
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '删除失败！')
    }
  },

  /**
   * 新增案例
   * @returns {Promise<void>}
   */
  async saveCase(){
    const { ctx, $service, $helper, $model } = app
    const { pageCase } = $model
    const { content } = ctx.request.body

    if(!content.title || content.title === ''){
      ctx.body = $helper.Result.fail(-1,'参数缺失（title）')
      return
    }

    if(!content.desc || content.desc === ''){
      ctx.body = $helper.Result.fail(-1,'参数缺失（desc）')
      return
    }

    if(!content.icon || content.icon === ''){
      ctx.body = $helper.Result.fail(-1,'参数缺失（icon）')
      return
    }

    if(!content.href || content.href === ''){
      ctx.body = $helper.Result.fail(-1,'参数缺失（href——跳转链接）')
      return
    }

    // 找到id最大值
    let max = await $service.baseService.queryOne(pageCase,{},{id: 1},{sort :{id: -1}})
    let id = max ? (max.id + 1) : 1

    let instance = {
      id: id,
      title: content.title,
      desc: content.desc || '',
      key: content.key || [],
      nofollow: !!content.nofollow,
      target: content.target ? content.target : '',
      href: content.href,
      icon: content.icon,
      status: 1,
      order: 1,
    }

    let result = await $service.baseService.save(pageCase, instance)
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '保存失败！')
    }
  },

  /**
   * 获取热门搜索词标签
   * @returns {Promise<void>}
   */
  async getTagList () {
    const { ctx, $service, $helper, $model } = app
    const { pageCommonTag } = $model
    const { orderSort } = ctx.query
    let sortParam = {}
    if(orderSort && orderSort !== ''){
      sortParam.order = orderSort === 'ascend' ? -1 : 1
    }
    sortParam._id = -1
    let result = await $service.baseService.query(pageCommonTag, { mainKey: 'case_search_tag'}, {key: "$secKey", name: 1, mainKey: 1, status: "$status", remark: 1, order: "$order"},{sort: sortParam})
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * 删除热门搜索词标签
   * @returns {Promise<void>}
   */
  async deleteTag () {
    const { ctx, $service, $helper, $model } = app
    const { pageCommonTag } = $model
    const { id } = ctx.query
    if(!id){
      ctx.body = $helper.Result.fail(-1, '参数缺失（id不存在）！')
      return
    }
    let result = await $service.baseService.delete(pageCommonTag, id)
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '删除失败！')
    }
  },

  /**
   * 新增热门搜索词标签
   * @returns {Promise<void>}
   */
  async saveCaseTag () {
    const { ctx, $service, $helper, $model } = app
    const { pageCommonTag } = $model
    const { content } = ctx.request.body
    if(!content){
      ctx.body = $helper.Result.fail(-1, '没有需要保存的内容！')
      return
    }
    if(!content.name || content.name === ''){
      ctx.body = $helper.Result.fail(-1, 'name不能为空')
      return
    }
    if(!content.key || content.key === ''){
      ctx.body = $helper.Result.fail(-1, 'key不能为空')
      return
    }

    let mainKey = 'case_search_tag'

    let exist = await $service.baseService.queryOne(pageCommonTag, {mainKey: mainKey, secKey: content.key})
    if(exist){
      ctx.body = $helper.Result.fail('-1', '当前key已存在，请勿重复保存！')
      return
    }
    let instance = {
      mainKey: mainKey,
      secKey: content.key,
      name: content.name,
      remark: content.remark || '',
      status: 1
    }
    let result = await $service.baseService.save(pageCommonTag, instance)
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '删除失败！')
    }
  },

  /**
   * 更新热门搜索词标签
   * @returns {Promise<void>}
   */
  async updateCaseTag () {
    const { ctx, $service, $helper, $model } = app
    const { pageCommonTag } = $model
    const { content, id } = ctx.request.body
    if(!id){
      ctx.body = $helper.Result.fail(-1,'id不存在！')
      return
    }
    let r = await $service.baseService.updateById(pageCommonTag, id, content)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '操作失败！')
    }
  },

})
