const baseModel = require('../baseModel')
module.exports = app => {
  const { mongoose } = app;
  const Detail = new mongoose.Schema(
    Object.assign({}, baseModel, {
      /**
       * id —— 伪id, （如果有简历详情可能用id比较舒服）
       * 这里的id不是数据库id，mongodb自带的是_id，且_id是一个hash值，乱踏踏的，非自增，所以不好阅读
       * 用id来模仿mysql这样的数据库自增id，也方便数据查询和肉眼检验啥的。
       */
      id: { type: Number, required: [true,'id不能为空！'], unique: true},

      title: { type: String, required: [true,'岗位名字不能为空！']}, // 岗位名称
      desc: { type: String, default: '' }, // 岗位描述
      category: { type: String, required: [true,'所属类别不能为空！'] },
      department: { type: String, default: '' }, // 部门
      place: { type: String, required: [true,'所属地区不能为空！'] },
      date: { type: String, default: '' }, // 日期
      experience: { type: String, default: '' }, // 经验
      education: { type: String, default: '' }, // 学历
      href: { type: String, default: 'https://www.zhipin.com' }, // 跳转链接
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
      tag: [], // 标签
      duty: [], // 岗位职责
      require: [], //岗位要求
      pluses: [], // 加分项
      contact: { type: String, default: 'xxx@hr.com' }, // 联系方式

      remark: { type: String, default: '' }, // 其他备注

      order: { type: Number, default: 1 }, // 排序
      status: { type: Number, default: 1 }, // 1：启用；0：停用
    }), {
      timestamps: { createdAt: 'createTime', updatedAt: 'modifyTime'},
      collection: "kcoco_page_resume_detail",
    }
  )
  return mongoose.model('kcoco_page_resume_detail', Detail);
}

