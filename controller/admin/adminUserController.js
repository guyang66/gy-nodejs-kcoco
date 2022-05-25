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
      $helper.Result.fail(-1,e)
    }
    if(!user){
      $helper.Result.fail(-1, '用户信息不存在')
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
    const { adminUser } = $model
    const { content, id } = ctx.request.body
    if(!id){
      ctx.body = $helper.Result.fail(-1,'参数有误（id不存在）！')
      return
    }

    if($utils.isEmptyObject(content)){
      ctx.body = $helper.Result.success('更新成功！')
      return
    }

    // todo: 处理默认角色name

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
      ctx.body = $helper.Result.success('ok')
    } else {
      ctx.body = $helper.Result.fail(-1, 'fail')
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
  }

})
