const baseModel = require('../baseModel')
module.exports = app => {
  const { mongoose } = app;
  const Column = new mongoose.Schema(
    Object.assign({}, baseModel, {
      id: { type: Number, required: [true,'id不能为空！'], unique: true},
      title: { type: String, required: [true,'资源栏目标题不能为空！'] },
      desc: { type: String, default: ''}, // 副标题
      key: { type: String, unique: true, required: [ true,'资源栏目key不能为空！'], }, // 关键字key，唯一性校验值
      remark: { type: String, default: '' }, // 其他备注
      tag: [], // 标签
      cover: { type: String, default: ''}, // 封面
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

      status: { type: Number, default: 1 }, // 1：启用；0：停用
      order: { type: Number, default: 1 }, // 排序
    }), {
      timestamps: { createdAt: 'createTime', updatedAt: 'modifyTime'},
      collection: "kcoco_page_resource_column",
    }
  )
  return mongoose.model('kcoco_page_resource_column', Column);
}

