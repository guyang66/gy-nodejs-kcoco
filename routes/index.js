module.exports = app => {
  const { router, $controller, $middleware } = app;

  /**
   * 官网页面路由
   */
  router.get('/', $controller.pageController.index)
  router.get('/index', $controller.pageController.index)
  router.get('/index.html', $controller.pageController.index)
  router.get('/product/ai/algorithm', $controller.pageController.algorithm)
  router.get('/product/ai/speech', $controller.pageController.speech)
  router.get('/product/ai/discriminate', $controller.pageController.discriminate)
  router.get('/product/ai/enterprise', $controller.pageController.enterprise)
  router.get('/product/ai/digital', $controller.pageController.digital)
  router.get('/product/ai/qingshui', $controller.pageController.qingshui)
  router.get('/product/ai/puti', $controller.pageController.puti)
  router.get('/product/ai/shuying', $controller.pageController.shuying)
  router.get('/product/ai/tianyan', $controller.pageController.tianyan)
  router.get('/product/ai/titi', $controller.pageController.titi)
  router.get('/product/ai/colgi', $controller.pageController.colgi)
  router.get('/product/ai/xiyu', $controller.pageController.xiyu)
  router.get('/product/ai/uav', $controller.pageController.uav)
  router.get('/product/dataserver/cluster', $controller.pageController.cluster)
  router.get('/product/dataserver/offlinealgorithm', $controller.pageController.offlinealgorithm)
  router.get('/product/dataserver/onlinedevelop', $controller.pageController.onlinedevelop)
  router.get('/product/dataserver/offlinedevelop', $controller.pageController.offlinedevelop)
  router.get('/product/dataserver/neuralnetwork', $controller.pageController.neuralnetwork)
  router.get('/product/dataserver/recommend', $controller.pageController.recommend)
  router.get('/product/fruits/banana', $controller.pageController.banana)
  router.get('/product/fruits/peach', $controller.pageController.peach)
  router.get('/product/fruits/pomegranate', $controller.pageController.pomegranate)
  router.get('/product/fruits/kiwi', $controller.pageController.kiwi)
  router.get('/product/fruits/avocado', $controller.pageController.avocado)
  router.get('/product/fruits/mongo', $controller.pageController.mongo)
  router.get('/product/fruits/mangosteen', $controller.pageController.mangosteen)
  router.get('/product/fruits/grape', $controller.pageController.grape)
  router.get('/product/fruits/lemon', $controller.pageController.lemon)
  router.get('/product/fruits/litchi', $controller.pageController.litchi)
  router.get('/product/fruits/piyata', $controller.pageController.piyata)
  router.get('/product/fruits/croissant', $controller.pageController.croissant)
  router.get('/product/fruits/hami', $controller.pageController.hami)
  router.get('/product/fruits/fig', $controller.pageController.fig)
  router.get('/product/fruits/jujube', $controller.pageController.jujube)
  router.get('/product/fruits/apple', $controller.pageController.apple)
  router.get('/product/fruits/shaddock', $controller.pageController.shaddock)
  router.get('/product/fruits/loquat', $controller.pageController.loquat)
  router.get('/product/fruits/plum', $controller.pageController.plum)
  router.get('/product/fruits/orange', $controller.pageController.orange)
  router.get('/product/fruits/cherry', $controller.pageController.cherry)
  router.get('/product/fruits/persimmon', $controller.pageController.persimmon)
  router.get('/product/vegetables/radish', $controller.pageController.radish)
  router.get('/product/vegetables/onion', $controller.pageController.onion)
  router.get('/product/vegetables/cucumber', $controller.pageController.cucumber)
  router.get('/product/vegetables/bolt', $controller.pageController.bolt)
  router.get('/product/vegetables/cabbage', $controller.pageController.cabbage)
  router.get('/product/vegetables/lotus', $controller.pageController.lotus)
  router.get('/product/vegetables/mushroom', $controller.pageController.mushroom)
  router.get('/product/vegetables/amaranthus', $controller.pageController.amaranthus)
  router.get('/product/vegetables/peas', $controller.pageController.peas)
  router.get('/product/vegetables/bilter', $controller.pageController.bilter)
  router.get('/product/vegetables/ginger', $controller.pageController.ginger)
  router.get('/product/vegetables/celery', $controller.pageController.celery)
  router.get('/product/vegetables/eggplant', $controller.pageController.eggplant)
  router.get('/product/vegetables/chili', $controller.pageController.chili)
  router.get('/product/vegetables/pumpkin', $controller.pageController.pumpkin)
  router.get('/solution/education', $controller.pageController.education)
  router.get('/solution/bigdata', $controller.pageController.bigdata)
  router.get('/solution/finance', $controller.pageController.finance)
  router.get('/solution/food', $controller.pageController.food)
  router.get('/solution/game', $controller.pageController.game)
  router.get('/solution/manufacture', $controller.pageController.manufacture)
  router.get('/solution/online', $controller.pageController.online)
  router.get('/solution/personal', $controller.pageController.personal)
  router.get('/solution/traffic', $controller.pageController.traffic)
  router.get('/case', $controller.pageController.caseList)
  router.get('/case/detail', $controller.pageController.caseDetail)
  router.get('/activity', $controller.pageController.activityList)
  router.get('/activity/detail', $controller.pageController.activityDetail)
  router.get('/service/contact', $controller.pageController.contact)
  router.get('/service/help', $controller.pageController.help)
  router.get('/service/resource', $controller.pageController.resource)
  router.get('/service/declare', $controller.pageController.declares)
  router.get('/about/company', $controller.pageController.company)
  router.get('/about/news', $controller.pageController.newsMain)
  // 新闻做成网状内容结构，可以通过a标签访问到所有新闻，方便爬虫抓取，搜索引擎收录
  router.get('/about/news/:_page', $controller.pageController.news)
  router.get('/about/news/detail', $controller.pageController.newsDetailMain)
  router.get('/about/news/detail/:id', $controller.pageController.newsDetail)
  router.get('/about/joinus', $controller.pageController.joinus)
  router.get('/about/tag', $controller.pageController.tag)
  router.get('/form', $controller.pageController.form)

  /**
   * 普通接口
   */
  // todo: 普通接口 /api 开头，否则一律返回页面路由，找不到路由就返回404错误页面 ，/api开头找不到的就处理成404错误。

  router.get('/api/sms/send', $controller.smsController.send)
  router.get('/api/sms/verify', $controller.smsController.verify)

  router.get('/api/clue/save', $controller.clueController.save)

  /**
   * 管理后台接口
   */

  // 菜单
  router.get('/api/menu/auth',$middleware.auth, $controller.adminMenuController.getMenu)


  // 路由
  router.get('/api/route/auth',$middleware.auth, $controller.adminRouteController.getRoute)

  // user相关
  router.get('/api/user/getUserInfo/auth', $middleware.auth, $controller.adminUserController.getUserInfo)
  router.post('/api/user/updateUserInfo/auth', $middleware.auth, $controller.adminUserController.updateUserInfo)
  router.post('/api/user/updatePassword/auth', $middleware.auth, $controller.adminUserController.updatePassword)


  // 登录
  router.post('/api/login', $controller.adminAuthController.login)
  router.get('/api/getCaptcha', $controller.commonController.getCaptcha)
  // router.get('/test', $controller.commonController.test2)

  return router
}
