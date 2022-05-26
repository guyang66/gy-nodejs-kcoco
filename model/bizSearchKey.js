const baseModel = require('./baseModel')
module.exports = app => {
  const { mongoose } = app;
  const Key = new mongoose.Schema(
    Object.assign({}, baseModel, {
      type: { type: String, required: [true,'type不能为空！'] }, // 访问类型
      typeString: { type: String, default: '' }, // 访问类型中文（冗余）
      key: { type: String, required: [true,'type不能为空！']  }, // 搜索词
      name: { type: String, default: '' }, // 访问者姓名
      phone: { type: String, default: '' }, // 访问者电话
      ip: { type: String, default: '' }, // 访问者ip
      remark: { type: String, default: '' },
    }), {
      timestamps: { createdAt: 'createTime', updatedAt: 'modifyTime'},
      collection: "kcoco_biz_search_key",
    }
  )
  return mongoose.model('kcoco_biz_search_key', Key);
}

