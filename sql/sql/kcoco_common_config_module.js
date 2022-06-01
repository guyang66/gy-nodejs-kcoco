db.kcoco_common_config.insertMany([
{
	key: 'page_resume_link',
	description: '简历跳转链接',
	remark: '勿删',
	v1: JSON.stringify(
		{
			name: 'resume',
			bg: '#ffffff',
			href: 'https://www.zhipin.com'
		}
	),
	status: 1,
	createTime: new Date(),
	modifyTime: new Date(),
},
{
	key: 'page_resource_download',
	description: '资源下载模块配置',
	remark: '勿删',
	v1: JSON.stringify(
		{
			title: '资源下载',
			desc: '行业数据等你挑战，海量资源任你下载'
		}
	),
	status: 1,
	createTime: new Date(),
	modifyTime: new Date(),
}
])