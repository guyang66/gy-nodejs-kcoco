module.exports = app => ({
  async index() {
    const { ctx, $helper, $service, $nodeCache } = app;
    const bannerData = require('../mock/index/banner')
    const columnData = require('../mock/index/column')
    const productData = require('../mock/index/product')
    const logoData = require('../mock/index/logo')
    const staticsData = require('../mock/index/statics')
    const customerData = require('../mock/index/customer')
    const solutionData = require('../mock/index/solution')
    const certifyData = require('../mock/index/certify')
    const resourceData = require('../mock/index/resource')
    const newsData = require('../mock/index/news')

    let pagePath = 'page/page-index/template'
    await ctx.render(pagePath, {
      title: '首页',
      key: 'index',
      navKey: 'index',
      hasBanner: 'false',
      bannerData: bannerData,
      columnData: columnData,
      productData: productData,
      logoData: logoData,
      staticsData: staticsData,
      customerData: customerData,
      solutionData: solutionData,
      certifyData: certifyData,
      resourceData: resourceData,
      newsData: newsData
    })
  },
})
