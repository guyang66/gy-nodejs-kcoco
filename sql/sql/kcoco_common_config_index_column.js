db.kcoco_common_config.insertMany([
{
	key: 'page_index_columns',
	description: '首页column配置',
	remark: '勿删',
	v2: JSON.stringify([
	    {
	      title: '走进科学',
	      text: '走向用多久的爱仕达收到',
	      href: 'http://www.baidu.com',
	      target: '_blank',
	      order: 100,
	      status: 1,
	    },
	    {
	      title: '案例精选',
	      text: '行业经验沉淀，超多解决方案',
	      href: '/case',
	      order: 80,
	      status: 1,
	    },
	    {
	      title: '老会员专享',
	      text: '3年老会员全场85折',
	      href: '/activity',
	      order: 40,
	      status: 1,
	    },
	    {
	      title: '资源下载',
	      text: '海量资源任你下载',
	      href: '/service/resource',
	      order: 1,
	      status: 1,
	    }
	]),
	status: 1,
	createTime: new Date(),
	modifyTime: new Date(),
}
])