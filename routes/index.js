module.exports = app => {
  const { router, $controller, $middleware } = app;

  // 页面
  router.get('/', $controller.pageController.index)

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
