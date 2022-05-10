const parse = require('urlparse')
module.exports = app => {
  return async function(ctx, next) {
    // todo：
    // kcoco 端口 8090 、rcoco（admin）在8091
    // api架构：（通过nginx反向代理分发）
    // 1、{域名}/index   url不是api开头，直接返回渲染模板，
    // 2、{域名}/api/xxx  url是api开头，则视为接口
    //    a、非auth结尾，比如：{域名}/api/clue/save（官网提交表单接口），不需要登录即可调用
    //    b、以auth结尾，比如：{域名}/api/admin/getUserInfo/auth （获取用户信息接口），则需要鉴权

    // 登录jwt

    // 权限简单设计
    // 1、角色权限
    // 2、UI权限（控制前端UI视图的显示）
    // 3、url权限（控制接口访问权限，无权限直接返回错误）
    // 4、路由菜单权限（跳转404、403页面）


    const { $helper } = app
    const parser = parse(ctx.request.url)
    const { path } = parser

    if(path.indexOf('/auth') < 0) {
      // 非auth接口直接通过校验
      await next();
      return
    }

    // token只能从header中取，前后端约定好。不能从cookie中拿，防止csrf攻击。
    let accessToken = ctx.header.authorization
    let isLogin

    try {
      // 解析token，判断是不是服务器下发的token（token由登录接口下发，并保存在客户端）
      isLogin = !!await $helper.checkToken(accessToken)
    } catch (e) {
      ctx.body = $helper.Result.error('SYS_TOKEN_CHECK_ERROR')
    }

    if(!isLogin) {
      ctx.body = $helper.Result.error('USER_NOT_LOGIN')
      return
    }

    let userInfo

    try {
      userInfo = await $helper.decodeToken(accessToken)
    } catch (e) {
      ctx.body = $helper.Result.error('SYS_TOKEN_DECODE_ERROR')
    }

    // 挂载userinfo
    ctx.userInfo = userInfo

    await next();
  }
}
