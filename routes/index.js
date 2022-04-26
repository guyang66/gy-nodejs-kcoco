module.exports = app => {
  const { router, $controller, $middleware } = app;

  // 页面
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

  router.get('/case', $controller.pageController.caseList)
  router.get('/case/detail', $controller.pageController.caseDetail)

  router.get('/activity', $controller.pageController.activityList)
  router.get('/activity/detail', $controller.pageController.activityDetail)


  router.get('/test', $controller.common.test)
  router.get('/common/test', $controller.common.test)
  router.get('/common/save',$middleware.auth, $controller.common.saveCustomer)
  router.get('/common/getCustomer',$middleware.auth, $controller.common.getCustomer)

  // 简单的鉴权，测试的时候用postman 在 header中添加 appid = gy
  router.post('/common/getUserInfo/auth',$middleware.auth, $controller.common.getUserInfo)

  // 菜单
  router.get('/menu/list',$middleware.auth, $controller.menu.getMenus)

  // 客户
  // 接口：/common/save 多调用几次，往数据库插入一些数据，然后访问 http://localhost:8090/customer/list?name=data3，查询指定列表
  router.get('/customer/list',$middleware.auth, $controller.customer.getList)

  return router
}
