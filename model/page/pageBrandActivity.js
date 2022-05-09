const baseModel = require('../baseModel')
module.exports = app => {
  const { mongoose } = app;
  const Activity = new mongoose.Schema(
    Object.assign({}, baseModel, {
      title: { type: String, required: [true,'活动标题不能为空！'] },
      desc: { type: String, default: ''}, // 描述
      btnText: { type: String, default: '点击查看' }, // 按钮名字
      cover: { type: String, default: ''}, // 封面
      remark: { type: String, default: 'hot' }, // 其他备注

      href: { type: String, default: ''}, // 活动详情
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

      order: { type: Number, default: 1 }, // 排序
      status: { type: Number, default: 1 }, // 1：启用；0：停用
    }), {
      timestamps: { createdAt: 'createTime', updatedAt: 'modifyTime'},
      collection: "kcoco_page_brand_activity",
    }
  )
  return mongoose.model('kcoco_page_brand_activity', Activity);
}

