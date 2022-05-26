// todo：注意用户信息不能把密码信息也查询出来返回前端
// 设置mongodb投影，隐藏密码字段, 1:表示显示；0：表示隐藏
let selectUserKey = { password: 0 };
module.exports = app => ({
  /**
   * 根据用户名查找用户
   * @param username
   * @returns {Promise<void>}
   */
  async getUsersByUsername(username){
    const { $model, $helper } = app;
    const { adminUser } = $model
    if (username.length === 0) {
      return $helper.wrapResult(true, null)
    }
    const query = { username: username, status: 1 };
    // username 是unique值，可以使用findOne方法
    return  await adminUser.findOne(query, selectUserKey).exec();
  },

  /**
   * 根据用户名查找password
   * @param username
   * @returns {Promise<void>}
   */
  async getUsersPasswordByUsername(username) {
    const { $model, $helper } = app;
    const { adminUser } = $model;
    if (username.length === 0) {
      return $helper.wrapResult(true, null)
    }
    const query = {username: {$in: username}};
    return await adminUser.findOne(query).select('password').exec();
  },

  /**
   * 获取用户信息
   * @param id
   * @returns {Promise<*>}
   */
  async getUserInfoById(id) {
    const { $model } = app;
    const { adminUser } = $model;
    let r = await adminUser.findById(id, selectUserKey, function (err){
      if(err){
        console.log(err)
      }
    })
    return r
  },

  /**
   * 分页查询系统用户
   * @param page
   * @param pageSize
   * @param status
   * @param searchKey
   * @returns {Promise<void>}
   */
  async getList (page = 1, pageSize = 10, status, searchKey) {
    const { $utils, $log4, $model } = app
    const { errorLogger } = $log4
    const { adminUser } = $model

    let searchParams = {}
    if(searchKey && searchKey !== ''){
      let p1 = {
        "$or": [
          {
            "name": new RegExp(searchKey,'i')
          },
          {
            "username": new RegExp(searchKey,'i')
          },
          {
            "phone": new RegExp(searchKey,'i')
          },
          {
            "email": new RegExp(searchKey,'i')
          },
          {
            "position": new RegExp(searchKey,'i')
          },
          {
            "department": new RegExp(searchKey,'i')
          },
        ]
      }
      let p2 = {}
      if(status !== null && status !== undefined){
        p2.status = status
      }
      searchParams = $utils.isEmptyObject(p2) ? p1 : {"$and": [p1, p2]}
    } else {
      if(status !== null && status !== undefined){
        searchParams.status = status
      }
    }
    let sortParam = {
      _id: -1
    }
    let list
    let total = await adminUser.find(searchParams).countDocuments()
    list = await adminUser.find(searchParams, selectUserKey, {skip: pageSize * (page < 1 ? 0 : (page - 1)), limit: (pageSize - 0), sort: sortParam }, function (err){
      if(err){
        errorLogger.error(err)
      }
    })

    return { list, total }
  },

  async createUser (username, password) {
    const { $model } = app
    const { adminUser } = $model
    await adminUser.create(
      {
        username: username,
        password: password,
        email: '',
        name: '默认姓名',
        roles: ['guest'],
        defaultRole: 'guest',
        defaultRoleName: '游客',
        status: 1
      }
    )
    const query = {username: {$in: username}};
    return await adminUser.findOne(query, selectUserKey).exec();
  }

})
