// todo：注意用户信息不能把密码信息也查询出来返回前端
// 设置mongodb投影，隐藏密码字段, 1:表示显示；0：表示隐藏
let selectUserKey = { password: 0 };
module.exports = app => ({
  /**
   * 根据用户名查找用户
   * @param username
   * @returns {Promise<*|{result}|boolean>}
   */
  async getUsersByUsername(username){
    const { $model, $helper,$log4 } = app;
    const { errorLogger } = $log4
    const { adminUser } = $model
    if (username.length === 0) {
      return $helper.wrapResult(true, null)
    }
    const query = { username: username, status: 1 };
    // username 是unique值，可以使用findOne方法
    try {
      return await adminUser.findOne(query, selectUserKey).exec();
    } catch (e) {
      console.log(e)
      errorLogger.error('【userService】- getUsersByUsername:' + e.toString())
      return false
    }
  },

  /**
   * 根据用户名查找password
   * @param username
   * @returns {Promise<*|{result}|boolean>}
   */
  async getUsersPasswordByUsername(username) {
    const { $model, $helper, $log4 } = app;
    const { errorLogger } = $log4
    const { adminUser } = $model;
    if (username.length === 0) {
      return $helper.wrapResult(true, null)
    }
    const query = {username: {$in: username}};
    try {
      return await await adminUser.findOne(query).select('password').exec();
    } catch (e) {
      console.log(e)
      errorLogger.error('【userService】- getUsersPasswordByUsername:' + e.toString())
      return false
    }
  },

  /**
   * 获取用户信息
   * @param id
   * @returns {Promise<*>}
   */
  async getUserInfoById(id) {
    const { $model, $helper, $log4 } = app;
    const { errorLogger } = $log4
    const { adminUser } = $model;
    let r = await adminUser.findById(id, selectUserKey, function (err){
      if(err){
        console.log(err)
        errorLogger.error('【userService】- getUserInfoById:' + err.toString())
      }
    })
    if(r){
      return $helper.wrapResult(true, r)
    } else {
      return $helper.wrapResult(false, '未找到用户！', -1)
    }
  },

  /**
   * 分页查询系统用户
   * @param page
   * @param pageSize
   * @param status
   * @param searchKey
   * @returns {Promise<{total: *, list: *}>}
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
    let total = await adminUser.find(searchParams).countDocuments()
    let list = await adminUser.find(searchParams, selectUserKey, {skip: pageSize * (page < 1 ? 0 : (page - 1)), limit: (pageSize - 0), sort: sortParam }, function (err){
      if(err){
        errorLogger.error('【userService】- getList:' + err.toString())
      }
    })
    return { list, total }
  },

  /**
   * 创建用户
   * @param username
   * @param password
   * @returns {Promise<*>}
   */
  async createUser (username, password) {
    const { $model, $log4 } = app
    const { errorLogger } = $log4
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
    try {
      return await adminUser.findOne(query, selectUserKey).exec();
    } catch (e) {
      console.log(e)
      errorLogger.error('【userService】- createUser:' + e.toString())
      return false
    }
  }
})
