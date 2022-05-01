module.exports = app => {
  const { mongoose, baseModel } = app;
  const Case = new mongoose.Schema(
    Object.assign({}, baseModel, {
      /**
       * id —— 伪id
       * 这里的id不是数据库id，mongodb自带的是_id，且_id是一个hash值，乱踏踏的，非自增，所以不好阅读
       * 用id来模仿mysql这样的数据库自增id，也方便数据查询和肉眼检验啥的。
       */
      id: { type: Number, required: [true,'id不能为空！'], unique: true},
      title: { type: String, required: [true,'案例标题不能为空！'] },
      desc: { type: String, default: ''}, // 副标题
      key: [],                            // 关键词，可以被检索到的关键字，
      icon: { type: String, default: ''}, // 案例logo
      href: { type: String, default: ''}, // 跳转
      /**
       * nofollow —— a标签的ref属性
       * ture：为a标签添加 ref=nofollow属性，告诉搜索引擎不必跟踪该链接，seo优化，一般站外链接使用。
       * false：（什么也不用做）
       */
      nofollow: { type: Boolean, default: false },
      /**
       * target —— a标签target属性，为a标签添加target = {target} 属性
       * _blank：内容在新页面显示，一般打开非站内链接或者特定场景使用
       * _top、_parent...
       */
      target: { type: String, default: null },

      remark: { type: String, default: 'hot' }, // 其他备注
      status: { type: Number, default: 1 }, // 1：启用；0：停用
      order: { type: Number, default: 1 }, // 排序
    }), {
      timestamps: { createdAt: 'createTime', updatedAt: 'modifyTime'},
      collection: "kcoco_page_case",
    }
  )
  return mongoose.model('kcoco_page_case', Case);
}

