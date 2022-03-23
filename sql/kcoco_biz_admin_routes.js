// 前端的访问url匹配不到routes中的路由，则由后端重定向到403或者404
db.kcoco_biz_admin_routes.insertMany([
{
	path: '/admin/user/info',
	roles: ['admin'],
	name: 'banner配置',
	status: 1,
	key: 'user_info',
	exact: true,
	backUrl: '/admin/403', // 权限路由，认证失败就去403
},
{
	path: '/admin/user/modify',
	roles: ['admin'],
	name: '招聘配置',
	status: 1,
	key: 'user_modify',
	exact: true,
	backUrl: 'http://www.test.com/403.html',
}
])
