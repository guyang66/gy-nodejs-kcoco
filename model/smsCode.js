const baseModel = require('./baseModel')
module.exports = app => {
  const { mongoose } = app;
  const Code = new mongoose.Schema(
    Object.assign({}, baseModel, {
      phone: { type: String, required: [true, '手机号码不能为空！'] },
      code: { type: String, required: [true, 'code不能为空！'] },
      used: { type: Boolean, default: false },
      remark: { type: String, default: '' },
    }), {
      timestamps: { createdAt: 'createTime', updatedAt: 'modifyTime'},
      collection: "kcoco_sms_code",
    }
  )
  return mongoose.model('kcoco_sms_code', Code);
}

