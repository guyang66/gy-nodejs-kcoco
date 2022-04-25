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

  /**
   * 聚类算法
   * @returns {Promise<void>}
   */
  async cluster () {
    const { ctx } = app;
    const bannerData = require('../mock/product/dataserver/cluster/banner')
    const advantageData = require('../mock/product/dataserver/cluster/advantage')
    const coreData = require('../mock/product/dataserver/cluster/core')
    const applyData = require('../mock/product/dataserver/cluster/apply')
    const historyData = require('../mock/product/dataserver/cluster/history')
    const caseData = require('../mock/product/dataserver/cluster/case')
    const tabsData = require('../mock/product/dataserver/cluster/tabsData')
    let pagePath = 'page/product/dataserver/page-cluster/template'
    await ctx.render(pagePath, {
      title: '聚类算法',
      key: 'cluster',
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
   * 离线算法
   * @returns {Promise<void>}
   */
  async offlinealgorithm () {
    const { ctx } = app;
    const bannerData = require('../mock/product/dataserver/offline-algorithm/banner')
    const advantageData = require('../mock/product/dataserver/offline-algorithm/advantage')
    const coreData = require('../mock/product/dataserver/offline-algorithm/core')
    const applyData = require('../mock/product/dataserver/offline-algorithm/apply')
    const historyData = require('../mock/product/dataserver/offline-algorithm/history')
    const caseData = require('../mock/product/dataserver/offline-algorithm/case')
    const tabsData = require('../mock/product/dataserver/offline-algorithm/tabsData')
    let pagePath = 'page/product/dataserver/page-offline-algorithm/template'
    await ctx.render(pagePath, {
      title: '离线算法',
      key: 'offlinealgorithm',
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
   * 实时开发
   * @returns {Promise<void>}
   */
  async onlinedevelop () {
    const { ctx } = app;
    const bannerData = require('../mock/product/dataserver/online-develop/banner')
    const advantageData = require('../mock/product/dataserver/online-develop/advantage')
    const coreData = require('../mock/product/dataserver/online-develop/core')
    const applyData = require('../mock/product/dataserver/online-develop/apply')
    const historyData = require('../mock/product/dataserver/online-develop/history')
    const caseData = require('../mock/product/dataserver/online-develop/case')
    const tabsData = require('../mock/product/dataserver/online-develop/tabsData')
    let pagePath = 'page/product/dataserver/page-online-develop/template'
    await ctx.render(pagePath, {
      title: '实时开发',
      key: 'onlinedevelop',
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
   * 离线开发
   * @returns {Promise<void>}
   */
  async offlinedevelop () {
    const { ctx } = app;
    const bannerData = require('../mock/product/dataserver/offline-develop/banner')
    const advantageData = require('../mock/product/dataserver/offline-develop/advantage')
    const coreData = require('../mock/product/dataserver/offline-develop/core')
    const applyData = require('../mock/product/dataserver/offline-develop/apply')
    const historyData = require('../mock/product/dataserver/offline-develop/history')
    const caseData = require('../mock/product/dataserver/offline-develop/case')
    const tabsData = require('../mock/product/dataserver/offline-develop/tabsData')
    let pagePath = 'page/product/dataserver/page-offline-develop/template'
    await ctx.render(pagePath, {
      title: '离线开发',
      key: 'offlinedevelop',
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
   * 神经网络
   * @returns {Promise<void>}
   */
  async neuralnetwork () {
    const { ctx } = app;
    const bannerData = require('../mock/product/dataserver/neural-network/banner')
    const advantageData = require('../mock/product/dataserver/neural-network/advantage')
    const coreData = require('../mock/product/dataserver/neural-network/core')
    const applyData = require('../mock/product/dataserver/neural-network/apply')
    const historyData = require('../mock/product/dataserver/neural-network/history')
    const caseData = require('../mock/product/dataserver/neural-network/case')
    const tabsData = require('../mock/product/dataserver/neural-network/tabsData')
    let pagePath = 'page/product/dataserver/page-neural-network/template'
    await ctx.render(pagePath, {
      title: '神经网络',
      key: 'neuralnetwork',
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
   * 智能推荐系统
   * @returns {Promise<void>}
   */
  async recommend () {
    const { ctx } = app;
    const bannerData = require('../mock/product/dataserver/recommend/banner')
    const advantageData = require('../mock/product/dataserver/recommend/advantage')
    const coreData = require('../mock/product/dataserver/recommend/core')
    const applyData = require('../mock/product/dataserver/recommend/apply')
    const historyData = require('../mock/product/dataserver/recommend/history')
    const caseData = require('../mock/product/dataserver/recommend/case')
    const tabsData = require('../mock/product/dataserver/recommend/tabsData')
    let pagePath = 'page/product/dataserver/page-recommend/template'
    await ctx.render(pagePath, {
      title: '智能推荐系统',
      key: 'recommend',
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
   * 苹果
   * @returns {Promise<void>}
   */
  async apple () {
    const { ctx } = app;
    const bannerData = require('../mock/product/fruits/apple/banner')
    const advantageData = require('../mock/product/fruits/apple/advantage')
    const coreData = require('../mock/product/fruits/apple/core')
    const applyData = require('../mock/product/fruits/apple/apply')
    const historyData = require('../mock/product/fruits/apple/history')
    const caseData = require('../mock/product/fruits/apple/case')
    const tabsData = require('../mock/product/fruits/apple/tabsData')
    let pagePath = 'page/product/fruits/page-apple/template'
    await ctx.render(pagePath, {
      title: '苹果',
      key: 'apple',
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
   * 香蕉
   * @returns {Promise<void>}
   */
  async banana () {
    const { ctx } = app;
    const bannerData = require('../mock/product/fruits/banana/banner')
    const advantageData = require('../mock/product/fruits/banana/advantage')
    const coreData = require('../mock/product/fruits/banana/core')
    const applyData = require('../mock/product/fruits/banana/apply')
    const historyData = require('../mock/product/fruits/banana/history')
    const caseData = require('../mock/product/fruits/banana/case')
    const tabsData = require('../mock/product/fruits/banana/tabsData')
    let pagePath = 'page/product/fruits/page-banana/template'
    await ctx.render(pagePath, {
      title: '香蕉',
      key: 'banana',
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
   * 水蜜桃
   * @returns {Promise<void>}
   */
  async peach () {
    const { ctx } = app;
    const bannerData = require('../mock/product/fruits/peach/banner')
    const advantageData = require('../mock/product/fruits/peach/advantage')
    const coreData = require('../mock/product/fruits/peach/core')
    const applyData = require('../mock/product/fruits/peach/apply')
    const historyData = require('../mock/product/fruits/peach/history')
    const caseData = require('../mock/product/fruits/peach/case')
    const tabsData = require('../mock/product/fruits/peach/tabsData')
    let pagePath = 'page/product/fruits/page-peach/template'
    await ctx.render(pagePath, {
      title: '水蜜桃',
      key: 'peach',
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
   * 石榴
   * @returns {Promise<void>}
   */
  async pomegranate () {
    const { ctx } = app;
    const bannerData = require('../mock/product/fruits/pomegranate/banner')
    const advantageData = require('../mock/product/fruits/pomegranate/advantage')
    const coreData = require('../mock/product/fruits/pomegranate/core')
    const applyData = require('../mock/product/fruits/pomegranate/apply')
    const historyData = require('../mock/product/fruits/pomegranate/history')
    const caseData = require('../mock/product/fruits/pomegranate/case')
    const tabsData = require('../mock/product/fruits/pomegranate/tabsData')
    let pagePath = 'page/product/fruits/page-pomegranate/template'
    await ctx.render(pagePath, {
      title: '石榴',
      key: 'pomegranate',
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
   * 猕猴桃
   * @returns {Promise<void>}
   */
  async kiwi () {
    const { ctx } = app;
    const bannerData = require('../mock/product/fruits/kiwi/banner')
    const advantageData = require('../mock/product/fruits/kiwi/advantage')
    const coreData = require('../mock/product/fruits/kiwi/core')
    const applyData = require('../mock/product/fruits/kiwi/apply')
    const historyData = require('../mock/product/fruits/kiwi/history')
    const caseData = require('../mock/product/fruits/kiwi/case')
    const tabsData = require('../mock/product/fruits/kiwi/tabsData')
    let pagePath = 'page/product/fruits/page-kiwi/template'
    await ctx.render(pagePath, {
      title: '猕猴桃',
      key: 'kiwi',
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
   * 牛油果
   * @returns {Promise<void>}
   */
  async avocado () {
    const { ctx } = app;
    const bannerData = require('../mock/product/fruits/avocado/banner')
    const advantageData = require('../mock/product/fruits/avocado/advantage')
    const coreData = require('../mock/product/fruits/avocado/core')
    const applyData = require('../mock/product/fruits/avocado/apply')
    const historyData = require('../mock/product/fruits/avocado/history')
    const caseData = require('../mock/product/fruits/avocado/case')
    const tabsData = require('../mock/product/fruits/avocado/tabsData')
    let pagePath = 'page/product/fruits/page-avocado/template'
    await ctx.render(pagePath, {
      title: '牛油果',
      key: 'avocado',
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
   * 芒果
   * @returns {Promise<void>}
   */
  async mongo () {
    const { ctx } = app;
    const bannerData = require('../mock/product/fruits/mongo/banner')
    const advantageData = require('../mock/product/fruits/mongo/advantage')
    const coreData = require('../mock/product/fruits/mongo/core')
    const applyData = require('../mock/product/fruits/mongo/apply')
    const historyData = require('../mock/product/fruits/mongo/history')
    const caseData = require('../mock/product/fruits/mongo/case')
    const tabsData = require('../mock/product/fruits/mongo/tabsData')
    let pagePath = 'page/product/fruits/page-mongo/template'
    await ctx.render(pagePath, {
      title: '芒果',
      key: 'mongo',
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
   * 山竹
   * @returns {Promise<void>}
   */
  async mangosteen () {
    const { ctx } = app;
    const bannerData = require('../mock/product/fruits/mangosteen/banner')
    const advantageData = require('../mock/product/fruits/mangosteen/advantage')
    const coreData = require('../mock/product/fruits/mangosteen/core')
    const applyData = require('../mock/product/fruits/mangosteen/apply')
    const historyData = require('../mock/product/fruits/mangosteen/history')
    const caseData = require('../mock/product/fruits/mangosteen/case')
    const tabsData = require('../mock/product/fruits/mangosteen/tabsData')
    let pagePath = 'page/product/fruits/page-mangosteen/template'
    await ctx.render(pagePath, {
      title: '山竹',
      key: 'mangosteen',
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
   * 葡萄
   * @returns {Promise<void>}
   */
  async grape () {
    const { ctx } = app;
    const bannerData = require('../mock/product/fruits/grape/banner')
    const advantageData = require('../mock/product/fruits/grape/advantage')
    const coreData = require('../mock/product/fruits/grape/core')
    const applyData = require('../mock/product/fruits/grape/apply')
    const historyData = require('../mock/product/fruits/grape/history')
    const caseData = require('../mock/product/fruits/grape/case')
    const tabsData = require('../mock/product/fruits/grape/tabsData')
    let pagePath = 'page/product/fruits/page-grape/template'
    await ctx.render(pagePath, {
      title: '葡萄',
      key: 'grape',
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
   * 柠檬
   * @returns {Promise<void>}
   */
  async lemon () {
    const { ctx } = app;
    const bannerData = require('../mock/product/fruits/lemon/banner')
    const advantageData = require('../mock/product/fruits/lemon/advantage')
    const coreData = require('../mock/product/fruits/lemon/core')
    const applyData = require('../mock/product/fruits/lemon/apply')
    const historyData = require('../mock/product/fruits/lemon/history')
    const caseData = require('../mock/product/fruits/lemon/case')
    const tabsData = require('../mock/product/fruits/lemon/tabsData')
    let pagePath = 'page/product/fruits/page-lemon/template'
    await ctx.render(pagePath, {
      title: '柠檬',
      key: 'lemon',
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
   * 荔枝
   * @returns {Promise<void>}
   */
  async litchi () {
    const { ctx } = app;
    const bannerData = require('../mock/product/fruits/litchi/banner')
    const advantageData = require('../mock/product/fruits/litchi/advantage')
    const coreData = require('../mock/product/fruits/litchi/core')
    const applyData = require('../mock/product/fruits/litchi/apply')
    const historyData = require('../mock/product/fruits/litchi/history')
    const caseData = require('../mock/product/fruits/litchi/case')
    const tabsData = require('../mock/product/fruits/litchi/tabsData')
    let pagePath = 'page/product/fruits/page-litchi/template'
    await ctx.render(pagePath, {
      title: '荔枝',
      key: 'litchi',
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
   * 火龙果
   * @returns {Promise<void>}
   */
  async piyata () {
    const { ctx } = app;
    const bannerData = require('../mock/product/fruits/piyata/banner')
    const advantageData = require('../mock/product/fruits/piyata/advantage')
    const coreData = require('../mock/product/fruits/piyata/core')
    const applyData = require('../mock/product/fruits/piyata/apply')
    const historyData = require('../mock/product/fruits/piyata/history')
    const caseData = require('../mock/product/fruits/piyata/case')
    const tabsData = require('../mock/product/fruits/piyata/tabsData')
    let pagePath = 'page/product/fruits/page-piyata/template'
    await ctx.render(pagePath, {
      title: '火龙果',
      key: 'piyata',
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
   * 羊角蜜
   * @returns {Promise<void>}
   */
  async croissant () {
    const { ctx } = app;
    const bannerData = require('../mock/product/fruits/croissant/banner')
    const advantageData = require('../mock/product/fruits/croissant/advantage')
    const coreData = require('../mock/product/fruits/croissant/core')
    const applyData = require('../mock/product/fruits/croissant/apply')
    const historyData = require('../mock/product/fruits/croissant/history')
    const caseData = require('../mock/product/fruits/croissant/case')
    const tabsData = require('../mock/product/fruits/croissant/tabsData')
    let pagePath = 'page/product/fruits/page-croissant/template'
    await ctx.render(pagePath, {
      title: '羊角蜜',
      key: 'croissant',
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
   * 哈密瓜
   * @returns {Promise<void>}
   */
  async hami () {
    const { ctx } = app;
    const bannerData = require('../mock/product/fruits/hami/banner')
    const advantageData = require('../mock/product/fruits/hami/advantage')
    const coreData = require('../mock/product/fruits/hami/core')
    const applyData = require('../mock/product/fruits/hami/apply')
    const historyData = require('../mock/product/fruits/hami/history')
    const caseData = require('../mock/product/fruits/hami/case')
    const tabsData = require('../mock/product/fruits/hami/tabsData')
    let pagePath = 'page/product/fruits/page-hami/template'
    await ctx.render(pagePath, {
      title: '哈密瓜',
      key: 'hami',
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
   * 无花果
   * @returns {Promise<void>}
   */
  async fig () {
    const { ctx } = app;
    const bannerData = require('../mock/product/fruits/fig/banner')
    const advantageData = require('../mock/product/fruits/fig/advantage')
    const coreData = require('../mock/product/fruits/fig/core')
    const applyData = require('../mock/product/fruits/fig/apply')
    const historyData = require('../mock/product/fruits/fig/history')
    const caseData = require('../mock/product/fruits/fig/case')
    const tabsData = require('../mock/product/fruits/fig/tabsData')
    let pagePath = 'page/product/fruits/page-fig/template'
    await ctx.render(pagePath, {
      title: '无花果',
      key: 'fig',
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
   * 青枣
   * @returns {Promise<void>}
   */
  async jujube () {
    const { ctx } = app;
    const bannerData = require('../mock/product/fruits/jujube/banner')
    const advantageData = require('../mock/product/fruits/jujube/advantage')
    const coreData = require('../mock/product/fruits/jujube/core')
    const applyData = require('../mock/product/fruits/jujube/apply')
    const historyData = require('../mock/product/fruits/jujube/history')
    const caseData = require('../mock/product/fruits/jujube/case')
    const tabsData = require('../mock/product/fruits/jujube/tabsData')
    let pagePath = 'page/product/fruits/page-jujube/template'
    await ctx.render(pagePath, {
      title: '青枣',
      key: 'jujube',
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
   * 柚子
   * @returns {Promise<void>}
   */
  async shaddock () {
    const { ctx } = app;
    const bannerData = require('../mock/product/fruits/shaddock/banner')
    const advantageData = require('../mock/product/fruits/shaddock/advantage')
    const coreData = require('../mock/product/fruits/shaddock/core')
    const applyData = require('../mock/product/fruits/shaddock/apply')
    const historyData = require('../mock/product/fruits/shaddock/history')
    const caseData = require('../mock/product/fruits/shaddock/case')
    const tabsData = require('../mock/product/fruits/shaddock/tabsData')
    let pagePath = 'page/product/fruits/page-shaddock/template'
    await ctx.render(pagePath, {
      title: '柚子',
      key: 'shaddock',
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
   * 枇杷
   * @returns {Promise<void>}
   */
  async loquat () {
    const { ctx } = app;
    const bannerData = require('../mock/product/fruits/loquat/banner')
    const advantageData = require('../mock/product/fruits/loquat/advantage')
    const coreData = require('../mock/product/fruits/loquat/core')
    const applyData = require('../mock/product/fruits/loquat/apply')
    const historyData = require('../mock/product/fruits/loquat/history')
    const caseData = require('../mock/product/fruits/loquat/case')
    const tabsData = require('../mock/product/fruits/loquat/tabsData')
    let pagePath = 'page/product/fruits/page-loquat/template'
    await ctx.render(pagePath, {
      title: '枇杷',
      key: 'loquat',
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
   * 李子
   * @returns {Promise<void>}
   */
  async plum () {
    const { ctx } = app;
    const bannerData = require('../mock/product/fruits/plum/banner')
    const advantageData = require('../mock/product/fruits/plum/advantage')
    const coreData = require('../mock/product/fruits/plum/core')
    const applyData = require('../mock/product/fruits/plum/apply')
    const historyData = require('../mock/product/fruits/plum/history')
    const caseData = require('../mock/product/fruits/plum/case')
    const tabsData = require('../mock/product/fruits/plum/tabsData')
    let pagePath = 'page/product/fruits/page-plum/template'
    await ctx.render(pagePath, {
      title: '李子',
      key: 'plum',
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
   * 橘子
   * @returns {Promise<void>}
   */
  async orange () {
    const { ctx } = app;
    const bannerData = require('../mock/product/fruits/orange/banner')
    const advantageData = require('../mock/product/fruits/orange/advantage')
    const coreData = require('../mock/product/fruits/orange/core')
    const applyData = require('../mock/product/fruits/orange/apply')
    const historyData = require('../mock/product/fruits/orange/history')
    const caseData = require('../mock/product/fruits/orange/case')
    const tabsData = require('../mock/product/fruits/orange/tabsData')
    let pagePath = 'page/product/fruits/page-orange/template'
    await ctx.render(pagePath, {
      title: '橘子',
      key: 'orange',
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
   * 樱桃
   * @returns {Promise<void>}
   */
  async cherry () {
    const { ctx } = app;
    const bannerData = require('../mock/product/fruits/cherry/banner')
    const advantageData = require('../mock/product/fruits/cherry/advantage')
    const coreData = require('../mock/product/fruits/cherry/core')
    const applyData = require('../mock/product/fruits/cherry/apply')
    const historyData = require('../mock/product/fruits/cherry/history')
    const caseData = require('../mock/product/fruits/cherry/case')
    const tabsData = require('../mock/product/fruits/cherry/tabsData')
    let pagePath = 'page/product/fruits/page-cherry/template'
    await ctx.render(pagePath, {
      title: '樱桃',
      key: 'cherry',
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
   * 柿子
   * @returns {Promise<void>}
   */
  async persimmon () {
    const { ctx } = app;
    const bannerData = require('../mock/product/fruits/persimmon/banner')
    const advantageData = require('../mock/product/fruits/persimmon/advantage')
    const coreData = require('../mock/product/fruits/persimmon/core')
    const applyData = require('../mock/product/fruits/persimmon/apply')
    const historyData = require('../mock/product/fruits/persimmon/history')
    const caseData = require('../mock/product/fruits/persimmon/case')
    const tabsData = require('../mock/product/fruits/persimmon/tabsData')
    let pagePath = 'page/product/fruits/page-persimmon/template'
    await ctx.render(pagePath, {
      title: '柿子',
      key: 'persimmon',
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
   * 红萝卜
   * @returns {Promise<void>}
   */
  async radish () {
    const { ctx } = app;
    const bannerData = require('../mock/product/vegetables/radish/banner')
    const advantageData = require('../mock/product/vegetables/radish/advantage')
    const coreData = require('../mock/product/vegetables/radish/core')
    const applyData = require('../mock/product/vegetables/radish/apply')
    const historyData = require('../mock/product/vegetables/radish/history')
    const caseData = require('../mock/product/vegetables/radish/case')
    const tabsData = require('../mock/product/vegetables/radish/tabsData')
    let pagePath = 'page/product/vegetables/page-radish/template'
    await ctx.render(pagePath, {
      title: '红萝卜',
      key: 'radish',
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
   * 大葱
   * @returns {Promise<void>}
   */
  async onion () {
    const { ctx } = app;
    const bannerData = require('../mock/product/vegetables/onion/banner')
    const advantageData = require('../mock/product/vegetables/onion/advantage')
    const coreData = require('../mock/product/vegetables/onion/core')
    const applyData = require('../mock/product/vegetables/onion/apply')
    const historyData = require('../mock/product/vegetables/onion/history')
    const caseData = require('../mock/product/vegetables/onion/case')
    const tabsData = require('../mock/product/vegetables/onion/tabsData')
    let pagePath = 'page/product/vegetables/page-onion/template'
    await ctx.render(pagePath, {
      title: '大葱',
      key: 'onion',
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
   * 黄瓜
   * @returns {Promise<void>}
   */
  async cucumber () {
    const { ctx } = app;
    const bannerData = require('../mock/product/vegetables/cucumber/banner')
    const advantageData = require('../mock/product/vegetables/cucumber/advantage')
    const coreData = require('../mock/product/vegetables/cucumber/core')
    const applyData = require('../mock/product/vegetables/cucumber/apply')
    const historyData = require('../mock/product/vegetables/cucumber/history')
    const caseData = require('../mock/product/vegetables/cucumber/case')
    const tabsData = require('../mock/product/vegetables/cucumber/tabsData')
    let pagePath = 'page/product/vegetables/page-cucumber/template'
    await ctx.render(pagePath, {
      title: '黄瓜',
      key: 'cucumber',
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
   * 菜苔
   * @returns {Promise<void>}
   */
  async bolt () {
    const { ctx } = app;
    const bannerData = require('../mock/product/vegetables/bolt/banner')
    const advantageData = require('../mock/product/vegetables/bolt/advantage')
    const coreData = require('../mock/product/vegetables/bolt/core')
    const applyData = require('../mock/product/vegetables/bolt/apply')
    const historyData = require('../mock/product/vegetables/bolt/history')
    const caseData = require('../mock/product/vegetables/bolt/case')
    const tabsData = require('../mock/product/vegetables/bolt/tabsData')
    let pagePath = 'page/product/vegetables/page-bolt/template'
    await ctx.render(pagePath, {
      title: '菜苔',
      key: 'bolt',
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
   * 苋菜
   * @returns {Promise<void>}
   */
  async amaranthus () {
    const { ctx } = app;
    const bannerData = require('../mock/product/vegetables/amaranthus/banner')
    const advantageData = require('../mock/product/vegetables/amaranthus/advantage')
    const coreData = require('../mock/product/vegetables/amaranthus/core')
    const applyData = require('../mock/product/vegetables/amaranthus/apply')
    const historyData = require('../mock/product/vegetables/amaranthus/history')
    const caseData = require('../mock/product/vegetables/amaranthus/case')
    const tabsData = require('../mock/product/vegetables/amaranthus/tabsData')
    let pagePath = 'page/product/vegetables/page-amaranthus/template'
    await ctx.render(pagePath, {
      title: '苋菜',
      key: 'amaranthus',
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
   * 藕
   * @returns {Promise<void>}
   */
  async lotus () {
    const { ctx } = app;
    const bannerData = require('../mock/product/vegetables/lotus/banner')
    const advantageData = require('../mock/product/vegetables/lotus/advantage')
    const coreData = require('../mock/product/vegetables/lotus/core')
    const applyData = require('../mock/product/vegetables/lotus/apply')
    const historyData = require('../mock/product/vegetables/lotus/history')
    const caseData = require('../mock/product/vegetables/lotus/case')
    const tabsData = require('../mock/product/vegetables/lotus/tabsData')
    let pagePath = 'page/product/vegetables/page-lotus/template'
    await ctx.render(pagePath, {
      title: '藕',
      key: 'lotus',
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
   * 香菇
   * @returns {Promise<void>}
   */
  async mushroom () {
    const { ctx } = app;
    const bannerData = require('../mock/product/vegetables/mushroom/banner')
    const advantageData = require('../mock/product/vegetables/mushroom/advantage')
    const coreData = require('../mock/product/vegetables/mushroom/core')
    const applyData = require('../mock/product/vegetables/mushroom/apply')
    const historyData = require('../mock/product/vegetables/mushroom/history')
    const caseData = require('../mock/product/vegetables/mushroom/case')
    const tabsData = require('../mock/product/vegetables/mushroom/tabsData')
    let pagePath = 'page/product/vegetables/page-mushroom/template'
    await ctx.render(pagePath, {
      title: '香菇',
      key: 'mushroom',
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
   * 白菜
   * @returns {Promise<void>}
   */
  async cabbage () {
    const { ctx } = app;
    const bannerData = require('../mock/product/vegetables/cabbage/banner')
    const advantageData = require('../mock/product/vegetables/cabbage/advantage')
    const coreData = require('../mock/product/vegetables/cabbage/core')
    const applyData = require('../mock/product/vegetables/cabbage/apply')
    const historyData = require('../mock/product/vegetables/cabbage/history')
    const caseData = require('../mock/product/vegetables/cabbage/case')
    const tabsData = require('../mock/product/vegetables/cabbage/tabsData')
    let pagePath = 'page/product/vegetables/page-cabbage/template'
    await ctx.render(pagePath, {
      title: '白菜',
      key: 'cabbage',
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
   * 豌豆
   * @returns {Promise<void>}
   */
  async peas () {
    const { ctx } = app;
    const bannerData = require('../mock/product/vegetables/peas/banner')
    const advantageData = require('../mock/product/vegetables/peas/advantage')
    const coreData = require('../mock/product/vegetables/peas/core')
    const applyData = require('../mock/product/vegetables/peas/apply')
    const historyData = require('../mock/product/vegetables/peas/history')
    const caseData = require('../mock/product/vegetables/peas/case')
    const tabsData = require('../mock/product/vegetables/peas/tabsData')
    let pagePath = 'page/product/vegetables/page-peas/template'
    await ctx.render(pagePath, {
      title: '豌豆',
      key: 'peas',
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
   * 苦瓜
   * @returns {Promise<void>}
   */
  async bilter () {
    const { ctx } = app;
    const bannerData = require('../mock/product/vegetables/bilter/banner')
    const advantageData = require('../mock/product/vegetables/bilter/advantage')
    const coreData = require('../mock/product/vegetables/bilter/core')
    const applyData = require('../mock/product/vegetables/bilter/apply')
    const historyData = require('../mock/product/vegetables/bilter/history')
    const caseData = require('../mock/product/vegetables/bilter/case')
    const tabsData = require('../mock/product/vegetables/bilter/tabsData')
    let pagePath = 'page/product/vegetables/page-bilter/template'
    await ctx.render(pagePath, {
      title: '苦瓜',
      key: 'bilter',
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
   * 芹菜
   * @returns {Promise<void>}
   */
  async celery () {
    const { ctx } = app;
    const bannerData = require('../mock/product/vegetables/celery/banner')
    const advantageData = require('../mock/product/vegetables/celery/advantage')
    const coreData = require('../mock/product/vegetables/celery/core')
    const applyData = require('../mock/product/vegetables/celery/apply')
    const historyData = require('../mock/product/vegetables/celery/history')
    const caseData = require('../mock/product/vegetables/celery/case')
    const tabsData = require('../mock/product/vegetables/celery/tabsData')
    let pagePath = 'page/product/vegetables/page-celery/template'
    await ctx.render(pagePath, {
      title: '芹菜',
      key: 'celery',
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
   * 生姜
   * @returns {Promise<void>}
   */
  async ginger () {
    const { ctx } = app;
    const bannerData = require('../mock/product/vegetables/ginger/banner')
    const advantageData = require('../mock/product/vegetables/ginger/advantage')
    const coreData = require('../mock/product/vegetables/ginger/core')
    const applyData = require('../mock/product/vegetables/ginger/apply')
    const historyData = require('../mock/product/vegetables/ginger/history')
    const caseData = require('../mock/product/vegetables/ginger/case')
    const tabsData = require('../mock/product/vegetables/ginger/tabsData')
    let pagePath = 'page/product/vegetables/page-ginger/template'
    await ctx.render(pagePath, {
      title: '生姜',
      key: 'ginger',
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
   * 茄子
   * @returns {Promise<void>}
   */
  async eggplant () {
    const { ctx } = app;
    const bannerData = require('../mock/product/vegetables/eggplant/banner')
    const advantageData = require('../mock/product/vegetables/eggplant/advantage')
    const coreData = require('../mock/product/vegetables/eggplant/core')
    const applyData = require('../mock/product/vegetables/eggplant/apply')
    const historyData = require('../mock/product/vegetables/eggplant/history')
    const caseData = require('../mock/product/vegetables/eggplant/case')
    const tabsData = require('../mock/product/vegetables/eggplant/tabsData')
    let pagePath = 'page/product/vegetables/page-eggplant/template'
    await ctx.render(pagePath, {
      title: '茄子',
      key: 'eggplant',
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
   * 辣椒
   * @returns {Promise<void>}
   */
  async chili () {
    const { ctx } = app;
    const bannerData = require('../mock/product/vegetables/chili/banner')
    const advantageData = require('../mock/product/vegetables/chili/advantage')
    const coreData = require('../mock/product/vegetables/chili/core')
    const applyData = require('../mock/product/vegetables/chili/apply')
    const historyData = require('../mock/product/vegetables/chili/history')
    const caseData = require('../mock/product/vegetables/chili/case')
    const tabsData = require('../mock/product/vegetables/chili/tabsData')
    let pagePath = 'page/product/vegetables/page-chili/template'
    await ctx.render(pagePath, {
      title: '辣椒',
      key: 'chili',
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
   * 南瓜
   * @returns {Promise<void>}
   */
  async pumpkin () {
    const { ctx } = app;
    const bannerData = require('../mock/product/vegetables/pumpkin/banner')
    const advantageData = require('../mock/product/vegetables/pumpkin/advantage')
    const coreData = require('../mock/product/vegetables/pumpkin/core')
    const applyData = require('../mock/product/vegetables/pumpkin/apply')
    const historyData = require('../mock/product/vegetables/pumpkin/history')
    const caseData = require('../mock/product/vegetables/pumpkin/case')
    const tabsData = require('../mock/product/vegetables/pumpkin/tabsData')
    let pagePath = 'page/product/vegetables/page-pumpkin/template'
    await ctx.render(pagePath, {
      title: '南瓜',
      key: 'pumpkin',
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
