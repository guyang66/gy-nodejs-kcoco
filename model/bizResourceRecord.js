const baseModel = require('./baseModel')
module.exports = app => {
  const { mongoose } = app;
  const Record = new mongoose.Schema(
    Object.assign({}, baseModel, {
      type: { type: String, default: '' }, // 访问类型
      typeString: { type: String, default: '' }, // 访问类型中文（冗余）
      name: { type: String, default: '' }, // 访问者姓名（如果cookie中存在）
      ip: { type: String, default: '' }, // 访问者ip
      phone: { type: String, default: '' }, // 访问者电话（如果cookie中存在）
      objectId: { type: mongoose.Schema.Types.ObjectId, ref: 'kcoco_page_resource_download' }, // 外键
      remark: { type: String, default: '' },
    }), {
      timestamps: { createdAt: 'createTime', updatedAt: 'modifyTime'},
      collection: "kcoco_biz_resource_record",
    }
  )
  return mongoose.model('kcoco_biz_resource_record', Record);
}

