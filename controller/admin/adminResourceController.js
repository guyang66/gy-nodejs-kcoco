module.exports = app => ({
  /**
   * 获取所有上线新闻列表
   * @returns {Promise<void>}
   */
  async getResourceList () {
    const { ctx, $service, $helper } = app
    let { page, pageSize, status, searchKey, orderSort, downloadSort, category} = ctx.request.body
    if(!page || page <= 0) {
      page = 1
    }
    if(!pageSize || pageSize < 0 ){
      pageSize = 10
    }

    let r = await $service.resourceService.getList(page, pageSize, status, searchKey, category,orderSort, downloadSort)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * 更新资源
   * @returns {Promise<void>}
   */
  async updateResource () {
    const { ctx, $service, $helper, $model } = app
    const { pageResourceDownload } = $model
    const { content, id } = ctx.request.body
    if(!id){
      ctx.body = $helper.Result.fail(-1,'id不存在！')
      return
    }
    let r = await $service.baseService.updateById(pageResourceDownload, id, content)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '操作失败！')
    }
  },

  /**
   * 删除资源
   * @returns {Promise<void>}
   */
  async deleteResource () {
    const { ctx, $service, $helper, $model } = app
    const { pageResourceDownload } = $model
    const { id } = ctx.query
    if(!id){
      ctx.body = $helper.Result.fail(-1, '参数缺失（id不存在）！')
      return
    }
    let result = await $service.baseService.delete(pageResourceDownload, id)
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '删除失败！')
    }
  },

  /**
   * 获取资源详情
   * @returns {Promise<void>}
   */
  async getResourceDetail () {
    const { ctx, $service, $helper, $model } = app
    const { pageResourceDownload } = $model
    const { id } = ctx.query
    if(!id){
      ctx.body = $helper.Result.fail(-1, '参数缺失（id不存在）！')
      return
    }
    let result = await $service.baseService.queryById(pageResourceDownload, id)
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * 新增资源
   * @returns {Promise<void>}
   */
  async saveResource () {
    const { ctx, $service, $helper, $model } = app
    const { pageResourceDownload } = $model
    const { content } = ctx.request.body

    if(!content.title || content.title === ''){
      ctx.body = $helper.Result.fail(-1,'参数缺失（title）')
      return
    }

    if(!content.key || content.key === ''){
      ctx.body = $helper.Result.fail(-1,'参数缺失（key——岗位类别）')
      return
    }

    if(!content.key || content.key === ''){
      ctx.body = $helper.Result.fail(-1,'参数缺失（category）')
      return
    }

    if(!content.size || content.size === ''){
      ctx.body = $helper.Result.fail(-1,'参数缺失（size）')
      return
    }

    if(!content.type || content.type === ''){
      ctx.body = $helper.Result.fail(-1,'参数缺失（type）')
      return
    }

    if(!content.downloadType || content.downloadType === ''){
      ctx.body = $helper.Result.fail(-1,'参数缺失（downloadType）')
      return
    }

    if(!content.date || content.date === ''){
      ctx.body = $helper.Result.fail(-1,'参数缺失（date）')
      return
    }

    if(!content.href || content.href === ''){
      ctx.body = $helper.Result.fail(-1,'参数缺失（href——跳转链接）')
      return
    }

    // 找到id最大值
    let max = await $service.baseService.queryOne(pageResourceDownload,{},{id: 1},{sort :{id: -1}})
    let id = max ? (max.id + 1) : 1

    let instance = {
      id: id,
      title: content.title,
      desc: content.desc || '',
      key: content.key,
      size: content.size || '',
      type: content.type,
      download: content.download || 0,
      downloadType: content.downloadType || '',
      search: content.search || '',
      date: content.date,
      tag: content.tag || [],
      href: content.href,
      remark: content.remark || [],
      status: 1,
      order: 1,
    }

    let result = await $service.baseService.save(pageResourceDownload, instance)
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '保存失败！')
    }
  },

  /**
   * 获取资源栏目
   * @returns {Promise<void>}
   */
  async getColumnList () {
    const { ctx, $service, $helper, $model } = app
    const { pageResourceColumn } = $model
    let r = await $service.baseService.query(pageResourceColumn)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * 更新资源栏目
   * @returns {Promise<void>}
   */
  async updateResourceColumn () {
    const { ctx, $service, $helper, $model } = app
    const { pageResourceColumn } = $model
    const { content, id } = ctx.request.body
    if(!id){
      ctx.body = $helper.Result.fail(-1,'id不存在！')
      return
    }
    let r = await $service.baseService.updateById(pageResourceColumn, id, content)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '操作失败！')
    }
  },

  /**
   * 获取可用资源分类
   * @returns {Promise<void>}
   */
  async getCategoryOnlineList () {
    const { ctx, $service, $helper, $model } = app
    const { pageResourceCategory } = $model
    let result = await $service.baseService.query(pageResourceCategory, {status: 1})
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * 获取资源分类列表
   * @returns {Promise<void>}
   */
  async getCategoryList () {
    const { ctx, $service, $helper, $model } = app
    const { pageResourceCategory } = $model
    let result = await $service.baseService.query(pageResourceCategory)
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  async updateCategory () {
    const { ctx, $service, $helper, $model } = app
    const { pageResourceCategory } = $model
    const { content, id } = ctx.request.body
    if(!id){
      ctx.body = $helper.Result.fail(-1,'id不存在！')
      return
    }
    if(content.key && content.key === 'all'){
      ctx.body = $helper.Result.fail(-1,'不能修改该分类（该分类为系统默认）！')
      return
    }

    let categoryAll = await $service.baseService.queryOne(pageResourceCategory, {key: 'all'})
    if(content.order && content.order >= categoryAll.order){
      ctx.body = $helper.Result.fail(-1,'排序不能大于「全部」分类的排序！')
      return
    }

    let r = await $service.baseService.updateById(pageResourceCategory, id, content)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '操作失败！')
    }
  },

  async saveCategory () {
    const { ctx, $service, $helper, $model } = app
    const { pageResourceCategory } = $model
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

    let exist = await $service.baseService.queryOne(pageResourceCategory, {key: content.key})
    if(exist){
      ctx.body = $helper.Result.fail('-1', '当前key已存在，请勿重复保存！')
      return
    }
    let instance = {
      key: content.key,
      name: content.name,
      order: 1,
      status: 1
    }
    let result = await $service.baseService.save(pageResourceCategory, instance)
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '删除失败！')
    }
  },

  async deleteCategory () {
    const { ctx, $service, $helper, $model } = app
    const { pageResourceCategory } = $model
    const { id } = ctx.query
    if(!id){
      ctx.body = $helper.Result.fail(-1, '参数缺失（id不存在）！')
      return
    }
    let target = await $service.baseService.queryById(pageResourceCategory, id)
    if(target.key === 'all'){
      ctx.body = $helper.Result.fail(-1, '不能删除系统默认分类')
      return
    }

    let result = await $service.baseService.delete(pageResourceCategory, id)
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '删除失败！')
    }
  },
})
