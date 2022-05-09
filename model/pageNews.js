const baseModel = require('./baseModel')
module.exports = app => {
  const { mongoose } = app;
  const News = new mongoose.Schema(
    Object.assign({}, baseModel, {
      /**
       * id —— 伪id
       * 这里的id不是数据库id，mongodb自带的是_id，且_id是一个hash值，乱踏踏的，非自增，所以不好阅读
       * 用id来模仿mysql这样的数据库自增id，也方便数据查询和肉眼检验啥的。
       * 如果用mongodb自带的id来做新闻详情跳转可能比较难受，除非是订单类的数据需要id是无序的，防止被爬虫爬
       */
      id: { type: Number, required: [true,'id不能为空！'], unique: true},

      title: { type: String, required: [true, '新闻标题不能为空！'] },
      summary: { type: String, default: ''}, // 摘要
      date: { type: String, default: '2021-01-01' },
      author: { type: String, default: 'yy科技' },
      type: { type: String, required: [true,'新闻分类不能为空！'] },
      cover: { type: String, default: '' }, // 文章头图
      tag: [],
      href: { type: String, default: ''}, // 跳转
      description: { type: String, default: 'yy科技是一家很强大的公司。' }, // html description (seo)
      keywords: { type: String, default: '科技,水果,蔬菜,智能系统,供应商'}, // html keywords (seo)

      isTop: { type: Number, default: 0 }, // 是否置顶， 1：置顶
      isRecommend: { type: Number, default: 0 }, // 是否推荐， 1：推荐
      isHot: { type: Number, default: 0 }, // 是否是热门文章， 1：热门

      body: { type: String, default: ''}, // 文章内容

      viewCount: { type: Number, default: 0 }, // 浏览量

      remark: { type: String, default: '' }, // 其他备注

      order: { type: Number, default: 1 }, // 排序
      status: { type: Number, default: 1 }, // 1：启用；0：停用
    }), {
      timestamps: { createdAt: 'createTime', updatedAt: 'modifyTime'},
      collection: "kcoco_page_news",
    }
  )
  return mongoose.model('kcoco_page_news', News);
}

