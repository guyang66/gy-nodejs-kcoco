const baseModel = require('./baseModel')
module.exports = app => {
  const { mongoose } = app;
  const Pv = new mongoose.Schema(
    Object.assign({}, baseModel, {
      path: { type: String, required: [true,'path不能为空！'] }, // 访问类型
      pageName: { type: String, default: '' },
      ip: { type: String, default: '' },
      name: {type: String, default: '' },
      phone: { type: String, default: '' },
      remark: { type: String },
    }), {
      timestamps: { createdAt: 'createTime', updatedAt: 'modifyTime'},
      collection: "kcoco_biz_pv",
    }
  )
  return mongoose.model('kcoco_biz_pv', Pv);
}

