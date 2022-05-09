const baseModel = require('../baseModel')
module.exports = app => {
  const { mongoose } = app;
  const Tag = new mongoose.Schema(
    Object.assign({}, baseModel, {
      status: { type: Number, default: 1 }, // 1：启用；0：停用
      name: { type: String, required: [true, 'tag 名字不能为空！'] },
      desc: { type: String, default: ''}, // 副标题
      mainKey: { type: String, required: [ true, '主 key不能为空！']}, // 主key
      secKey: { type: String, required: [ true,'副 key不能为空！'] }, // 副key
      remark: { type: String, default: '' } // 其他备注
    }), {
      timestamps: { createdAt: 'createTime', updatedAt: 'modifyTime'},
      collection: "kcoco_page_common_tag",
    }
  )
  return mongoose.model('kcoco_page_common_tag', Tag);
}

