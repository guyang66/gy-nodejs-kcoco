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

})
