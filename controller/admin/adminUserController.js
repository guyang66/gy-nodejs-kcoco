module.exports = app => ({
  /**
   * 通过token获取用户信息
   * @returns {Promise<void>}
   */
  async getUserInfo () {
    const { ctx, $service, $helper } = app
    const token = ctx.header.authorization
    let user;
    try {
      // todo：这里用token关联user，考虑下用userId去数据库取最新数据，毕竟token关联的user是登录那一刻生成的静态数据
      user = await $helper.decodeToken(token)
    } catch (e) {
      ctx.body = $helper.Result.fail(-1,e)
      return
    }
    if(!user){
      ctx.body = $helper.Result.fail(-1, '用户信息不存在或未登录')
      return
    }
    let realUser = await $service.userService.getUserInfoById(user._id)
    ctx.body = $helper.Result.success(realUser)
  },

  /**
   * 更新用户信息
   * @returns {Promise<void>}
   */
  async updateUserInfo () {
    const { ctx, $service, $helper, $model, $utils } = app
    const { adminUser, adminRole } = $model
    const { content, id } = ctx.request.body
    if(!id){
      ctx.body = $helper.Result.fail(-1,'参数有误（id不存在）！')
      return
    }

    if($utils.isEmptyObject(content)){
      ctx.body = $helper.Result.success('更新成功！')
      return
    }

    // 禁止修改系统默认用户，比如超级管理员，权限最高不需要修改权限，用户信息可以通过登录之后到个人中心修改，禁止开启/关闭/删除账号，避免账号被搞没了，
    let exist = await $service.baseService.queryById(adminUser,id)
    if(exist && exist.noModify === 1){
      ctx.body = $helper.Result.fail(-1, '不能修改系统默认用户信息！')
      return
    }

    // 处理默认角色
    let roles = await $service.baseService.query(adminRole, {status: 1}) || []
    if(content.roles && content.roles.length > 0){
      let currentUser = await $service.baseService.queryById(id, adminUser)
      let roleInstance = content.roles.find( item =>{
        return item === currentUser.defaultRole
      })
      if(!roleInstance) {
        content.defaultRole = content.roles[0]
        content.defaultRoleName = roles.find(role=>{
          return role.key === content.defaultRole
        }).name
      }
    }

    let r = await $service.baseService.updateById(adminUser, id, content)
    if(r){
      ctx.body = $helper.Result.success('更新成功！')
    } else {
      ctx.body = $helper.Result.error('SYSTEM_ERROR')
    }
  },

  /**
   * 用户修改自己的用户信息
   * @returns {Promise<void>}
   */
  async modifyUserInfo () {
    const { ctx, $service, $helper, $model } = app
    const { adminUser } = $model
    const { content, id } = ctx.request.body
    if(!id){
      ctx.body = $helper.Result.fail(-1,'参数有误（id不存在）！')
      return
    }
    const token = ctx.header.authorization
    let user;
    try {
      user = await $helper.decodeToken(token)
    } catch (e) {
      ctx.body = $helper.Result.fail(-1,e.toString())
      return
    }
    if(!user){
      ctx.body = $helper.Result.fail(-1, '用户信息不存在或未登录')
      return
    }
    let modifyUser = await $service.baseService.queryById(adminUser, id)
    if(user.username !== modifyUser.username){
      ctx.body = $helper.Result.fail(-1,'无权修改（如你是管理员，请到管理后台->用户管理进行用户信息修改）！')
      return
    }

    let r = await $service.baseService.updateById(adminUser, id, content)
    if(r){
      ctx.body = $helper.Result.success('更新成功！')
    } else {
      ctx.body = $helper.Result.error('SYSTEM_ERROR')
    }
  },

  /**
   * 修改密码
   * @returns {Promise<void>}
   */
  async updatePassword () {
    const { ctx, $service, $model, $helper } = app
    const { adminUser } = $model
    let { password, verifyCode } = ctx.request.body
    let code =  ctx.session.captcha
    if(!password || password === ''){
      ctx.body = $helper.Result.fail(-1,'密码不能设置为空！')
      return
    }

    if(!verifyCode || verifyCode === '' || verifyCode.length !== 4){
      ctx.body = $helper.Result.fail(-1,'验证码格式有误！')
      return
    }

    if(verifyCode.toLowerCase() !== code){
      ctx.body = $helper.Result.fail(-1,'验证码错误！')
      return
    }
    const token = ctx.header.authorization
    let userInfo;
    try {
      userInfo = await $helper.decodeToken(token)
    } catch (e) {
      $helper.Result.fail(-1,e)
    }
    if(!userInfo){
      $helper.Result.fail(-1, '用户信息不存在或者用户未登录')
    }

    let pass = await $helper.createPassword(password.toString())
    let r = await $service.baseService.updateById(adminUser, userInfo._id, {password: pass})
    if(r){
      ctx.body = $helper.Result.success('修改成功！')
    } else {
      ctx.body = $helper.Result.fail(-1, '修改失败！')
    }
  },

  /**
   * 重置密码
   * @returns {Promise<void>}
   */
  async resetPassword () {
    const { ctx, $service, $helper, $model } = app
    const { adminUser } = $model
    const { id } = ctx.query
    if(!id){
      ctx.body = $helper.Result.fail(-1, '参数缺失（id不存在）！')
      return
    }
    let newPassword = await $helper.createPassword('1')
    let r = await $service.baseService.updateById(adminUser, id, {password: newPassword})
    if(r){
      ctx.body = $helper.Result.success('重置成功！')
    } else {
      ctx.body = $helper.Result.fail(-1, '重置密码失败！')
    }
  },

  /**
   * 获取所有用户列表
   * @returns {Promise<void>}
   */
  async getUserList () {
    const { ctx, $service, $helper } = app
    let { page, pageSize, status, searchKey } = ctx.request.body
    if(!page || page <= 0) {
      page = 1
    }
    if(!pageSize || pageSize < 0 ){
      pageSize = 10
    }

    let r = await $service.userService.getList(page, pageSize, status, searchKey)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '查询失败！')
    }
  },

  /**
   * 删除用户
   * @returns {Promise<void>}
   */
  async deleteUser () {
    const { ctx, $service, $helper, $model } = app
    const { adminUser } = $model
    const { id } = ctx.query
    if(!id){
      ctx.body = $helper.Result.fail(-1, '参数缺失（id不存在）！')
      return
    }

    let exist = await $service.baseService.queryById(adminUser,id)
    if(exist && exist.noModify === 1){
      ctx.body = $helper.Result.fail(-1, '不能删除系统默认用户！')
      return
    }
    if(exist && exist.status !== 0){
      ctx.body = $helper.Result.fail(-1, '请先禁用用户，再进行删除操作！')
      return
    }

    let result = await $service.baseService.delete(adminUser, id)

    if(result){
      ctx.body = $helper.Result.success(result)
    } else {
      ctx.body = $helper.Result.fail(-1, '删除失败！')
    }
  },

  /**
   * 创建用户
   * @returns {Promise<void>}
   */
  async createUser () {
    const { ctx, $service, $helper, $model } = app
    const { adminUser } = $model
    const { username } = ctx.request.body
    if(!username || username === ''){
      ctx.body = 'username为空！'
      return
    }

    let existUser = await $service.baseService.queryOne(adminUser, {username: username})
    if(existUser){
      ctx.body = $helper.Result.fail('-1', '当前用户已存在！')
      return
    }

    let pass = await $helper.createPassword('1')
    let r = await $service.userService.createUser(username, pass)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '创建用户失败！')
    }
  },

})
