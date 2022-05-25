const parse = require('urlparse')

module.exports = app => {
  return async function(ctx) {
    const { $config } = app
    const parser = parse(ctx.request.url)
    const { path } = parser
    //不是api接口(即官网页面)的全部重定向到首页
    if(path.indexOf('/api') > 0) {
      await next();
      return
    }
    if(process.env.NODE_ENV === 'production' || $config.redirect ){
      ctx.redirect('/')
    }
  };
}
