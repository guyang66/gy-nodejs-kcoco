module.exports = app => ({
  /**
   * 获取tdk列表
   * @returns {Promise<void>}
   */
  async getTdkList () {
    const { ctx, $service, $helper } = app
    let { page, pageSize, status, searchKey} = ctx.request.body
    if(!page || page <= 0) {
      page = 1
    }
    if(!pageSize || pageSize < 0 ){
      pageSize = 10
    }

    let r = await $service.tdkService.getList(page, pageSize, status, searchKey)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * 更新tdk
   * @returns {Promise<void>}
   */
  async updateTdk () {
    const { ctx, $service, $helper, $model } = app
    const { pageTdk } = $model
    const { content, id } = ctx.request.body
    if(!id){
      ctx.body = $helper.Result.fail(-1,'id不存在！')
      return
    }
    if(content.name === 'default' && content.status !== null){
      ctx.body = $helper.Result.fail(-1,'系统默认不能上下线')
      return
    }
    let r = await $service.baseService.updateById(pageTdk, id, content)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '操作失败！')
    }
  },

  /**
   * 新增tdk
   * @returns {Promise<void>}
   */
  async saveTdk () {
    const { ctx, $service, $helper, $model } = app
    const { pageTdk } = $model
    const { content } = ctx.request.body
    if(!content.name || content.name === ''){
      ctx.body = $helper.Result.fail(-1,'name不能为空！')
      return
    }

    if(!content.path || content.path === ''){
      ctx.body = $helper.Result.fail(-1,'path不能为空！')
      return
    }

    if(!content.title || content.title === ''){
      ctx.body = $helper.Result.fail(-1,'title不能为空!')
      return
    }

    if(!content.description || content.description === ''){
      ctx.body = $helper.Result.fail(-1,'description不能为空！')
      return
    }

    if(!content.keywords || content.keywords === ''){
      ctx.body = $helper.Result.fail(-1,'keywords不能为空！')
      return
    }

    let exist = await $service.baseService.queryOne(pageTdk, {path: content.path})
    if(exist){
      ctx.body = $helper.Result.fail(-1,'该path已存在，请勿重复保存')
      return
    }

    let instance = {
      name: content.name,
      path: content.path || '',
      keywords: content.keywords,
      description: content.description || '',
      title: content.title || '',
      status: 1,
    }

    let result = await $service.baseService.save(pageTdk, instance)
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '保存失败！')
    }
  },

  /**
   * 删除tdk
   */
  async deleteTdk () {
    const { ctx, $service, $helper, $model } = app
    const { pageTdk } = $model
    const { id } = ctx.query
    if(!id){
      ctx.body = $helper.Result.fail(-1, '参数缺失（id不存在）！')
      return
    }
    let exist = await $service.baseService.queryById(pageTdk, id)
    if(exist.name === 'default'){
      ctx.body = $helper.Result.fail(-1, '不能删除系统默认！')
      return
    }
    let result = await $service.baseService.delete(pageTdk, id)
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '删除失败！')
    }
  },

  /**
   * 获取官网所有页面（通过tdk配置）
   * 注：严格来说需要一个单独的表来维护官网所有页面名字，这里直接用tdk的配置表来做，新增页面的时候注意tdk中也跟着加配置即可。
   * @returns {Promise<void>}
   */
  async getAllPageNameByTdk () {
    const { ctx, $service, $helper, $model } = app
    const { pageTdk } = $model
    let r = await $service.baseService.query(pageTdk,{ name: {$nin : ['default'] }, status: 1},{ name: 1, path: 1})
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  }
})
