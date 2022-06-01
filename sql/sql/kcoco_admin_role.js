db.kcoco_admin_role.insertMany([
{
	key: 'superAdmin',
	name: '超级系统管理员',
	status: 1,
	createTime: new Date(),
	modifyTime: new Date(),
},
{
	key: 'admin',
	name: '系统管理员',
	status: 1,
	createTime: new Date(),
	modifyTime: new Date(),
},
{
	key: 'guest',
	name: '访客',
	status: 1,
	createTime: new Date(),
	modifyTime: new Date(),
},
{
	key: 'web',
	name: '官网内容管理员',
	status: 1,
	createTime: new Date(),
	modifyTime: new Date(),
},
{
	key: 'hr',
	name: '招聘管理员',
	status: 1,
	createTime: new Date(),
	modifyTime: new Date(),
},
{
	key: 'data',
	name: '数据管理员',
	status: 1,
	createTime: new Date(),
	modifyTime: new Date(),
}
])