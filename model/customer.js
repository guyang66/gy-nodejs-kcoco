const baseModel = require('./baseModel')
module.exports = app => {
  const { mongoose } = app;
  const Clue = new mongoose.Schema(
    Object.assign({}, baseModel, {
      // 姓名 单行文本
      name: { type: String, required: [true, '姓名不能为空！'] },
      // 公司 单行文本
      company: { type: String, required: [true, '公司不能为空！'] },

    }), {timestamps: {createdAt: 'create_time', updatedAt: 'last_modified_time'}}
  )
  return mongoose.model('kcoco_biz_customer', Clue);
}

