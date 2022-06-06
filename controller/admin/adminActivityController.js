module.exports = app => ({
  async getActivityCategory () {
    const { ctx, $service, $helper, $model } = app
    const { pageActivity } = $model
    let result = await $service.baseService.query(pageActivity)
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },
  /**
   * 获取活动列表
   * @returns {Promise<void>}
   */
  async getActivityList () {
    const { ctx, $service, $helper } = app
    let { page, pageSize, status, searchKey, orderSort, type } = ctx.request.body
    if(!type || type === ''){
      ctx.body = $helper.Result.fail(-1,'未指定查询type！')
      return
    }
    let result
    if(type === 'product'){
      result = await $service.activityService.getProductActivityList( page, pageSize, status, searchKey, orderSort)
    } else if(type === 'hot'){
      result = await $service.activityService.getHotActivityList( page, pageSize, status, searchKey, orderSort)
    } else if(type === 'brand'){
      result = await $service.activityService.getBrandActivityList( page, pageSize, status, searchKey, orderSort)
    }  else {
      ctx.body = $helper.Result.fail(-1,'未知的type类型（type：' + type + '）')
      return
    }
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * 更新活动
   * @returns {Promise<void>}
   */
  async updateActivity () {
    const { ctx, $service, $helper, $model } = app
    const { pageProductActivity, pageHotActivity, pageBrandActivity } = $model
    const { content, id, type } = ctx.request.body
    if(!id){
      ctx.body = $helper.Result.fail(-1,'id不存在！')
      return
    }
    if(!type || type === ''){
      ctx.body = $helper.Result.fail(-1,'未指定查询type！')
      return
    }
    let result
    if(type === 'product'){
      result = await $service.baseService.updateById(pageProductActivity, id, content)
    } else if(type === 'hot'){
      result = await $service.baseService.updateById(pageHotActivity, id, content)
    } else if(type === 'brand'){
      result = await $service.baseService.updateById(pageBrandActivity, id, content)
    }  else {
      ctx.body = $helper.Result.fail(-1,'未知的type类型（type：' + type + '）')
      return
    }
    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '操作失败！')
    }
  },

  /**
   * 删除活动
   * @returns {Promise<void>}
   */
  async deleteActivity () {
    const { ctx, $service, $helper, $model } = app
    const { pageProductActivity, pageHotActivity, pageBrandActivity } = $model
    const { id, type } = ctx.query
    if(!id){
      ctx.body = $helper.Result.fail(-1,'id不存在！')
      return
    }
    if(!type || type === ''){
      ctx.body = $helper.Result.fail(-1,'未指定查询type！')
      return
    }
    let result
    if(type === 'product'){
      result = await $service.baseService.delete(pageProductActivity, id)
    } else if(type === 'hot'){
      result = await $service.baseService.delete(pageHotActivity, id)
    } else if(type === 'brand'){
      result = await $service.baseService.delete(pageBrandActivity, id)
    } else {
      ctx.body = $helper.Result.fail(-1,'未知的type类型（type：' + type + '）')
      return
    }

    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '删除失败！')
    }
  },

  /**
   *
   * @returns {Promise<void>}
   */
  async setMainActivity () {
    const { ctx, $service, $helper } = app
    const { id, type } = ctx.query
    if(!id){
      ctx.body = $helper.Result.fail(-1,'id不存在！')
      return
    }
    if(!type || type === ''){
      ctx.body = $helper.Result.fail(-1,'未指定查询type！')
      return
    }
    let result
    if(type === 'product'){
      result = await $service.activityService.setMainProductActivity(id)
    } else {
      ctx.body = $helper.Result.fail(-1,'未知的type类型（type：' + type + '）')
      return
    }

    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '设置失败！')
    }
  },

  /**
   * 保存活动
   * @returns {Promise<void>}
   */
  async saveActivity () {
    const { ctx, $service, $helper, $model } = app
    const { pageProductActivity, pageHotActivity, pageBrandActivity } = $model
    const { content, type } = ctx.request.body
    if(!content){
      ctx.body = $helper.Result.fail(-1, '没有需要保存的内容！')
      return
    }

    if(!type || type === ''){
      ctx.body = $helper.Result.fail(-1,'未指定查询type！')
      return
    }

    if(!content.title || content.title === ''){
      ctx.body = $helper.Result.fail(-1, '名字不能为空')
      return
    }

    if(!content.desc || content.desc === ''){
      ctx.body = $helper.Result.fail(-1, '描述不能为空')
      return
    }

    if(!content.cover || content.cover === ''){
      ctx.body = $helper.Result.fail(-1, 'cover图不能为空')
      return
    }

    if(!content.href || content.href === ''){
      ctx.body = $helper.Result.fail(-1, '链接不能为空')
      return
    }

    if(!content.btnText || content.btnText === ''){
      ctx.body = $helper.Result.fail(-1, 'desc不能为空')
      return
    }

    if(type === 'product'){
      if(!content.type || content.type === ''){
        ctx.body = $helper.Result.fail(-1, 'type不能为空')
        return
      }
    }
    let result
    if(type === 'product'){
      let instance = {
        title: content.title,
        desc: content.desc,
        cover: content.cover,
        nofollow: !!content.nofollow,
        btnText: content.btnText,
        advantage: content.advantage || [],
        tag: content.tag || [],
        href: content.href,
        order: 1,
        status: 1,
        type: 'normal',
      }
      result = await $service.baseService.save(pageProductActivity, instance)
    } else if(type === 'hot'){
      let instance = {
        title: content.title,
        desc: content.desc,
        cover: content.cover,
        nofollow: !!content.nofollow,
        btnText: content.btnText,
        date: content.date,
        location: content.location,
        href: content.href,
        order: 1,
        status: 1,
        type: '',
      }
      result = await $service.baseService.save(pageHotActivity, instance)
    } else if(type === 'brand'){
      let instance = {
        title: content.title,
        desc: content.desc,
        cover: content.cover,
        nofollow: !!content.nofollow,
        btnText: content.btnText,
        href: content.href,
        order: 1,
        status: 1,
      }
      result = await $service.baseService.save(pageBrandActivity, instance)
    } else {
      ctx.body = $helper.Result.fail(-1,'未知的type类型（type：' + type + '）')
      return
    }

    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '保存失败！')
    }
  },

  /**
   * 获取活动统计数据
   * @returns {Promise<void>}
   */
  async getActivityStaticsVisit () {
    const { ctx, $service, $helper } = app
    const { date, top, category } = ctx.query
    if(!category || category === ''){
      ctx.body = $helper.Result.fail(-1, '未指定活动模块名字！')
      return
    }
    const interval = $helper.getDateInterval(date)
    let r = await $service.activityService.StaticsVisit({...interval, top, category })
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '操作失败！')
    }
  },

  /**
   * 获取活动埋点数据源
   * @returns {Promise<void>}
   */
  async getActivityStaticsRecord () {
    const { ctx, $service, $helper, $model } = app
    const {pageBrandActivity, pageHotActivity, pageProductActivity} = $model
    let { page, pageSize, searchKey, startTime, endTime, category} = ctx.request.body
    if(!page || page <= 0) {
      page = 1
    }
    if(!pageSize || pageSize < 0 ){
      pageSize = 10
    }

    let r = await $service.recordService.getActivityRecordList(page, pageSize, category, searchKey, startTime, endTime)

    // 活动表没设计好，所有这里走了背包路...，还得再查一次找到活动详情,所以这个接口响应时间也会变慢...
    let tmp = []
    for(let i = 0; i < r.list.length;i++){
      let item = r.list[i]
      let activityDetail
      if(item.category === 'hot'){
        activityDetail = await $service.baseService.queryById(pageHotActivity,item.objectId)
      } else if (item.category === 'brand'){
        activityDetail = await $service.baseService.queryById(pageBrandActivity,item.objectId)
      } else if (item.category === 'product'){
        activityDetail = await $service.baseService.queryById(pageProductActivity,item.objectId)
      }
      tmp.push(
        {
          createTime: item.createTime,
          modifyTime: item.modifyTime,
          type: item.type,
          typeString: item.typeString,
          name: item.name,
          ip: item.ip,
          category: item.category,
          phone: item.phone,
          _id: item._id,
          title: activityDetail ? activityDetail.title : '未知'
        })
    }
    r.list = tmp
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  }
})
