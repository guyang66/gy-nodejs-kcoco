const baseModel = require('./baseModel')
module.exports = app => {
  const { mongoose } = app;
  const Tp = new mongoose.Schema(
    Object.assign({}, baseModel, {
      path: { type: String, required: [true, 'path不能为空！'] }, // 访问类型
      pageName: { type: String, default: '' },
      ip: { type: String, default: '' },
      name: {type: String, default: '' },
      phone: { type: String, default: '' },
      time: { type: Number, default: '' }, // 停留时长
      remark: { type: String },
    }), {
      timestamps: { createdAt: 'createTime', updatedAt: 'modifyTime'},
      collection: "kcoco_biz_tp",
    }
  )
  return mongoose.model('kcoco_biz_tp', Tp);
}

