db.kcoco_page_product_activity.insertMany([
{
	title: '水果零售价',
	desc: '节日特价，8.8折再加会员折扣，折扣多多，惊喜连连，欢迎新老用户购买',
	cover: '/images/activity/favorite/main.svg',
	href: '/activity/detail',
	btnText: '点击查看',
	type: 'main',
	advantage: [ 
		'90%出水率，甜美可口',
	    '新鲜不隔夜，无中间差价',
	    '放心购买，最低7.6折起'
	    ],
	tag: [
		{
          key: 'fill',
          text: '精选特价',
        },
        {
          key: 'outline',
          text: '新品上市',
        },
        {
          key: 'outline',
          text: '满1000减100',
        },
	],
	status: 1,
	order: 1000, // 置顶
	createTime: new Date(),
	modifyTime: new Date(),
},
{
	title: '蔬菜沙拉',
	desc: '多种果蔬多重营养，呵护你的全家健康',
	cover: '/images/activity/favorite/b7.svg',
	href: '/activity/detail',
	btnText: '立即购买',
	type: 'normal',
	tag: [
		{
          key: 'fill',
          text: '超级批发日',
        },
        {
          key: 'outline',
          text: '免费无线续杯',
        },
	],
	status: 1,
	order: 1,
	createTime: new Date(),
	modifyTime: new Date(),
},
{
	title: '智能在线客户',
	desc: '智能在线客户，上千套模板训练，效率100%',
	cover: '/images/activity/favorite/b6.svg',
	href: '/activity/detail',
	btnText: '查看详情',
	type: 'normal',
	tag: [
		{
          key: 'fill',
          text: '0元购买',
        },
        {
          key: 'outline',
          text: '免息支付',
        },
        {
          key: 'outline',
          text: '购物车好礼',
        },
	],
	status: 1,
	order: 1,
	createTime: new Date(),
	modifyTime: new Date(),
},
{
	title: '智能语音',
	desc: '智能语音，现免费试用1个月，先到先得',
	cover: '/images/activity/favorite/b5.svg',
	href: '/form',
	btnText: '申请试用',
	type: 'normal',
	tag: [
		 {
          key: 'fill',
          text: '新人特享',
        },
        {
          key: 'outline',
          text: '老用户免费续费',
        },
	],
	status: 1,
	order: 1,
	createTime: new Date(),
	modifyTime: new Date(),
},
{
	title: '巴西瓜子',
	desc: '巴西瓜子，毛利互相可拉到烧烤店啊啊',
	cover: '/images/activity/favorite/b4.svg',
	href: '/form',
	btnText: '申请试用',
	type: 'normal',
	tag: [
		   {
          key: 'fill',
          text: '新人特惠',
        },
        {
          key: 'fill',
          text: '按需付款',
        },
        {
          key: 'outline',
          text: '活动期间免费',
        },
	],
	status: 1,
	order: 1,
	createTime: new Date(),
	modifyTime: new Date(),
},
{
	title: '智能研判系统-清水',
	desc: '智能研判系统，在线直播，直播购买',
	cover: '/images/activity/favorite/b3.svg',
	href: '/activity/detail',
	btnText: '点击查看',
	type: 'normal',
	tag: [
	  {
          key: 'fill',
          text: '直播疯抢',
        },
        {
          key: 'outline',
          text: '整点送优惠券',
        },
	],
	status: 1,
	order: 1,
	createTime: new Date(),
	modifyTime: new Date(),
},
{
	title: '智能马桶',
	desc: '智能马桶，现免费试用1个月，先到先得',
	cover: '/images/activity/favorite/b2.svg',
	href: '/form',
	btnText: '申请试用',
	type: 'normal',
	tag: [
	   {
          key: 'fill',
          text: '新人特惠',
        },
        {
          key: 'outline',
          text: '免息支付',
        },
	],
	status: 1,
	order: 1,
	createTime: new Date(),
	modifyTime: new Date(),
},
{
	title: '看守无人机',
	desc: '超高续航，耐力十足，现在购买即送收纳盒',
	cover: '/images/activity/favorite/b1.svg',
	href: '/activity/detail',
	btnText: '查看详情',
	type: 'normal',
	tag: [
	     {
          key: 'fill',
          text: '新用户特享',
        },
        {
          key: 'outline',
          text: '最低0.92折',
        },
	],
	status: 1,
	order: 1,
	createTime: new Date(),
	modifyTime: new Date(),
},
])