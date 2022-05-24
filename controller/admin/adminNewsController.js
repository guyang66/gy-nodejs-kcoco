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
  },

  /**
   * 分页获取新闻列表
   * @returns {Promise<void>}
   */
  async getNewsList () {
    const { ctx, $service, $helper } = app
    let { page, pageSize, status, searchKey, category, orderSort, viewCountSort, isHot, isRecommend, isTop} = ctx.request.body
    if(!page || page <= 0) {
      page = 1
    }
    if(!pageSize || pageSize < 0 ){
      pageSize = 10
    }

    let r = await $service.newsService.getList(page, pageSize, status, isTop, isRecommend, isHot, searchKey, category, orderSort, viewCountSort)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * 获取可用分类
   * @returns {Promise<void>}
   */
  async getCategoryOnline () {
    const { ctx, $service, $helper, $model } = app
    const { pageNewsCategory } = $model
    let result = await $service.baseService.query(pageNewsCategory, {status: 1})
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * 更新新闻
   * @returns {Promise<void>}
   */
  async updateNews () {
    const { ctx, $service, $helper, $model } = app
    const { pageNews } = $model
    const { content, id } = ctx.request.body
    if(!id){
      ctx.body = $helper.Result.fail(-1,'id不存在！')
      return
    }
    let r = await $service.baseService.updateById(pageNews, id, content)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '操作失败！')
    }
  },

  /**
   * 获取新闻详情
   * @returns {Promise<void>}
   */
  async getNewsDetail () {
    const { ctx, $service, $helper, $model } = app
    const { pageNews } = $model
    const { id } = ctx.query
    if(!id){
      ctx.body = $helper.Result.fail(-1, '参数缺失（id不存在）！')
      return
    }
    let result = await $service.baseService.queryById(pageNews, id)
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * 新建新闻
   * @returns {Promise<void>}
   */
  async saveNews () {
    const { ctx, $service, $helper, $model } = app
    const { pageNews } = $model
    const { content } = ctx.request.body

    if(!content.title || content.title === ''){
      ctx.body = $helper.Result.fail(-1,'标题不能为空！')
      return
    }

    if(!content.summary || content.summary === ''){
      ctx.body = $helper.Result.fail(-1,'摘要不能为空')
      return
    }

    if(!content.date || content.date === ''){
      ctx.body = $helper.Result.fail(-1,'发布日期不能为空！')
      return
    }

    if(!content.author || content.author === ''){
      ctx.body = $helper.Result.fail(-1,'作者不能为空！')
      return
    }

    if(!content.type || content.type === ''){
      ctx.body = $helper.Result.fail(-1,'分类不能为空！')
      return
    }

    if(!content.body || content.body === ''){
      ctx.body = $helper.Result.fail(-1,'文章内容不能为空！')
      return
    }

    if(!content.description || content.description === ''){
      ctx.body = $helper.Result.fail(-1,'tdk描述不能为空！')
      return
    }

    if(!content.keywords || content.keywords === ''){
      ctx.body = $helper.Result.fail(-1,'tdk关键词不能为空！')
      return
    }

    // 找到id最大值
    let max = await $service.baseService.queryOne(pageNews,{},{id: 1},{sort :{id: -1}})
    let id = max ? (max.id + 1) : 1

    let instance = {
      id: id,
      title: content.title,
      summary: content.summary || '',
      date: content.date,
      cover: content.cover || '',
      author: content.author,
      type: content.type,
      description: content.description || '',
      keywords: content.keywords || '',
      search: content.search || '',
      body: content.body || '',
      tag: content.tag || [],
      href: content.href,
      remark: content.remark || '',
      status: 1,
      order: 1,
      isTop: 0,
      isRecommend: 0,
      isHot: 0,
    }

    let result = await $service.baseService.save(pageNews, instance)
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '保存失败！')
    }
  },

  /**
   * 删除新闻
   * @returns {Promise<void>}
   */
  async deleteNews () {
    const { ctx, $service, $helper, $model } = app
    const { pageNews } = $model
    const { id } = ctx.query
    if(!id){
      ctx.body = $helper.Result.fail(-1, '参数缺失（id不存在）！')
      return
    }
    let result = await $service.baseService.delete(pageNews, id)
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '删除失败！')
    }
  },

  /**
   * 获取所有分类
   * @returns {Promise<void>}
   */
  async getCategoryList () {
    const { ctx, $service, $helper, $model } = app
    const { pageNewsCategory } = $model
    let result = await $service.baseService.query(pageNewsCategory)
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
    const { pageNewsCategory } = $model
    const { content, id } = ctx.request.body
    if(!id){
      ctx.body = $helper.Result.fail(-1,'id不存在！')
      return
    }
    if(content.key && content.key === 'all'){
      ctx.body = $helper.Result.fail(-1,'不能修改该分类（该分类为系统默认）！')
      return
    }

    let categoryAll = await $service.baseService.queryOne(pageNewsCategory, {key: 'all'})
    if(content.order && content.order >= categoryAll.order){
      ctx.body = $helper.Result.fail(-1,'排序不能大于「全部」分类的排序！')
      return
    }

    let r = await $service.baseService.updateById(pageNewsCategory, id, content)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '操作失败！')
    }
  },

  /**
   * 删除分类
   * @returns {Promise<void>}
   */
  async deleteCategory () {
    const { ctx, $service, $helper, $model } = app
    const { pageNewsCategory } = $model
    const { id } = ctx.query
    if(!id){
      ctx.body = $helper.Result.fail(-1, '参数缺失（id不存在）！')
      return
    }
    let target = await $service.baseService.queryById(pageNewsCategory, id)
    if(target.key === 'all'){
      ctx.body = $helper.Result.fail(-1, '不能删除系统默认分类')
      return
    }

    let result = await $service.baseService.delete(pageNewsCategory, id)
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '删除失败！')
    }
  },

  async saveCategory () {
    const { ctx, $service, $helper, $model } = app
    const { pageNewsCategory } = $model
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

    let exist = await $service.baseService.queryOne(pageNewsCategory, {key: content.key})
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
    let result = await $service.baseService.save(pageNewsCategory, instance)
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '删除失败！')
    }
  },
})
