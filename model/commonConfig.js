module.exports = app => {
  const { mongoose, baseModel } = app;
  const Config = new mongoose.Schema(
    Object.assign({}, baseModel, {
      /**
       * 有些配置值不需要被设计为表，如设计为JSON字符串，格式化之后数据效果其实和数据库表类似
       * 优势：方便扩展，增加字段的时候，不需要去数据库表中添加新的字段，直接替换掉整个JSON串就行；也方便设置缓存（如redis）
       */
      key: { type: String, unique: true, required: [true,'common config key不能为空！']},
      description: { type: String, default: '' }, // 描述
      remark: { type: String, default: '' },
      v1: { type: String }, // 配置值 JSON字符串
      v2: { type: String }, // 数据值
      v3: { type: String }, // 其它...
      v4: { type: Number },
      v5: { type: Array },
      status: { type: Number, default: 1 }, // 1：启用；0：停用
    }), {
      timestamps: { createdAt: 'createTime', updatedAt: 'modifyTime'},
      collection: "kcoco_common_config"
    }
  )
  return mongoose.model('kcoco_common_config', Config);
}
