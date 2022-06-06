db.kcoco_admin_user.insertMany([
{
	username: 'super',
	password: '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b', // 密码是1
	name: 'super',
	email: '',
	avatar: '',
	position: '',
	department: '',
	roles: ['superAdmin'],
	defaultRole: 'superAdmin',
	defaultRoleName: '超级系统管理员',
	noModify: 1,
	status: 1,
	remark: '系统默认（不可删除）'
},
{
	username: 'admin',
	password: '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b', // 密码是1
	name: 'admin',
	email: '',
	avatar: '',
	phone: '13588888888',
	position: '前端工程师',
	department: '技术部',
	roles: ['admin'],
	defaultRole: 'admin',
	defaultRoleName: '系统管理员',
	status: 1,
	remark: '系统导入'
},
{
	username: 'guest',
	password: '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b', // 密码是1
	name: 'guest',
	email: '',
	avatar: '',
	position: '无',
	department: '无',
	roles: ['guest'],
	defaultRole: 'guest',
	defaultRoleName: '游客',
	status: 1,
	remark: '系统导入'
},
{
	username: 'web',
	password: '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b', // 密码是1
	name: '官网内容管理员',
	email: '',
	avatar: '',
	position: '无',
	department: '无',
	roles: ['guest', 'web'],
	defaultRole: 'web',
	defaultRoleName: '官网内容管理员',
	status: 1,
	remark: '系统导入'
},
{
	username: 'hr',
	password: '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b', // 密码是1
	name: '招聘信息发布员',
	email: '',
	avatar: '',
	position: '无',
	department: '无',
	roles: ['guest', 'hr'],
	defaultRole: 'hr',
	defaultRoleName: '招聘管理员',
	status: 1,
	remark: '系统导入'
},
{
	username: 'data',
	password: '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b', // 密码是1
	name: '数据管理员',
	email: '',
	avatar: '',
	position: '无',
	department: '无',
	roles: ['data'],
	defaultRole: 'data',
	defaultRoleName: '数据管理员',
	status: 1,
	remark: '系统导入'
}
])
