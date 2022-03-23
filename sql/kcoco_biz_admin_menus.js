db.kcoco_biz_admin_menus.insertMany([
  {
    title: '用户信息',
    key: 'user_info', // 和routes 匹配
    hasIcon: 1,
    path: '/admin/user/info',
    level: 1, // 1级菜单
    hasLink: 1,  // 是否点击有跳转 （比如跳转到第三方页面的）
    hasChild: 0, // 是否有子菜单
    roles: ['admin'],
    order: 1, // 默认排序
    status: 1 // 状态1：使用中，0:禁用
  },
  {
    title: '首页',
    key: 'index',
    path: '/admin/user/modify',
    level: 1,
    hasIcon: 1,
    hasChild: 0,
    hasLink: 1,
    roles: ['guest', 'admin'],
    order: 999,
    status: 1
  }
])
