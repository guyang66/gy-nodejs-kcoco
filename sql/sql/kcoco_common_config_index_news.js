db.kcoco_common_config.insertMany([
{
	key: 'page_index_news',
	description: '首页news配置',
	remark: '勿删',
	v1: JSON.stringify({
		title: '资讯速递',
		desc: null
	}),
	v2: JSON.stringify([
		{
	      cover: '/images/news/16/cover.png',
	      title: '《绣春刀》2014年8月7日于中国内地上映',
	      href: '/about/news/detail/16',
	      summary:
	        '《绣春刀》是中国电影股份有限公司、中央新影集团、北京大楚长歌影视文化有限公司、北京合力映画影视文化传媒有限公司联合出品的浪漫武侠电影，由路阳执导，张震、刘诗诗、王千源、李东学、聂远、金士杰、李洪涛 等主演。',
	      date: '2022-05-30',
	      order: 100,
	      status: 1,
	    },
	    {
	      cover: '/images/news/15/cover.png',
	      title: '云顶之弈：12.5版本更新详解，图奇大砍，多枚冷门C位大增强',
	      href: '/about/news/detail/15',
	      summary:
	        '1费棋子中火男极大增强，3星伤害增加，VIP火男可能会回归，魔腾改动不大3星控制削弱，技能伤害增强，但赌3星魔腾的阵容非常高。皇子小砍，技能释放效率下降但携带蓝buff还是能开局释放技能。老鼠这版本属于极大削弱，伤害能力大幅度下降',
	      date: '2022-02-01',
	      order: 80,
	      status: 1,
	    },
	    {
	      cover: '/images/news/14/cover.png',
	      title: '阿尔卡再战第4次高考',
	      href: '/about/news/detail/14',
	      summary: '近日，外国友人阿尔卡发表重要言论，他将参加2022届全国高考。',
	      date: '2022-02-22',
	      order: 60,
	      status: 1,
	    },
	    {
	      cover: '/images/news/13/cover.png',
	      title: '正午阳光为何走“偏”了？',
	      href: '/about/news/detail/13',
	      summary:
	        '刚播出不久的《相逢时节》，砸了“正午出品，必属精品”的招牌。该剧由雷佳音、袁泉、张艺兴、贾乃亮等主演，简川訸执导（《都挺好》《欢乐颂》）。',
	      date: '2022-03-15',
	      order: 1,
	      status: 1,
	    }
	]),
	status: 1,
	createTime: new Date(),
	modifyTime: new Date(),
}
])