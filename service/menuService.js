module.exports = app => ({
  /**
   * 获取用户对应的可用菜单
   * @returns {Promise<*[]>}
   */
  async getAdminMenu () {
    const { userInfo } = app.ctx

    let p1 = {
      status: 1,
    }

    let p2
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

    const { adminMenu } = app.$model
    const { errorLogger } = app.$log4

    let sortParams = {
      order: -1
    }
    // 现在所有菜单都在数据库中，也就是说是一个拍平的数组，以level为区分，level=1代表顶级菜单，level=2代表2级菜单
    // 查询一次，逻辑在service中处理，之前只有两级菜单的时候是查询一次，然后遍历有child的再查询一次，如果层级多了就该走递归啦。
    let allMenus = await adminMenu.find(query, {}, {sort: sortParams }, function (err){
      if(err){
        errorLogger.error(err)
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
})
