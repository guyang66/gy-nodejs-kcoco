const baseModel = require('./baseModel')
module.exports = app => {
  const { mongoose } = app;
  const Resume = new mongoose.Schema(
    Object.assign({}, baseModel, {
      status: { type: Number, default: 1 }, // 1：启用；0：停用
      name: { type: String, required: [true, '简历类型标题不能为空！'] },
      desc: { type: String, default: ''}, // 副标题
      key: { type: String, unique: true, required: [ true,'简历类型key不能为空！'], }, // 关键字key，唯一性校验值
      remark: { type: String, default: '' } // 其他备注
    }), {
      timestamps: { createdAt: 'createTime', updatedAt: 'modifyTime'},
      collection: "kcoco_page_resume",
    }
  )
  return mongoose.model('kcoco_page_resume', Resume);
}

