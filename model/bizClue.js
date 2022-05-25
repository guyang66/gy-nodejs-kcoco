const baseModel = require('./baseModel')
module.exports = app => {
  const { mongoose } = app;
  const Code = new mongoose.Schema(
    Object.assign({}, baseModel, {
      company: { type: String,  default: ''},
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      name: { type: String, default: '' },
      position: { type: String, default: '' },
      ip: { type: String, default: '' },
      need: { type: String, default: '' }, // 需求
      origin: { type: String, default: '官网' }, // 线索来源
      originHref: { type: String, default: '' }, // 线索来源url（埋点）
      type: { type: String, default: '' }, // 线索来源动作（埋点）
      date: { type: String, default: '' }, // 时间戳
      remark: { type: String, default: '' },
    }), {
      timestamps: { createdAt: 'createTime', updatedAt: 'modifyTime'},
      collection: "kcoco_biz_clue",
    }
  )
  return mongoose.model('kcoco_biz_clue', Code);
}

