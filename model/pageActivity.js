module.exports = app => {
  const { mongoose, baseModel } = app;
  const Activity = new mongoose.Schema(
    Object.assign({}, baseModel, {
      status: { type: Number, default: 1 }, // 1：启用；0：停用
      title: { type: String, required: [true,'活动模块标题不能为空！'] },
      desc: { type: String, default: ''}, // 副标题
      key: { type: String, unique: true, required: [ true,'活动模块标题不能为空！'], }, // 关键字key，唯一性校验值
      remark: { type: String, default: 'hot' } // 其他备注
    }), {
      timestamps: { createdAt: 'createTime', updatedAt: 'modifyTime'},
      collection: "kcoco_page_activity",
    }
  )
  return mongoose.model('kcoco_page_activity', Activity);
}

