module.exports = app => {
  const { mongoose, baseModel } = app;
  const Category = new mongoose.Schema(
    Object.assign({}, baseModel, {
      status: { type: Number, default: 1 }, // 1：启用；0：停用
      name: { type: String, required: [true, '新闻分类标题不能为空！'] },
      desc: { type: String, default: ''}, // 副标题
      key: { type: String, unique: true, required: [ true,'新闻分类key不能为空！']}, // 关键字key，唯一性校验值
      order: { type: Number, default: 1 }, // 排序
      remark: { type: String, default: '' } // 其他备注
    }), {
      timestamps: { createdAt: 'createTime', updatedAt: 'modifyTime'},
      collection: "kcoco_page_news_category",
    }
  )
  return mongoose.model('kcoco_page_news_category', Category);
}

