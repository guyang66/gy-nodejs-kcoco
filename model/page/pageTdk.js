const baseModel = require('../baseModel')
module.exports = app => {
  const { mongoose } = app;
  const Tdk = new mongoose.Schema(
    Object.assign({}, baseModel, {
      key: { type: String, default: '' },
      path: { type: String, unique: true, required: [true,'页面路径不能为空！'] },
      name: { type: String, default: 'default' }, // 页面名称
      title: { type: String, default: 'yy科技——10000万家供应商的信赖选择' },
      description: {type: String, default: 'yy科技是一家很强大的公司。' },
      keywords: { type: String, default: '科技,水果,蔬菜,智能系统,供应商' },
      remark: { type: String },
    }), {
      timestamps: { createdAt: 'createTime', updatedAt: 'modifyTime'},
      collection: "kcoco_page_tdk",
    }
  )
  return mongoose.model('kcoco_page_tdk', Tdk);
}

