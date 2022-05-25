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
    let { page, pageSize, status, column, searchKey, place, category, orderSort } = ctx.request.body
    if(!page || page <= 0) {
      page = 1
    }
    if(!pageSize || pageSize < 0 ){
      pageSize = 10
    }

    let r = await $service.resumeService.getList(page, pageSize, status, column, searchKey, place, category, orderSort)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
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
    let result = await $service.baseService.save(pageResumeCategory, {...content, createTime: new Date(), modifyTime: new Date()})
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
    let result = await $service.baseService.save(pageResumePlace, {...content, createTime: new Date(), modifyTime: new Date()})
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
    let result = await $service.baseService.delete(pageResumeCategory, id)
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
    let result = await $service.baseService.delete(pageResumePlace, id)
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
    let result = await $service.baseService.delete(pageResume, id)
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '删除失败！')
    }
  },

  /**
   * 保存简历
   * @returns {Promise<void>}
   */
  async saveResume () {
    const { ctx, $service, $helper, $model } = app
    const { pageResume } = $model
    const { content } = ctx.request.body

    if(!content.title || content.title === ''){
      ctx.body = $helper.Result.fail(-1,'标题不能为空！')
      return
    }

    if(!content.key || content.key === ''){
      ctx.body = $helper.Result.fail(-1,'岗位类别（key）不能为空！')
      return
    }

    if(!content.category || content.category === ''){
      ctx.body = $helper.Result.fail(-1,'岗位分类（category）不能为空！')
      return
    }

    if(!content.place || content.place === ''){
      ctx.body = $helper.Result.fail(-1,'岗位地区（place）不能为空！')
      return
    }

    if(!content.contact || content.contact === ''){
      ctx.body = $helper.Result.fail(-1,'联系方式不能为空！')
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
    let max = await $service.baseService.queryOne(pageResume,{},{id: 1},{sort :{id: -1}})
    let id = max ? (max.id + 1) : 1

    let instance = {
      id: id,
      title: content.title,
      desc: content.desc || '',
      key: content.key,
      department: content.department || '',
      category: content.category,
      place: content.place,
      experience: content.experience || '',
      education: content.education || '',
      date: content.date,
      contact: content.contact,
      tag: content.tag || [],
      href: content.href,
      require: content.require || [],
      duty: content.duty || [],
      pluses: content.pluses || [],
      isTop: 1,
      status: 1,
      order: 1,
      createTime: new Date(),
      modifyTime: new Date()
    }

    let result = await $service.baseService.save(pageResume, instance)
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '保存失败！')
    }
  },

  /**
   * 获取简历详情
   * @returns {Promise<void>}
   */
  async getResumeDetail () {
    const { ctx, $service, $helper, $model } = app
    const { pageResume } = $model
    const { id } = ctx.query
    if(!id){
      ctx.body = $helper.Result.fail(-1, '参数缺失（id不存在）！')
      return
    }
    let result = await $service.baseService.queryById(pageResume, id)
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * 获取简历标签
   * @returns {Promise<void>}
   */
  async getTagList () {
    const { ctx, $service, $helper, $model } = app
    const { pageCommonTag } = $model
    let result = await $service.baseService.query(pageCommonTag, { mainKey: 'resume_tag'}, {key: "$secKey", name: 1, mainKey: 1, status: "$status", remark: 1})
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * 更新简历标签
   * @returns {Promise<void>}
   */
  async updateResumeTag () {
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

  /**
   * 删除简历标签
   * @returns {Promise<void>}
   */
  async deleteResumeTag () {
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
   * 新增简历标签
   * @returns {Promise<void>}
   */
  async saveResumeTag () {
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

    let mainKey = 'resume_tag'

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
      status: 1,
      createTime: new Date(),
      modifyTime: new Date()
    }
    let result = await $service.baseService.save(pageCommonTag, instance)
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '删除失败！')
    }
  }
})
