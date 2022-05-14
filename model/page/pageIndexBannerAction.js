const baseModel = require('../baseModel')
module.exports = app => {
  const { mongoose } = app;
  const Action = new mongoose.Schema(
    Object.assign({}, baseModel, {
      key: { type: String, unique: true, required: [true,'action key不能为空！']},
      name: { type: String, default: '' }, // action名称
      remark: { type: String, default: ''  },
      status: { type: Number, default: 1 } // 1：启用；0：停用
    }), {
      timestamps: { createdAt: 'createTime', updatedAt: 'modifyTime'},
      collection: "kcoco_page_index_banner_action",
    }
  )
  return mongoose.model('kcoco_page_index_banner_action', Action);
}

