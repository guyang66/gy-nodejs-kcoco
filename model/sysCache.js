const baseModel = require('./baseModel')
module.exports = app => {
  const { mongoose } = app;
  const Cache = new mongoose.Schema(
    Object.assign({}, baseModel, {
      key: { type: String, unique: true, required: [true, 'key不能为空！'] },
      name: { type: String, required: [true,'缓存名字不能为空！'] },
      status: { type: Number, default: 1 }, // 1：启用；0：停用
      remark: { type: String, default: '' },
    }), {
      timestamps: { createdAt: 'createTime', updatedAt: 'modifyTime'},
      collection: "kcoco_sys_cache",
    }
  )
  return mongoose.model('kcoco_sys_cache', Cache);
}

