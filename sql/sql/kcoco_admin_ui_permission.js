db.kcoco_admin_ui_permission.insertMany([
{
	key: 'system.adminManage',
	name: '管理员特有权限',
	status: 1,
	type: 'app',
	remark: '',
	roles: ['superAdmin','admin'],
	createTime: new Date(),
	modifyTime: new Date(),
},
{
	key: 'system.addUser',
	name: '新增系统用户',
	status: 1,
	type: 'button',
	remark: '',
	roles: ['superAdmin'],
	createTime: new Date(),
	modifyTime: new Date(),
},
{
	key: 'system.deleteUser',
	name: '删除系统用户',
	status: 1,
	type: 'button',
	remark: '',
	roles: ['superAdmin'],
	createTime: new Date(),
	modifyTime: new Date(),
},
{
	key: 'system.resetPassword',
	name: '重置用户密码',
	status: 1,
	type: 'button',
	remark: '',
	roles: ['superAdmin'],
	createTime: new Date(),
	modifyTime: new Date(),
},
{
	key: 'system.updateUser',
	name: '启用/禁用用户',
	status: 1,
	type: 'button',
	remark: '',
	roles: ['superAdmin'],
	createTime: new Date(),
	modifyTime: new Date(),
},
{
	key: 'system.usePermission',
	name: '用户权限分配',
	status: 1,
	type: 'button',
	remark: '',
	roles: ['superAdmin'],
	createTime: new Date(),
	modifyTime: new Date(),
},
{
	key: 'app.addCache',
	name: '新增缓存配置',
	status: 1,
	type: 'button',
	remark: '',
	roles: ['superAdmin','admin'],
	createTime: new Date(),
	modifyTime: new Date(),
},
{
	key: 'app.cacheAll',
	name: '刷新应用全部缓存',
	status: 1,
	type: 'button',
	remark: '',
	roles: ['superAdmin','admin'],
	createTime: new Date(),
	modifyTime: new Date(),
},
{
	key: 'app.cacheUrlPermission',
	name: '刷新应用url权限缓存',
	status: 1,
	type: 'button',
	remark: '',
	roles: ['superAdmin','admin'],
	createTime: new Date(),
	modifyTime: new Date(),
},
{
	key: 'data.download',
	name: '数据源下载',
	status: 1,
	type: 'button',
	remark: '',
	roles: ['superAdmin','admin','data'],
	createTime: new Date(),
	modifyTime: new Date(),
},
])