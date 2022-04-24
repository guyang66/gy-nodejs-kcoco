module.exports = app => {
  const { router, $controller, $middleware } = app;

  // 页面
  router.get('/', $controller.pageController.index)


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
