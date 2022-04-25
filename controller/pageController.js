module.exports = app => ({

  /**
   * 首页
   * @returns {Promise<void>}
   */
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
      hasBanner: false,
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

  /**
   * AI算法
   * @returns {Promise<void>}
   */
  async algorithm () {
    const { ctx } = app;
    const bannerData = require('../mock/product/ai/algorithm/banner')
    const advantageData = require('../mock/product/ai/algorithm/advantage')
    const coreData = require('../mock/product/ai/algorithm/core')
    const applyData = require('../mock/product/ai/algorithm/apply')
    const historyData = require('../mock/product/ai/algorithm/history')
    const caseData = require('../mock/product/ai/algorithm/case')
    const tabsData = require('../mock/product/ai/algorithm/tabsData')
    let pagePath = 'page/product/ai/page-algorithm/template'
    await ctx.render(pagePath, {
      title: 'AI算法',
      key: 'algorithm',
      navKey: 'product',
      hasBanner: true,
      bannerData: bannerData,
      advantageData: advantageData,
      coreData: coreData,
      applyData: applyData,
      historyData: historyData,
      caseData: caseData,
      tabsData: tabsData
    })
  },

  /**
   * AI语音
   * @returns {Promise<void>}
   */
  async speech () {
    const { ctx } = app;
    const bannerData = require('../mock/product/ai/speech/banner')
    const advantageData = require('../mock/product/ai/speech/advantage')
    const coreData = require('../mock/product/ai/speech/core')
    const applyData = require('../mock/product/ai/speech/apply')
    const historyData = require('../mock/product/ai/speech/history')
    const caseData = require('../mock/product/ai/speech/case')
    const tabsData = require('../mock/product/ai/speech/tabsData')
    let pagePath = 'page/product/ai/page-speech/template'
    await ctx.render(pagePath, {
      title: 'AI语音',
      key: 'speech',
      navKey: 'product',
      hasBanner: true,
      bannerData: bannerData,
      advantageData: advantageData,
      coreData: coreData,
      applyData: applyData,
      historyData: historyData,
      caseData: caseData,
      tabsData: tabsData
    })
  },

  /**
   * AI识别
   * @returns {Promise<void>}
   */
  async discriminate () {
    const { ctx } = app;
    const bannerData = require('../mock/product/ai/discriminate/banner')
    const advantageData = require('../mock/product/ai/discriminate/advantage')
    const coreData = require('../mock/product/ai/discriminate/core')
    const applyData = require('../mock/product/ai/discriminate/apply')
    const historyData = require('../mock/product/ai/discriminate/history')
    const caseData = require('../mock/product/ai/discriminate/case')
    const tabsData = require('../mock/product/ai/discriminate/tabsData')
    let pagePath = 'page/product/ai/page-discriminate/template'
    await ctx.render(pagePath, {
      title: 'AI识别',
      key: 'discriminate',
      navKey: 'product',
      hasBanner: true,
      bannerData: bannerData,
      advantageData: advantageData,
      coreData: coreData,
      applyData: applyData,
      historyData: historyData,
      caseData: caseData,
      tabsData: tabsData
    })
  },

  /**
   * 企业云
   * @returns {Promise<void>}
   */
  async enterprise () {
    const { ctx } = app;
    const bannerData = require('../mock/product/ai/enterprise/banner')
    const advantageData = require('../mock/product/ai/enterprise/advantage')
    const coreData = require('../mock/product/ai/enterprise/core')
    const applyData = require('../mock/product/ai/enterprise/apply')
    const historyData = require('../mock/product/ai/enterprise/history')
    const caseData = require('../mock/product/ai/enterprise/case')
    const tabsData = require('../mock/product/ai/enterprise/tabsData')
    let pagePath = 'page/product/ai/page-enterprise/template'
    await ctx.render(pagePath, {
      title: '企业云',
      key: 'enterprise',
      navKey: 'product',
      hasBanner: true,
      bannerData: bannerData,
      advantageData: advantageData,
      coreData: coreData,
      applyData: applyData,
      historyData: historyData,
      caseData: caseData,
      tabsData: tabsData
    })
  },

  /**
   * 数字云
   * @returns {Promise<void>}
   */
  async digital () {
    const { ctx } = app;
    const bannerData = require('../mock/product/ai/digital/banner')
    const advantageData = require('../mock/product/ai/digital/advantage')
    const coreData = require('../mock/product/ai/digital/core')
    const applyData = require('../mock/product/ai/digital/apply')
    const historyData = require('../mock/product/ai/digital/history')
    const caseData = require('../mock/product/ai/digital/case')
    const tabsData = require('../mock/product/ai/digital/tabsData')
    let pagePath = 'page/product/ai/page-digital/template'
    await ctx.render(pagePath, {
      title: '数字云',
      key: 'digital',
      navKey: 'product',
      hasBanner: true,
      bannerData: bannerData,
      advantageData: advantageData,
      coreData: coreData,
      applyData: applyData,
      historyData: historyData,
      caseData: caseData,
      tabsData: tabsData
    })
  },

  /**
   * 清水
   * @returns {Promise<void>}
   */
  async qingshui () {
    const { ctx } = app;
    const bannerData = require('../mock/product/ai/qingshui/banner')
    const advantageData = require('../mock/product/ai/qingshui/advantage')
    const coreData = require('../mock/product/ai/qingshui/core')
    const applyData = require('../mock/product/ai/qingshui/apply')
    const historyData = require('../mock/product/ai/qingshui/history')
    const caseData = require('../mock/product/ai/qingshui/case')
    const tabsData = require('../mock/product/ai/qingshui/tabsData')
    let pagePath = 'page/product/ai/page-qingshui/template'
    await ctx.render(pagePath, {
      title: '清水',
      key: 'qingshui',
      navKey: 'product',
      hasBanner: true,
      bannerData: bannerData,
      advantageData: advantageData,
      coreData: coreData,
      applyData: applyData,
      historyData: historyData,
      caseData: caseData,
      tabsData: tabsData
    })
  },

  /**
   * 菩提
   * @returns {Promise<void>}
   */
  async puti () {
    const { ctx } = app;
    const bannerData = require('../mock/product/ai/puti/banner')
    const advantageData = require('../mock/product/ai/puti/advantage')
    const coreData = require('../mock/product/ai/puti/core')
    const applyData = require('../mock/product/ai/puti/apply')
    const historyData = require('../mock/product/ai/puti/history')
    const caseData = require('../mock/product/ai/puti/case')
    const tabsData = require('../mock/product/ai/puti/tabsData')
    let pagePath = 'page/product/ai/page-puti/template'
    await ctx.render(pagePath, {
      title: '菩提',
      key: 'puti',
      navKey: 'product',
      hasBanner: true,
      bannerData: bannerData,
      advantageData: advantageData,
      coreData: coreData,
      applyData: applyData,
      historyData: historyData,
      caseData: caseData,
      tabsData: tabsData
    })
  },

  /**
   * 数影
   * @returns {Promise<void>}
   */
  async shuying () {
    const { ctx } = app;
    const bannerData = require('../mock/product/ai/shuying/banner')
    const advantageData = require('../mock/product/ai/shuying/advantage')
    const coreData = require('../mock/product/ai/shuying/core')
    const applyData = require('../mock/product/ai/shuying/apply')
    const historyData = require('../mock/product/ai/shuying/history')
    const caseData = require('../mock/product/ai/shuying/case')
    const tabsData = require('../mock/product/ai/shuying/tabsData')
    let pagePath = 'page/product/ai/page-shuying/template'
    await ctx.render(pagePath, {
      title: '数影',
      key: 'shuying',
      navKey: 'product',
      hasBanner: true,
      bannerData: bannerData,
      advantageData: advantageData,
      coreData: coreData,
      applyData: applyData,
      historyData: historyData,
      caseData: caseData,
      tabsData: tabsData
    })
  },

  /**
   * 天眼杀
   * @returns {Promise<void>}
   */
  async tianyan () {
    const { ctx } = app;
    const bannerData = require('../mock/product/ai/tianyan/banner')
    const advantageData = require('../mock/product/ai/tianyan/advantage')
    const coreData = require('../mock/product/ai/tianyan/core')
    const applyData = require('../mock/product/ai/tianyan/apply')
    const historyData = require('../mock/product/ai/tianyan/history')
    const caseData = require('../mock/product/ai/tianyan/case')
    const tabsData = require('../mock/product/ai/tianyan/tabsData')
    let pagePath = 'page/product/ai/page-tianyan/template'
    await ctx.render(pagePath, {
      title: '天眼杀',
      key: 'tianyan',
      navKey: 'product',
      hasBanner: true,
      bannerData: bannerData,
      advantageData: advantageData,
      coreData: coreData,
      applyData: applyData,
      historyData: historyData,
      caseData: caseData,
      tabsData: tabsData
    })
  },

  /**
   * 蹄蹄智能办公
   * @returns {Promise<void>}
   */
  async titi () {
    const { ctx } = app;
    const bannerData = require('../mock/product/ai/titi/banner')
    const advantageData = require('../mock/product/ai/titi/advantage')
    const coreData = require('../mock/product/ai/titi/core')
    const applyData = require('../mock/product/ai/titi/apply')
    const historyData = require('../mock/product/ai/titi/history')
    const caseData = require('../mock/product/ai/titi/case')
    const tabsData = require('../mock/product/ai/titi/tabsData')
    let pagePath = 'page/product/ai/page-titi/template'
    await ctx.render(pagePath, {
      title: '蹄蹄智能办公',
      key: 'titi',
      navKey: 'product',
      hasBanner: true,
      bannerData: bannerData,
      advantageData: advantageData,
      coreData: coreData,
      applyData: applyData,
      historyData: historyData,
      caseData: caseData,
      tabsData: tabsData
    })
  },

  /**
   * 干预系统colgi
   * @returns {Promise<void>}
   */
  async colgi () {
    const { ctx } = app;
    const bannerData = require('../mock/product/ai/colgi/banner')
    const advantageData = require('../mock/product/ai/colgi/advantage')
    const coreData = require('../mock/product/ai/colgi/core')
    const applyData = require('../mock/product/ai/colgi/apply')
    const historyData = require('../mock/product/ai/colgi/history')
    const caseData = require('../mock/product/ai/colgi/case')
    const tabsData = require('../mock/product/ai/colgi/tabsData')
    let pagePath = 'page/product/ai/page-colgi/template'
    await ctx.render(pagePath, {
      title: '干预系统colgi',
      key: 'colgi',
      navKey: 'product',
      hasBanner: true,
      bannerData: bannerData,
      advantageData: advantageData,
      coreData: coreData,
      applyData: applyData,
      historyData: historyData,
      caseData: caseData,
      tabsData: tabsData
    })
  },

  /**
   * 细雨
   * @returns {Promise<void>}
   */
  async xiyu () {
    const { ctx } = app;
    const bannerData = require('../mock/product/ai/xiyu/banner')
    const advantageData = require('../mock/product/ai/xiyu/advantage')
    const coreData = require('../mock/product/ai/xiyu/core')
    const applyData = require('../mock/product/ai/xiyu/apply')
    const historyData = require('../mock/product/ai/xiyu/history')
    const caseData = require('../mock/product/ai/xiyu/case')
    const tabsData = require('../mock/product/ai/xiyu/tabsData')
    let pagePath = 'page/product/ai/page-xiyu/template'
    await ctx.render(pagePath, {
      title: '细雨',
      key: 'xiyu',
      navKey: 'product',
      hasBanner: true,
      bannerData: bannerData,
      advantageData: advantageData,
      coreData: coreData,
      applyData: applyData,
      historyData: historyData,
      caseData: caseData,
      tabsData: tabsData
    })
  },

  /**
   * 智能无人机
   * @returns {Promise<void>}
   */
  async uav () {
    const { ctx } = app;
    const bannerData = require('../mock/product/ai/uav/banner')
    const advantageData = require('../mock/product/ai/uav/advantage')
    const coreData = require('../mock/product/ai/uav/core')
    const applyData = require('../mock/product/ai/uav/apply')
    const historyData = require('../mock/product/ai/uav/history')
    const caseData = require('../mock/product/ai/uav/case')
    const tabsData = require('../mock/product/ai/uav/tabsData')
    let pagePath = 'page/product/ai/page-uav/template'
    await ctx.render(pagePath, {
      title: '智能无人机',
      key: 'uav',
      navKey: 'product',
      hasBanner: true,
      bannerData: bannerData,
      advantageData: advantageData,
      coreData: coreData,
      applyData: applyData,
      historyData: historyData,
      caseData: caseData,
      tabsData: tabsData
    })
  },

})
