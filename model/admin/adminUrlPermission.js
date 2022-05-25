const baseModel = require('../baseModel')
module.exports = app => {
  const { mongoose } = app;
  const Permission = new mongoose.Schema(
    Object.assign({}, baseModel, {
      key: { type: String, unique: true, required: [true,'key不能为空！']},
      name: { type: String, default: '' }, // 名称
      roles: [],
      status: { type: Number, default: 1},
      remark: { type: String },
    }), {
      timestamps: { createdAt: 'createTime', updatedAt: 'modifyTime'},
      collection: "kcoco_admin_url_permission",
    }
  )
  return mongoose.model('kcoco_admin_url_permission', Permission);
}

