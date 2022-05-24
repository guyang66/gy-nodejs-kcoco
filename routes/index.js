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

  router.get('/api/tag/online/auth',$middleware.auth, $controller.adminCommonController.getOnlineTagList)

  // user相关
  router.get('/api/user/getUserInfo/auth', $middleware.auth, $controller.adminUserController.getUserInfo)
  router.post('/api/user/updateUserInfo/auth', $middleware.auth, $controller.adminUserController.updateUserInfo)
  router.post('/api/user/updatePassword/auth', $middleware.auth, $controller.adminUserController.updatePassword)

  // 首页banner
  router.get('/api/index/banner/auth', $middleware.auth, $controller.adminCommonController.getIndexBanner)
  router.post('/api/index/banner/update/auth', $middleware.auth, $controller.adminCommonController.updateIndexBanner)
  router.get('/api/index/banner/action/auth', $middleware.auth, $controller.adminCommonController.getIndexBannersAction)

  // 首页新闻
  router.get('/api/index/news/auth', $middleware.auth, $controller.adminCommonController.getIndexNews)
  router.post('/api/index/news/update/auth', $middleware.auth, $controller.adminCommonController.updateIndexNews)

  // 首页栏目
  router.get('/api/index/column/auth', $middleware.auth, $controller.adminCommonController.getIndexColumn)
  router.post('/api/index/column/update/auth', $middleware.auth, $controller.adminCommonController.updateIndexColumn)

  // 文章新闻
  router.get('/api/news/list/online/auth', $middleware.auth, $controller.adminNewsController.getAllOnlineNews)
  router.post('/api/news/list/auth', $middleware.auth, $controller.adminNewsController.getNewsList)
  router.post('/api/news/update/auth', $middleware.auth, $controller.adminNewsController.updateNews)
  router.get('/api/news/delete/auth', $middleware.auth, $controller.adminNewsController.deleteNews)
  router.get('/api/news/detail/auth', $middleware.auth, $controller.adminNewsController.getNewsDetail)
  router.post('/api/news/save/auth', $middleware.auth, $controller.adminNewsController.saveNews)
  router.get('/api/news/category/online/auth', $middleware.auth, $controller.adminNewsController.getCategoryOnline)
  router.get('/api/news/category/list/auth', $middleware.auth, $controller.adminNewsController.getCategoryList)
  router.post('/api/news/category/update/auth', $middleware.auth, $controller.adminNewsController.updateCategory)
  router.get('/api/news/category/delete/auth', $middleware.auth, $controller.adminNewsController.deleteCategory)
  router.post('/api/news/category/save/auth', $middleware.auth, $controller.adminNewsController.saveCategory)

  // 招聘
  router.get('/api/resume/column/auth', $middleware.auth, $controller.adminResumeController.getResumeColumn)
  router.get('/api/resume/category/auth', $middleware.auth, $controller.adminResumeController.getResumeCategory)
  router.get('/api/resume/place/auth', $middleware.auth, $controller.adminResumeController.getResumePlace)
  router.post('/api/resume/list/auth', $middleware.auth, $controller.adminResumeController.getResumeList)
  router.post('/api/resume/update/auth', $middleware.auth, $controller.adminResumeController.updateResume)
  router.get('/api/resume/delete/auth', $middleware.auth, $controller.adminResumeController.deleteResume)
  router.post('/api/resume/save/auth', $middleware.auth, $controller.adminResumeController.saveResume)
  router.get('/api/resume/detail/auth', $middleware.auth, $controller.adminResumeController.getResumeDetail)
  router.post('/api/resume/category/list/auth', $middleware.auth, $controller.adminResumeController.getResumeCategoryList)
  router.post('/api/resume/category/update/auth', $middleware.auth, $controller.adminResumeController.updateResumeCategory)
  router.post('/api/resume/category/save/auth', $middleware.auth, $controller.adminResumeController.saveResumeCategory)
  router.get('/api/resume/category/delete/auth', $middleware.auth, $controller.adminResumeController.deleteResumeCategory)
  router.post('/api/resume/place/list/auth', $middleware.auth, $controller.adminResumeController.getResumePlaceList)
  router.post('/api/resume/place/update/auth', $middleware.auth, $controller.adminResumeController.updateResumePlace)
  router.post('/api/resume/place/save/auth', $middleware.auth, $controller.adminResumeController.saveResumePlace)
  router.get('/api/resume/place/delete/auth', $middleware.auth, $controller.adminResumeController.deleteResumePlace)
  router.get('/api/resume/tag/list/auth', $middleware.auth, $controller.adminResumeController.getTagList)
  router.get('/api/resume/tag/delete/auth', $middleware.auth, $controller.adminResumeController.deleteResumeTag)
  router.post('/api/resume/tag/save/auth', $middleware.auth, $controller.adminResumeController.saveResumeTag)
  router.post('/api/resume/tag/update/auth', $middleware.auth, $controller.adminResumeController.updateResumeTag)

  // 案例
  router.post('/api/case/list/auth', $middleware.auth, $controller.adminCaseController.getCaseList)
  router.post('/api/case/update/auth', $middleware.auth, $controller.adminCaseController.updateCase)
  router.get('/api/case/delete/auth', $middleware.auth, $controller.adminCaseController.deleteCase)
  router.post('/api/case/save/auth', $middleware.auth, $controller.adminCaseController.saveCase)
  router.get('/api/case/tag/list/auth', $middleware.auth, $controller.adminCaseController.getTagList)
  router.get('/api/case/tag/delete/auth', $middleware.auth, $controller.adminCaseController.deleteTag)
  router.post('/api/case/tag/save/auth', $middleware.auth, $controller.adminCaseController.saveCaseTag)
  router.post('/api/case/tag/update/auth', $middleware.auth, $controller.adminCaseController.updateCaseTag)

  // 活动
  router.post('/api/activity/list/auth', $middleware.auth, $controller.adminActivityController.getActivityList)
  router.post('/api/activity/update/auth', $middleware.auth, $controller.adminActivityController.updateActivity)
  router.get('/api/activity/delete/auth', $middleware.auth, $controller.adminActivityController.deleteActivity)
  router.post('/api/activity/save/auth', $middleware.auth, $controller.adminActivityController.saveActivity)
  router.get('/api/activity/main/auth', $middleware.auth, $controller.adminActivityController.setMainActivity)

  // 资源
  router.post('/api/resource/list/auth', $middleware.auth, $controller.adminResourceController.getResourceList)
  router.post('/api/resource/update/auth', $middleware.auth, $controller.adminResourceController.updateResource)
  router.get('/api/resource/delete/auth', $middleware.auth, $controller.adminResourceController.deleteResource)
  router.get('/api/resource/detail/auth', $middleware.auth, $controller.adminResourceController.getResourceDetail)
  router.post('/api/resource/save/auth', $middleware.auth, $controller.adminResourceController.saveResource)
  router.get('/api/resource/column/list/auth', $middleware.auth, $controller.adminResourceController.getColumnList)
  router.post('/api/resource/column/update/auth', $middleware.auth, $controller.adminResourceController.updateResourceColumn)

  router.get('/api/resource/category/online/auth', $middleware.auth, $controller.adminResourceController.getCategoryOnlineList)
  router.get('/api/resource/category/list/auth', $middleware.auth, $controller.adminResourceController.getCategoryList)
  router.post('/api/resource/category/update/auth', $middleware.auth, $controller.adminResourceController.updateCategory)
  router.post('/api/resource/category/save/auth', $middleware.auth, $controller.adminResourceController.saveCategory)
  router.get('/api/resource/category/delete/auth', $middleware.auth, $controller.adminResourceController.deleteCategory)

  // 登录
  router.post('/api/login', $controller.adminAuthController.login)
  router.get('/api/getCaptcha', $controller.commonController.getCaptcha)
  // router.get('/test', $controller.commonController.test2)

  // 上传到oss
  router.post('/api/upload/auth', $middleware.auth, $controller.commonController.upload)
  router.post('/api/multiUpload/auth', $middleware.auth, $controller.commonController.multiUpload)
  // 普通上传
  router.post('/api/uploadV2/auth', $middleware.auth, $controller.commonController.uploadV2)
  // multer单文件上传，必须指定文件名字,
  router.post('/api/uploadV3/auth', $middleware.auth, $middleware.multer.single('userAvatar'), $controller.commonController.uploadV3)
  // multer多文件上传
  // router.post('/api/uploadV3/auth', $middleware.auth, $middleware.multer.array('userAvatar'), $controller.commonController.xxx)

  return router
}
