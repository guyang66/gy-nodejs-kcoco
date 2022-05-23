module.exports = app => ({

  /**
   * 首页
   * @returns {Promise<void>}
   */
  async index() {
    const { ctx, $helper, $service, $config, $model } = app;
    const { commonConfig } = $model
    const productData = require('../mock/index/product')
    const logoData = require('../mock/index/logo')
    const staticsData = require('../mock/index/statics')
    const customerData = require('../mock/index/customer')
    const solutionData = require('../mock/index/solution')
    const certifyData = require('../mock/index/certify')
    const resourceData = require('../mock/index/resource')
    const pageTdk = $helper.getTdkByPath('/index')

    let bannerData
    let columnData
    let newsData
    if($config.dataMock){
      /** 数据走mock **/
      bannerData = require('../mock/index/banner')
      newsData = require('../mock/index/news')
      columnData = require('../mock/index/column')
    } else {
      /** 数据走数据库 **/
      // todo: 用json string， 方便扩展
      let indexBannerConfig = await $service.baseService.queryOne(commonConfig, {key: 'page_index_banners'})
      bannerData = JSON.parse(indexBannerConfig.v2)

      let indexNewsConfig = await $service.baseService.queryOne(commonConfig, {key: 'page_index_news'})

      let newsModuleInfo = JSON.parse(indexNewsConfig.v1)
      let newsDataContent = JSON.parse(indexNewsConfig.v2)
      // 新闻不允许上下线、新增删除，所以不需要过滤status = 1的数据
      newsDataContent = newsDataContent.sort((v1,v2)=>{
        if(v1.order < v2.order ){
          return 1
        } else {
          return -1
        }
      })
      newsData = {
        title: newsModuleInfo.title || null,
        desc: newsModuleInfo.desc || null,
        content: newsDataContent
      }

      let indexColumnConfig = await $service.baseService.queryOne(commonConfig, {key: 'page_index_columns'})
      columnData = JSON.parse(indexColumnConfig.v2)

      // 排序，让管理后台可以控制banner排序和banner上下线
      bannerData = bannerData.sort((v1,v2)=>{
        if(v1.order < v2.order ){
          return 1
        } else {
          return -1
        }
      })
      // 去掉已经下线的
      bannerData = bannerData.filter(item=>{
        return item.status === 1 || item.status === '1'
      })

      columnData = columnData.sort((v1,v2)=>{
        if(v1.order < v2.order ){
          return 1
        } else {
          return -1
        }
      })

    }

    let bannerThemes = []
    bannerData.forEach(item=>{
      bannerThemes.push(item.type || 'default')
    })

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
      newsData: newsData,
      pageTdk: pageTdk,

      bannerThemes: bannerThemes,
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

  /**
   * 客户案例
   * @returns {Promise<void>}
   */
  async caseList () {
    const { ctx, $config, $service, $model } = app;
    const { pageCase, pageCommonTag } = $model
    const bannerData = require('../mock/case/banner')
    let tagData
    let casesData

    if($config.dataMock){
      tagData = require('../mock/case/tag')
      casesData = require('../mock/case/cases')
      tagData = tagData.slice(0,4)
    } else {
      casesData = await $service.baseService.query(pageCase, {status: 1},{},{sort: {order: -1, id: -1}})
      // 最多显示4个关键词
      tagData = await $service.baseService.query(pageCommonTag, { mainKey: 'case_search_tag', status: 1}, {key: "$secKey", name: 1},{sort: {order: -1, id: -1}, limit: 4})
    }
    let pagePath = 'page/case/page-case-main/template'
    await ctx.render(pagePath, {
      title: '客户案例',
      key: 'case',
      navKey: 'cases',
      hasBanner: true,
      bannerData: bannerData,
      tagData: tagData,
      casesData: casesData,
      tabsData: []
    })
  },

  /**
   * 案例详情
   * @returns {Promise<void>}
   */
  async caseDetail () {
    const { ctx } = app;
    const detailData = require('../mock/case/example')
    const recommendData = require('../mock/case/recommend')
    let pagePath = 'page/case/page-case-detail/template'
    await ctx.render(pagePath, {
      title: '案例详情',
      key: 'case-detail',
      navKey: 'cases',
      hasBanner: false,
      bannerData: {},
      detailData: detailData,
      recommendData: recommendData,
      tabsData: []
    })
  },

  /**
   * 活动列表
   * @returns {Promise<void>}
   */
  async activityList () {
    const { ctx, $service, $config, $model } = app;
    const { pageActivity, pageHotActivity, pageProductActivity, pageBrandActivity } = $model;
    const bannerData = require('../mock/activity/banner')
    const tabsData = require('../mock/activity/tabsData')
    let productData
    let brandData
    let hotData
    let pagePath = 'page/activity/page-activity-main/template'

    let activity = await $service.baseService.query(pageActivity)
    let activityMap = {}
    activity.forEach(item=>{
      activityMap[item.key] = item
    })
    if($config.dataMock){
      // 如果不走数据库
      hotData = require('../mock/activity/hot')
      productData = require('../mock/activity/product')
      brandData = require('../mock/activity/brand')
    } else {
      // 查找上线（statues=1）
      let hotActivityList = await $service.baseService.query(
        pageHotActivity,
        {status: 1},
        {},
        {
          sort: {order: -1, _id: -1}
        })
      let productActivityList = await $service.baseService.query(
        pageProductActivity,
        {status: 1},
        {},
        {sort: { type: 1, order: -1, _id: -1}
        })
      let brandActivityList = await $service.baseService.query(
        pageBrandActivity,
        {status: 1},
        {},
        {
          sort: { order: -1, _id: -1}
        })

      // 这里可以降级处理，避免服务端发布，sql还未执行。
      // if(!activity || activity.length < 1){
      //   hotData = require('../mock/activity/hot')
      // }
      //
      hotData = {
        title: activityMap['hot'].title,
        desc: activityMap['hot'].desc,
        key: activityMap['hot'].key,
        content: hotActivityList
      }
      productData = {
        title: activityMap['product'].title,
        desc: activityMap['product'].desc,
        key: activityMap['product'].key,
        content: productActivityList
      }
      brandData = {
        title: activityMap['brand'].title,
        desc: activityMap['brand'].desc,
        key: activityMap['brand'].key,
        content: brandActivityList
      }
    }

    await ctx.render(pagePath, {
      title: '活动列表',
      key: 'activity',
      navKey: 'activity',
      hasBanner: true,
      bannerData: bannerData,
      productData: productData,
      brandData: brandData,
      hotData: hotData,
      tabsData: tabsData,
    })
  },

  /**
   * 活动详情
   * @returns {Promise<void>}
   */
  async activityDetail () {
    const { ctx } = app;
    const detailData = require('../mock/activity/example')
    let pagePath = 'page/activity/page-activity-detail/template'
    await ctx.render(pagePath, {
      title: '活动详情',
      key: 'activity-detail',
      navKey: 'activity',
      hasBanner: false,
      bannerData: {},
      detailData: detailData,
      tabsData: []
    })
  },

  /**
   * 教育行业解决方案
   * @returns {Promise<void>}
   */
  async education () {
    const { ctx } = app;
    const bannerData = require('../mock/solution/education/banner')
    const painData = require('../mock/solution/education/pain')
    const advantageData = require('../mock/solution/education/advantage')
    const frameworkData = require('../mock/solution/education/framework')
    const applyData = require('../mock/solution/education/value')
    const caseData = require('../mock/solution/education/case')
    const recommendData = require('../mock/solution/education/recommend')
    const tabsData = require('../mock/solution/education/tabsData')

    let pagePath = 'page/solution/page-education/template'
    await ctx.render(pagePath, {
      title: '教育行业解决方案',
      key: 'education',
      navKey: 'solution',
      hasBanner: true,
      bannerData: bannerData,
      painData: painData,
      advantageData: advantageData,
      frameworkData: frameworkData,
      applyData: applyData,
      caseData: caseData,
      recommendData: recommendData,
      tabsData: tabsData
    })
  },

  /**
   * 大数据行业解决方案
   * @returns {Promise<void>}
   */
  async bigdata () {
    const { ctx } = app;
    const bannerData = require('../mock/solution/bigdata/banner')
    const painData = require('../mock/solution/bigdata/pain')
    const advantageData = require('../mock/solution/bigdata/advantage')
    const frameworkData = require('../mock/solution/bigdata/framework')
    const applyData = require('../mock/solution/bigdata/value')
    const caseData = require('../mock/solution/bigdata/case')
    const recommendData = require('../mock/solution/bigdata/recommend')
    const tabsData = require('../mock/solution/bigdata/tabsData')

    let pagePath = 'page/solution/page-bigdata/template'
    await ctx.render(pagePath, {
      title: '大数据行业解决方案',
      key: 'bigdata',
      navKey: 'solution',
      hasBanner: true,
      bannerData: bannerData,
      painData: painData,
      advantageData: advantageData,
      frameworkData: frameworkData,
      applyData: applyData,
      caseData: caseData,
      recommendData: recommendData,
      tabsData: tabsData
    })
  },

  /**
   * 金融行业解决方案
   * @returns {Promise<void>}
   */
  async finance () {
    const { ctx } = app;
    const bannerData = require('../mock/solution/finance/banner')
    const painData = require('../mock/solution/finance/pain')
    const advantageData = require('../mock/solution/finance/advantage')
    const frameworkData = require('../mock/solution/finance/framework')
    const applyData = require('../mock/solution/finance/value')
    const caseData = require('../mock/solution/finance/case')
    const recommendData = require('../mock/solution/finance/recommend')
    const tabsData = require('../mock/solution/finance/tabsData')

    let pagePath = 'page/solution/page-finance/template'
    await ctx.render(pagePath, {
      title: '金融行业解决方案',
      key: 'finance',
      navKey: 'solution',
      hasBanner: true,
      bannerData: bannerData,
      painData: painData,
      advantageData: advantageData,
      frameworkData: frameworkData,
      applyData: applyData,
      caseData: caseData,
      recommendData: recommendData,
      tabsData: tabsData
    })
  },

  /**
   * 餐饮行业解决方案
   * @returns {Promise<void>}
   */
  async food () {
    const { ctx } = app;
    const bannerData = require('../mock/solution/food/banner')
    const painData = require('../mock/solution/food/pain')
    const advantageData = require('../mock/solution/food/advantage')
    const frameworkData = require('../mock/solution/food/framework')
    const applyData = require('../mock/solution/food/value')
    const caseData = require('../mock/solution/food/case')
    const recommendData = require('../mock/solution/food/recommend')
    const tabsData = require('../mock/solution/food/tabsData')

    let pagePath = 'page/solution/page-food/template'
    await ctx.render(pagePath, {
      title: '餐饮行业解决方案',
      key: 'food',
      navKey: 'solution',
      hasBanner: true,
      bannerData: bannerData,
      painData: painData,
      advantageData: advantageData,
      frameworkData: frameworkData,
      applyData: applyData,
      caseData: caseData,
      recommendData: recommendData,
      tabsData: tabsData
    })
  },

  /**
   * 游戏行业解决方案
   * @returns {Promise<void>}
   */
  async game () {
    const { ctx } = app;
    const bannerData = require('../mock/solution/game/banner')
    const painData = require('../mock/solution/game/pain')
    const advantageData = require('../mock/solution/game/advantage')
    const frameworkData = require('../mock/solution/game/framework')
    const applyData = require('../mock/solution/game/value')
    const caseData = require('../mock/solution/game/case')
    const recommendData = require('../mock/solution/game/recommend')
    const tabsData = require('../mock/solution/game/tabsData')

    let pagePath = 'page/solution/page-game/template'
    await ctx.render(pagePath, {
      title: '游戏行业解决方案',
      key: 'game',
      navKey: 'solution',
      hasBanner: true,
      bannerData: bannerData,
      painData: painData,
      advantageData: advantageData,
      frameworkData: frameworkData,
      applyData: applyData,
      caseData: caseData,
      recommendData: recommendData,
      tabsData: tabsData
    })
  },

  /**
   * 传统制造行业
   * @returns {Promise<void>}
   */
  async manufacture () {
    const { ctx } = app;
    const bannerData = require('../mock/solution/manufacture/banner')
    const painData = require('../mock/solution/manufacture/pain')
    const advantageData = require('../mock/solution/manufacture/advantage')
    const frameworkData = require('../mock/solution/manufacture/framework')
    const applyData = require('../mock/solution/manufacture/value')
    const caseData = require('../mock/solution/manufacture/case')
    const recommendData = require('../mock/solution/manufacture/recommend')
    const tabsData = require('../mock/solution/manufacture/tabsData')

    let pagePath = 'page/solution/page-manufacture/template'
    await ctx.render(pagePath, {
      title: '传统制造行业',
      key: 'manufacture',
      navKey: 'solution',
      hasBanner: true,
      bannerData: bannerData,
      painData: painData,
      advantageData: advantageData,
      frameworkData: frameworkData,
      applyData: applyData,
      caseData: caseData,
      recommendData: recommendData,
      tabsData: tabsData
    })
  },

  /**
   * 电商行业解决方案
   * @returns {Promise<void>}
   */
  async online () {
    const { ctx } = app;
    const bannerData = require('../mock/solution/online/banner')
    const painData = require('../mock/solution/online/pain')
    const advantageData = require('../mock/solution/online/advantage')
    const frameworkData = require('../mock/solution/online/framework')
    const applyData = require('../mock/solution/online/value')
    const caseData = require('../mock/solution/online/case')
    const recommendData = require('../mock/solution/online/recommend')
    const tabsData = require('../mock/solution/online/tabsData')

    let pagePath = 'page/solution/page-online/template'
    await ctx.render(pagePath, {
      title: '电商行业解决方案',
      key: 'online',
      navKey: 'solution',
      hasBanner: true,
      bannerData: bannerData,
      painData: painData,
      advantageData: advantageData,
      frameworkData: frameworkData,
      applyData: applyData,
      caseData: caseData,
      recommendData: recommendData,
      tabsData: tabsData
    })
  },

  /**
   * 私有化行业
   * @returns {Promise<void>}
   */
  async personal () {
    const { ctx } = app;
    const bannerData = require('../mock/solution/personal/banner')
    const painData = require('../mock/solution/personal/pain')
    const advantageData = require('../mock/solution/personal/advantage')
    const frameworkData = require('../mock/solution/personal/framework')
    const applyData = require('../mock/solution/personal/value')
    const caseData = require('../mock/solution/personal/case')
    const recommendData = require('../mock/solution/personal/recommend')
    const tabsData = require('../mock/solution/personal/tabsData')

    let pagePath = 'page/solution/page-personal/template'
    await ctx.render(pagePath, {
      title: '私有化行业',
      key: 'personal',
      navKey: 'solution',
      hasBanner: true,
      bannerData: bannerData,
      painData: painData,
      advantageData: advantageData,
      frameworkData: frameworkData,
      applyData: applyData,
      caseData: caseData,
      recommendData: recommendData,
      tabsData: tabsData
    })
  },

  /**
   * 交通行业解决方案
   * @returns {Promise<void>}
   */
  async traffic () {
    const { ctx } = app;
    const bannerData = require('../mock/solution/education/banner')
    const painData = require('../mock/solution/traffic/pain')
    const advantageData = require('../mock/solution/traffic/advantage')
    const frameworkData = require('../mock/solution/traffic/framework')
    const applyData = require('../mock/solution/traffic/value')
    const caseData = require('../mock/solution/traffic/case')
    const recommendData = require('../mock/solution/traffic/recommend')
    const tabsData = require('../mock/solution/traffic/tabsData')

    let pagePath = 'page/solution/page-traffic/template'
    await ctx.render(pagePath, {
      title: '交通行业解决方案',
      key: 'traffic',
      navKey: 'solution',
      hasBanner: true,
      bannerData: bannerData,
      painData: painData,
      advantageData: advantageData,
      frameworkData: frameworkData,
      applyData: applyData,
      caseData: caseData,
      recommendData: recommendData,
      tabsData: tabsData
    })
  },

  /**
   * 联系我们
   * @returns {Promise<void>}
   */
  async contact () {
    const { ctx } = app;
    const bannerData = require('../mock/service/contact/banner')
    const contactData = require('../mock/service/contact/contact')
    const addressData = require('../mock/service/contact/address')
    const tabsData = require('../mock/service/contact/tabsData')

    let pagePath = 'page/service/page-contact/template'
    await ctx.render(pagePath, {
      title: '联系我们',
      key: 'contact',
      navKey: 'service',
      hasBanner: true,
      bannerData: bannerData,
      contactData: contactData,
      addressData: addressData,
      tabsData: tabsData,
    })
  },

  /**
   * 帮助中心
   * @returns {Promise<void>}
   */
  async help () {
    const { ctx } = app;
    const bannerData = require('../mock/service/help/banner')
    const quickData = require('../mock/service/help/quick')
    const commonData = require('../mock/service/help/common')
    const tabsData = require('../mock/service/help/tabsData')

    let pagePath = 'page/service/page-help/template'
    await ctx.render(pagePath, {
      title: '帮助中心',
      key: 'help',
      navKey: 'service',
      hasBanner: true,
      bannerData: bannerData,
      quickData: quickData,
      commonData: commonData,
      tabsData: tabsData,
    })
  },

  /**
   * 资源中心
   * @returns {Promise<void>}
   */
  async resource () {
    const { ctx, $config, $service, $model, $helper } = app;
    const { commonConfig, pageResourceColumn, pageResourceCategory, pageResourceDownload } = $model
    const bannerData = require('../mock/service/resource/banner')
    let columnData
    let downloadData

    if($config.dataMock){
      columnData = require('../mock/service/resource/column')
      downloadData = require('../mock/service/resource/download')
    } else {
      columnData = await $service.baseService.query(pageResourceColumn, {status: 1},{},{sort: {order: -1}})
      let target = {}
      let category = await $service.baseService.query(
        pageResourceCategory,
        {status: 1},
        {},
        {sort:
            {
              order: -1,
              _id: -1,
            }
        })

      target.tabs = category

      let downloadConfig = await $service.baseService.queryOne(commonConfig, {key: 'page_resource_download'})
      let downloadConfigValue = JSON.parse(downloadConfig.v1)
      target.title = downloadConfigValue.title
      target.desc = downloadConfigValue.desc

      let downloadList = await $service.baseService.query(pageResourceDownload, {status: 1})
      target.content = downloadList

      downloadData = target
    }

    let pagePath = 'page/service/page-resource/template'
    await ctx.render(pagePath, {
      title: '资源中心',
      key: 'resource',
      navKey: 'service',
      hasBanner: true,
      bannerData: bannerData,
      columnData: columnData,
      downloadData: downloadData,
      tabsData: [],
    })
  },

  /**
   * 隐私政策
   * @returns {Promise<void>}
   */
  async declares () {
    const { ctx } = app;
    const detailData = require('../mock/service/declare/main')
    let pagePath = 'page/service/page-declare/template'
    await ctx.render(pagePath, {
      title: '隐私政策',
      key: 'declare',
      navKey: 'service',
      hasBanner: false,
      bannerData: {},
      detailData: detailData,
      tabsData: [],
    })
  },

  /**
   * 了解我们
   * @returns {Promise<void>}
   */
  async company () {
    const { ctx } = app;
    const bannerData = require('../mock/about/company/banner')
    const usData = require('../mock/about/company/us')
    const teamData = require('../mock/about/company/team')
    const valueData = require('../mock/about/company/value')
    const lifeData = require('../mock/about/company/life')
    const historyData = require('../mock/about/company/history')
    const prizeData = require('../mock/about/company/prize')
    const tabsData = require('../mock/about/company/tabsData')

    let pagePath = 'page/about/page-company/template'
    await ctx.render(pagePath, {
      title: '公司介绍',
      key: 'company',
      navKey: 'about',
      hasBanner: true,
      bannerData: bannerData,
      usData: usData,
      teamData: teamData,
      valueData: valueData,
      lifeData: lifeData,
      historyData: historyData,
      prizeData: prizeData,
      tabsData: tabsData,
      tdk: {
        title: 111,
      }
    })
  },

  /**
   * 新闻列表(第一页)
   * @returns {Promise<void>}
   */
  async newsMain () {
    const { ctx } = app;
    ctx.redirect('/about/news/1')
  },
  /**
   * 新闻列表
   * @returns {Promise<void>}
   */
  async news () {
    const { ctx, $config, $service, $model, $helper } = app;
    const { pageNewsCategory, commonConfig, pageNews } = $model

    let page = ctx.params._page - 0
    if(!page || page <= 0){
      page = 1
    }

    let type = ctx.query.type ? ctx.query.type : null
    let search = ctx.query.search ? ctx.query.search : ''

    const bannerData = require('../mock/about/news/banner')
    const tagList = require('../mock/about/tag/tag')

    let articleList
    let categoryData
    let searchHot
    let hotArticleList
    let latestArticleList
    let total
    let paginationData
    let pageTdk = $helper.getTdkByPath('/about/news')
    if($config.dataMock){
      let originList = require('../mock/about/news/list')
      categoryData = require('../mock/about/news/category')
      searchHot = require('../mock/about/news/search')
      //做个假的分页
      articleList = originList.slice((page - 1) * 10, 10 + (page - 1) * 10)
      hotArticleList = originList.filter(function (v) { return !!v.isHot})
      latestArticleList = originList
      total = originList.length
      paginationData = $helper.getPaginationData(total, page, '/about/news/', ctx)
    } else {
      categoryData = await $service.baseService.query(
        pageNewsCategory,
        {status: 1},
        {},
        {sort:
            {
              order: -1,
              _id: -1,
            }
        })

      let newsSearchConfig = await $service.baseService.queryOne(commonConfig, {key: 'page_news_hot_search'})
      searchHot = JSON.parse(newsSearchConfig.v1)

      let searchParams = {
        status: 1
      }
      if(type && type !== '' && type !== 'all'){
        searchParams.type = type
      }
      if(search && search !== ''){
        searchParams.searchKey = search
      }

      let queryResult = await $service.newsService.getMatchList(page, 10, searchParams)
      articleList = queryResult.list
      total = queryResult.total
      hotArticleList = await $service.baseService.query(pageNews, {status: 1, isHot: 1 })
      latestArticleList = await $service.baseService.query(pageNews, {status: 1})
      // 计算分页器初始化参数
      paginationData = $helper.getPaginationData(total, page, '/about/news/', ctx)
    }
    let pagePath = 'page/about/page-news-main/template'
    await ctx.render(pagePath, {
      title: '新闻资讯',
      key: 'news',
      navKey: 'about',
      hasBanner: true,
      bannerData: bannerData,
      categoryData: categoryData,
      articleList: articleList,
      hotArticleList: hotArticleList,
      latestArticleList: latestArticleList,
      tagList: tagList,
      searchHot: searchHot,
      tabsData: [],

      paginationData: paginationData,
      total: total,
      tabActiveKey: type ? type : 'all',
      searchKey: search ? search : '',

      pageTdk: pageTdk,
    })
  },

  async newsDetailMain () {
    const { ctx } = app;
    ctx.redirect('/about/news/detail/1')
  },
  /**
   *
   * @returns {Promise<void>}
   */
  async newsDetail () {
    const { ctx, $config, $service, $model, $helper } = app;
    const { pageNews } = $model
    let id = ctx.params.id
    const tagList = require('../mock/about/tag/tag')
    let articleList
    let hotArticleList
    let latestArticleList
    let next
    let prev
    let article
    let pageTdk
    if($config.dataMock){
      let articleList = require('../mock/about/news/list')
      hotArticleList = articleList.filter(function (v) { return !!v.isHot})
      latestArticleList = articleList
      article = articleList.find((article)=>{
        return article.id + '' === id + ''
      })
      article.body = '<div class="article"><div>这是mock出来的新闻内容，如需浏览正确新闻内容，请设置config.dataMock为false，并连接正确数据库</div></div>'
      next = articleList.find((article)=>{
        return article.id + '' === (id - 1) + ''
      })
      prev = articleList.find((article)=>{
        return article.id + '' === (id - 0 + 1) + ''
      })
      pageTdk = $helper.getTdkByPath('/about/news/detail')
    } else {

      hotArticleList = await $service.baseService.query(pageNews, {status: 1, isHot: 1 })
      latestArticleList = await $service.baseService.query(pageNews, {status: 1})

      article = await $service.baseService.queryOne(pageNews, {id: id})
      // 获取上一篇文章
      next = await $service.newsService.getAdjacentDetailById(id, 'prev')
      // 获取下一篇文章
      prev = await $service.newsService.getAdjacentDetailById(id)
      // 新闻tdk根据新闻详情来获取
      pageTdk = {
        title: article ? article.title : '',
        description: article ? article.description : '',
        keywords: article ? article.keywords : '',
      }
    }

    //todo: 入库的时候找个html在线压缩,然后图片啥的路径要换一下

    let pagePath = 'page/about/page-news-detail/template'
    await ctx.render(pagePath, {
      title: '新闻详情',
      key: 'news',
      navKey: 'about',
      hasBanner: false,
      articleList: articleList,
      tagList: tagList,
      tabsData: [],
      hotArticleList: hotArticleList,
      latestArticleList: latestArticleList,
      article: article,
      next: next,
      prev: prev,

      pageTdk: pageTdk,
    })
  },

  /**
   * 加入我们
   * @returns {Promise<void>}
   */
  async joinus () {
    const { ctx, $config, $service, $model, $helper } = app;
    const { commonConfig, pageResumeColumn, pageResume, pageResumeCategory, pageResumePlace, pageCommonTag } = $model
    const bannerData = require('../mock/about/joinus/banner')
    const envData = require('../mock/about/joinus/env')
    const welfareData = require('../mock/about/joinus/welfare')
    let resumeData
    const tabsData = require('../mock/about/joinus/tabsData')

    if($config.dataMock){
      resumeData = require('../mock/about/joinus/resume')
    } else {
      // 组装数据，ecoco那里的数据格式定义的比较糟糕，应该都分开，唉....
      let target = {}
      let resumeConfig = await $service.baseService.queryOne(commonConfig, {key: 'page_resume_link'})
      let resumeConfigValue = JSON.parse(resumeConfig.v1)
      target.bg = resumeConfigValue.bg
      target.href = resumeConfigValue.href

      let resumePlace = await $service.baseService.query(pageResumePlace, {status: 1})
      let resumePlaceMap = {}
      resumePlace.forEach(item=>{
        resumePlaceMap[item.key] = item
      })

      resumePlace = resumePlace.sort((v1,v2)=>{
        if(v1.order < v2.order ){
          return 1
        } else {
          return -1
        }
      })

      let resumeCategory = await $service.baseService.query(pageResumeCategory, {status: 1})
      let resumeCategoryMap = {}
      resumeCategory.forEach(item=>{
        resumeCategoryMap[item.key] = item
      })

      resumeCategory = resumeCategory.sort((v1,v2)=>{
        if(v1.order < v2.order ){
          return 1
        } else {
          return -1
        }
      })

      let resume = await $service.baseService.query(pageResumeColumn, {status: 1})
      let resumeMap = {}
      resume.forEach(item=>{
        resumeMap[item.key] = item
      })

      let commonTag = await $service.baseService.query(pageCommonTag, {status: 1, mainKey: 'resume_tag'})
      let resumeTagMap = {}
      commonTag.forEach(item=>{
        resumeTagMap[item.secKey] = item
      })
      let tabs = []
      for(let i = 0; i < resume.length; i++){
        let item = resume[i]
        // 创建map 表
        let resumeList = await $service.baseService.query(pageResume, {status: 1, key: item.key },{},{sort: {isTop: -1, order: -1, id: -1}})
        let targetResumeList = []
        resumeList.forEach(detail=>{
          let obj = {
            title: detail.title,
            desc: detail.desc,
            category: detail.category,
            categoryString: resumeCategoryMap[detail.category] ? resumeCategoryMap[detail.category].name : '',
            place: detail.place,
            placeString: resumePlaceMap[detail.place] ? resumePlaceMap[detail.place].name : '',
            department: detail.department,
            date: detail.date,
            experience: detail.experience,
            education: detail.education,
            href: detail.href,
            contact: detail.contact,
          }

          if(detail.tag && detail.tag.length > 0){
            obj.tag = $helper.transTag(resumeTagMap, detail.tag)
          }

          if(detail.duty && detail.duty.length > 0){
            obj.duty = { title: '岗位职责', data: detail.duty }
          }

          if(detail.require && detail.require.length > 0){
            obj.require = { title: '岗位要求', data: detail.require }
          }

          if(detail.pluses && detail.pluses.length > 0){
            obj.pluses = { title: '加分项', data: detail.pluses }
          }
          targetResumeList.push(obj)
        })

        tabs.push({
          key: item.key,
          name: item.name,
          content: targetResumeList
        })
      }

      target.tabs = tabs
      target.category = resumeCategory
      target.place = resumePlace
      resumeData = target
    }

    //todo: 数据量一大必定慢！优化方案:
    // 1.优化查询，查询没办法优化了，再怎么样两个二重for循环，而且带await同步操作，必定会慢的。
    // 2.表结构优化，字段冗余或者加字段，尽量把二重for循环变成一重循环
    // 3.前端改造/优化数据结构，把嵌套的object数据拍平，让数据更清晰，这样前后端都要改，但是这个方案应该是最简单最舒服的
    // 4.进缓存，一般简历不会频繁改，半个月更新一次，把构造好的数据缓存起来（比如进nodecache），第一次查询构建好就存储起来，
    //   之后第二次查询直接用缓存的数据即可，更新数据之后，把对应的缓存刷掉即可。进一步可以更新之后刷掉缓存，立马人为的调用构建
    //   方法一次，构建好数据，并生成新的缓存。

    let pagePath = 'page/about/page-joinus/template'
    await ctx.render(pagePath, {
      title: '加入我们',
      key: 'joinus',
      navKey: 'about',
      hasBanner: true,
      bannerData: bannerData,
      envData: envData,
      welfareData: welfareData,
      resumeData: resumeData,
      tabsData: tabsData
    })
  },

  /**
   * 内容标签
   * @returns {Promise<void>}
   */
  async tag () {
    const { ctx } = app;
    const articleList = require('../mock/about/news/list')
    const tagList = require('../mock/about/tag/tag')
    const recommendData = require('../mock/case/recommend')
    const resourceList = require('../mock/service/resource/download')

    let pagePath = 'page/about/page-tag/template'
    await ctx.render(pagePath, {
      title: '内容标签',
      key: 'tag',
      navKey: 'about',
      hasBanner: false,
      bannerData: {},
      resourceList: resourceList,
      articleList: articleList,
      tagList: tagList,
      recommendData: recommendData,
      tabsData: []
    })
  },

  /**
   * 表单
   * @returns {Promise<void>}
   */
  async form () {
    const { ctx } = app;
    let pagePath = 'page/page-form/template'
    const logoData = require('../mock/form/logo')
    await ctx.render(pagePath, {
      title: '内容标签',
      key: 'form',
      navKey: 'about',
      hasBanner: false,
      hasFooter: false,
      bannerData: {},
      logoData: logoData,
      tabsData: []
    })
  }

})
