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
      ctx.body = $helper.Result.fail(-1,'资源名字不能为空！')
      return
    }

    if(!content.key || content.key === ''){
      ctx.body = $helper.Result.fail(-1,'资源分类不能为空！')
      return
    }

    if(!content.size || content.size === ''){
      ctx.body = $helper.Result.fail(-1,'资源大小不能为空！')
      return
    }

    if(!content.type || content.type === ''){
      ctx.body = $helper.Result.fail(-1,'资源类型不能为空！')
      return
    }

    if(!content.downloadType || content.downloadType === ''){
      ctx.body = $helper.Result.fail(-1,'下载方式不能为空!')
      return
    }

    if(!content.date || content.date === ''){
      ctx.body = $helper.Result.fail(-1,'发布日期不能为空！')
      return
    }

    if(!content.href || content.href === ''){
      ctx.body = $helper.Result.fail(-1,'跳转链接不能为空！')
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
      type: content.type || '',
      download: content.download || 0,
      downloadType: content.downloadType || '',
      search: content.search || '',
      date: content.date,
      tag: content.tag || [],
      href: content.href,
      remark: content.remark || '',
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

  /**
   * 更新分类
   * @returns {Promise<void>}
   */
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

  /**
   * 新增分类
   * @returns {Promise<void>}
   */
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

  /**
   * 删除分类
   * @returns {Promise<void>}
   */
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

  /**
   * 获取资源埋点数据源
   * @returns {Promise<void>}
   */
  async getResourceRecordList () {
    const { ctx, $service, $helper } = app
    let { page, pageSize} = ctx.request.body
    if(!page || page <= 0) {
      page = 1
    }
    if(!pageSize || pageSize < 0 ){
      pageSize = 10
    }

    /**
     * @type {{total: *, list: *}}
     * return: {
     *   total: 1,
     *   list: [
     *     {
     *       // bizResourceRecord model
     *       _id: xxx,
     *       name: xxx,
     *       objectId: {
     *         // pageResourceDownload model
     *         _id: xxx,
     *         title: xxx,
     *         desc: xxx,
     *         ...
     *       }
     *       ...
     *     }
     *     ...
     *   ]
     * }
     */
    let r = await $service.resourceService.getRecordList(page, pageSize)
    // 这里是表关联数据，给前端处理一下数据
    let tmp = []
    r.list.forEach(item=>{
      tmp.push({
        createTime: item.createTime,
        modifyTime: item.modifyTime,
        createId: item.createId,
        modifyId: item.modifyId,
        isDelete: item.isDelete,
        type: item.type,
        typeString: item.typeString,
        name: item.name,
        ip: item.ip,
        phone: item.phone,
        remark: item.remark,
        _id: item._id,
        // 字段拍平
        resourceId: item.objectId ? item.objectId.id : null,
        resourceDatabaseId: item.objectId ? item.objectId._id : null,
        resourceTitle: item.objectId ? item.objectId.title : null,
        resourceDesc: item.objectId ? item.objectId.desc : null,
        resourceDownload: item.objectId ? item.objectId.download : null,
      })
    })
    r.list = tmp
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * 资源埋点分类统计数据
   * @returns {Promise<void>}
   */
  async getResourceStaticsType () {
    const { ctx, $service, $helper } = app
    const { date } = ctx.query
    const interval = $helper.getDateInterval(date)
    let r = await $service.resourceService.StaticsType(interval)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '操作失败！')
    }
  },

  /**
   * 统计资源浏览分类
   * @returns {Promise<void>}
   */
  async getResourceStaticsName () {
    const { ctx, $service, $helper } = app
    const { date, action } = ctx.query
    const interval = $helper.getDateInterval(date)
    let r = await $service.resourceService.StaticsName({...interval, type: action})
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '操作失败！')
    }
  },

  /**
   * 获取资源搜索关键词数据统计
   * @returns {Promise<void>}
   */
  async getResourceStaticsKeywords () {
    const { ctx, $service, $helper } = app
    const { date, type } = ctx.query
    const interval = $helper.getDateInterval(date)
    let r = await $service.searchKeyService.StaticsKeywords({...interval, type})
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '操作失败！')
    }
  }
})
