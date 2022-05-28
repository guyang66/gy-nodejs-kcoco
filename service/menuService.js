module.exports = app => ({
  /**
   * 获取客户端可用权限菜单
   * @returns {Promise<*[]>}
   */
  async getAdminMenu () {
    const { $model, $log4, ctx } = app
    const { userInfo } = ctx
    const { adminMenu } = $model
    const { errorLogger } = $log4
    let p1 = { status: 1}
    let p2
    // 过滤掉admin和superAdmin两个角色（前后端规定：因为这两个角色默认拥有所有路由和菜单权限）
    if(userInfo.defaultRole !== 'admin' && userInfo.defaultRole !== 'superAdmin'){
      p2 = {
        roles: {
          $elemMatch: {$regex: new RegExp(userInfo.defaultRole, 'i')}
        }
      }
    }
    let p = {
      isCommon: 1
    }
    let query = {
      "$or": [
        p,
        p2 ? { "$and": [p1, p2]} : p1
      ]
    }
    let sortParams = {
      order: -1
    }
    // 现在所有菜单都在数据库中，也就是说是一个拍平的数组，以level为区分，level=1代表顶级菜单，level=2代表2级菜单
    // 查询一次，逻辑在service中处理，之前只有两级菜单的时候是查询一次，然后遍历有child的再查询一次，如果层级多了就该走递归啦。
    let allMenus = await adminMenu.find(query, {}, {sort: sortParams }, function (err){
      if(err){
        console.log(err)
        errorLogger.error('【menuService】- getAdminMenu ：' + err.toString())
      }
    })
    /**
     * 递归查找子菜单
     * @param list
     * @param level
     * @param key
     * @returns {[]}
     */
    const collectChildren = (list, level, key) => {
      //todo：将菜单按照parent和children关系组成一个树形结构, 讲道理这个应该是前端来处理，或者丢给controller来处理
      list = JSON.parse(JSON.stringify(list))
      let tmp = []
      for(let i = 0; i < list.length; i ++){
        let item = list[i]
        if(item.level !== level){
          continue
        }
        if(key && key !== item.parentMenu){
          continue
        }
        tmp.push(item)
      }
      tmp.forEach(item=>{
        // 如果有child，递归继续查找子菜单，知道所有菜单hasChild为false
        if(item.hasChild){
          item.children = collectChildren(list, level + 1, item.key)
        }
      })
      return tmp
    }
    return collectChildren(allMenus, 1)
  },

  /**
   * 分页查询菜单列表
   * @param page
   * @param pageSize
   * @param status
   * @param searchKey
   * @param isCommon
   * @param level
   * @param orderSort
   * @returns {Promise<{total: *, list: *}>}
   */
  async getList (page = 1, pageSize = 10, status, searchKey, isCommon, level, orderSort) {
    const { $utils, $log4, $model } = app
    const { errorLogger } = $log4
    const { adminMenu } = $model
    let searchParams = {}
    if(searchKey && searchKey !== ''){
      let p1 = {
        "$or": [
          {
            "title": new RegExp(searchKey,'i')
          },
          {
            "key": new RegExp(searchKey,'i')
          },
          {
            "path": new RegExp(searchKey,'i')
          }
        ]
      }
      let p2 = {}
      if( level ){
        p2.level = level
      }
      if(status !== null && status !== undefined){
        p2.status = status
      }
      if(isCommon !== null && isCommon !== undefined){
        p2.isCommon = isCommon
      }
      searchParams = $utils.isEmptyObject(p2) ? p1 : {"$and": [p1, p2]}
    } else {
      if(status !== null && status !== undefined){
        searchParams.status = status
      }
      if(isCommon !== null && isCommon !== undefined){
        searchParams.isCommon = isCommon
      }
      if(level){
        searchParams.level = level
      }
    }
    let sortParam = {}
    if(orderSort && orderSort !== ''){
      sortParam.order = orderSort === 'ascend' ? -1 : 1
    }
    sortParam._id = 1
    let total = await adminMenu.find(searchParams).countDocuments()
    let list = await adminMenu.find(searchParams, null, {skip: pageSize * (page < 1 ? 0 : (page - 1)), limit: (pageSize - 0), sort: sortParam }, function (err){
      if(err){
        console.log(err)
        errorLogger.error('【menuService】- getList:' + err.toString())
      }
    })
    return { list, total }
  }
})
