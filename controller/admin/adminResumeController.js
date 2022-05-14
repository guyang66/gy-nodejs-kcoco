module.exports = app => ({

  /**
   * 获取招聘栏目类型
   * @returns {Promise<void>}
   */
  async getResumeColumn () {
    const { ctx, $service, $helper, $model } = app
    const { pageResumeColumn } = $model
    let r = await $service.baseService.query(pageResumeColumn, {status: 1})
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * 获取岗位分类列表
   * @returns {Promise<void>}
   */
  async getResumeCategory () {
    const { ctx, $service, $helper, $model } = app
    const { pageResumeCategory } = $model
    let r = await $service.baseService.query(pageResumeCategory, {status: 1})
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * 获取岗位地点分类列表
   * @returns {Promise<void>}
   */
  async getResumePlace () {
    const { ctx, $service, $helper, $model } = app
    const { pageResumePlace } = $model
    let r = await $service.baseService.query(pageResumePlace, {status: 1})
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * 获取列表
   * @returns {Promise<void>}
   */
  async getResumeList () {
    const { ctx, $service, $helper } = app
    let { page, pageSize, status, column, searchKey, place, category } = ctx.request.body
    if(!page || page <= 0) {
      page = 1
    }
    if(!pageSize || pageSize < 0 ){
      pageSize = 10
    }

    let r = await $service.resumeService.getList(page, pageSize, status, column, searchKey, place, category)
    ctx.body = $helper.Result.success(r)
  },

  /**
   * 获取岗位类型分类列表
   * @returns {Promise<void>}
   */
  async getResumeCategoryList () {
    const { ctx, $service, $helper } = app
    let { page, pageSize, status } = ctx.request.body
    if(!page || page <= 0) {
      page = 1
    }
    if(!pageSize || pageSize < 0 ){
      pageSize = 10
    }
    let r = await $service.resumeService.getCategoryList(page, pageSize, status)
    ctx.body = $helper.Result.success(r)
  },

  /**
   * 获取岗位地区分类列表
   * @returns {Promise<void>}
   */
  async getResumePlaceList () {
    const { ctx, $service, $helper } = app
    let { page, pageSize, status } = ctx.request.body
    if(!page || page <= 0) {
      page = 1
    }
    if(!pageSize || pageSize < 0 ){
      pageSize = 10
    }
    let r = await $service.resumeService.getPlaceList(page, pageSize, status)
    ctx.body = $helper.Result.success(r)
  },

  /**
   * 更新岗位类型分类
   * @returns {Promise<void>}
   */
  async updateResumeCategory () {
    const { ctx, $service, $helper, $model } = app
    const { pageResumeCategory } = $model
    const { content, id } = ctx.request.body
    if(!id){
      ctx.body = $helper.Result.fail(-1,'id不存在！')
      return
    }
    let r = await $service.baseService.updateById(pageResumeCategory, id, content)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '操作失败！')
    }
  },

  /**
   * 更新岗位地区分类
   * @returns {Promise<void>}
   */
  async updateResumePlace () {
    const { ctx, $service, $helper, $model } = app
    const { pageResumePlace } = $model
    const { content, id } = ctx.request.body
    if(!id){
      ctx.body = $helper.Result.fail(-1,'id不存在！')
      return
    }
    let r = await $service.baseService.updateById(pageResumePlace, id, content)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '操作失败！')
    }
  },

  /**
   * 新增岗位类型分类
   * @returns {Promise<void>}
   */
  async saveResumeCategory () {
    const { ctx, $service, $helper, $model } = app
    const { pageResumeCategory } = $model
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
    let exist = await $service.baseService.queryOne(pageResumeCategory, {key: content.key})
    if(exist){
      ctx.body = $helper.Result.fail('-1', '当前key已存在，请勿重复保存！')
      return
    }
    let result = await $service.baseService.save(pageResumeCategory, content)
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '删除失败！')
    }
  },

  /**
   * 新增岗位地区分类
   * @returns {Promise<void>}
   */
  async saveResumePlace () {
    const { ctx, $service, $helper, $model } = app
    const { pageResumePlace } = $model
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
    let exist = await $service.baseService.queryOne(pageResumePlace, {key: content.key})
    if(exist){
      ctx.body = $helper.Result.fail('-1', '当前key已存在，请勿重复保存！')
      return
    }
    let result = await $service.baseService.save(pageResumePlace, content)
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '删除失败！')
    }
  },

  /**
   * 删除岗位类型分类
   * @returns {Promise<void>}
   */
  async deleteResumeCategory () {
    const { ctx, $service, $helper, $model } = app
    const { pageResumeCategory } = $model
    const { id } = ctx.query
    if(!id){
      ctx.body = $helper.Result.fail(-1, '参数缺失（id不存在）！')
      return
    }
    let result = await $service.baseService.delete(id, pageResumeCategory)
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '删除失败！')
    }
  },

  /**
   * 删除岗位地区分类
   * @returns {Promise<void>}
   */
  async deleteResumePlace () {
    const { ctx, $service, $helper, $model } = app
    const { pageResumePlace } = $model
    const { id } = ctx.query
    if(!id){
      ctx.body = $helper.Result.fail(-1, '参数缺失（id不存在）！')
      return
    }
    let result = await $service.baseService.delete(id, pageResumePlace)
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '删除失败！')
    }
  },

  /**
   * 获取岗位地区分类列表
   * @returns {Promise<void>}
   */
  async getResumePlaceList () {
    const { ctx, $service, $helper } = app
    let { page, pageSize, status } = ctx.request.body
    if(!page || page <= 0) {
      page = 1
    }
    if(!pageSize || pageSize < 0 ){
      pageSize = 10
    }
    let r = await $service.resumeService.getPlaceList(page, pageSize, status)
    ctx.body = $helper.Result.success(r)
  },

  /**
   * 更新简历内容
   * @returns {Promise<void>}
   */
  async updateResume () {
    const { ctx, $service, $helper, $model } = app
    const { pageResume } = $model
    const { content, id } = ctx.request.body
    if(!id){
      ctx.body = $helper.Result.fail(-1,'id不存在！')
      return
    }
    let r = await $service.baseService.updateById(pageResume, id, content)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '操作失败！')
    }
  },

  /**
   * 删除简历
   * @returns {Promise<void>}
   */
  async deleteResume () {
    const { ctx, $service, $helper, $model } = app
    const { pageResume } = $model
    const { id } = ctx.query
    if(!id){
      ctx.body = $helper.Result.fail(-1, '参数缺失（id不存在）！')
      return
    }
    let result = await $service.baseService.delete(id, pageResume)
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '删除失败！')
    }
  }
})
