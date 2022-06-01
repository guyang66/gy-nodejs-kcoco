db.kcoco_common_config.insertMany([
{
	key: 'page_news_hot_search',
	description: '新闻热门搜索（系统默认）',
	remark: '勿删',
	v1: JSON.stringify(
		['数机大会','水果联盟','智能']
	),
	status: 1,
	createTime: new Date(),
	modifyTime: new Date(),
},
])