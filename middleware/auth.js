module.exports = app => {
  return async function(ctx, next) {
    //todo: 做一些鉴权操作和匹配规则
    console.log('经过这个auth中间件')

    // 不需要鉴权的接口就不需要添加该中间件

    // 尝试做一些简单的过滤, 当请求是/auth结尾的，校验权限，如果header中带有appid ，且值为gy ，通过权限校验
    if(ctx.request.url.indexOf('/auth') > 0 ){
      if(ctx.request.header['appid'] !== 'gy'){
        // 提前返回
        ctx.body = '无权访问'
        return
      }
    }

    await next();
  }
}
