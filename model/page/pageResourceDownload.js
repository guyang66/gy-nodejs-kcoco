const baseModel = require('../baseModel')
module.exports = app => {
  const { mongoose } = app;
  const Download = new mongoose.Schema(
    Object.assign({}, baseModel, {
      id: { type: Number, required: [true,'id不能为空！'], unique: true},
      title: { type: String, required: [true,'资源下载标题不能为空！'] },
      desc: { type: String, default: ''}, // 副标题
      key: { type: String, required: [ true,'资源栏目key不能为空！'], }, // 资源栏目key
      tag: [], // 标签
      date: { type: String, default: ''}, // 资源上线日期
      download: { type: Number, default: 0 }, // 下载量
      /**
       * 下载方式
       * 1、normal：（通过a标签）浏览器直接下载
       * 2、blank: 在新窗口直接打开资源，用户再手动下载
       * 3、link：跳转到指定链接
       */
      downloadType: { type: String, default: 'normal' },
      size: { type: String, default: ''}, // 资源大小
      type: { type: String, default: ''}, // 资源类型

      href: { type: String, default: ''}, // 跳转链接。可选项：当downloadType = link是的配置项
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

      remark: { type: String, default: '' }, // 其他备注
      status: { type: Number, default: 1 }, // 1：启用；0：停用
      order: { type: Number, default: 1 }, // 排序
    }), {
      timestamps: { createdAt: 'createTime', updatedAt: 'modifyTime'},
      collection: "kcoco_page_resource_download",
    }
  )
  return mongoose.model('kcoco_page_resource_download', Download);
}

