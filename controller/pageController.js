module.exports = app => ({
  async index() {
    const { ctx, $helper, $service, $nodeCache } = app;
    let pagePath = 'page/page-index/template2'
    await ctx.render(pagePath, {
      title: '首页',
      key: 'index',
      navKey: 'index',
    })
  },
})
