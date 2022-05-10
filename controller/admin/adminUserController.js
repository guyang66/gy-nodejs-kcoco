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
})
