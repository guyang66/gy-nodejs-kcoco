db.kcoco_sys_roles.insertMany([
{
	key: 'admin',
	name: '系统管理员',
	status: 1,
	createTime: new Date(),
	modifyTime: new Date(),
},
{
	key: 'guest',
	name: '游客',
	status: 1,
	createTime: new Date(),
	modifyTime: new Date(),
}
])
