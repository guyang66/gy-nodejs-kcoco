const baseModel = require('./baseModel')
module.exports = app => {
  const { mongoose } = app;
  const Visit = new mongoose.Schema(
    Object.assign({}, baseModel, {
      phone: { type: String, default: '' }, // 手机号
      email: { type: String, default: '' }, // 邮箱
      action: { type: String, required: [true, 'action不能为空！'] }, // 来源动作
      type: { type: String, default: '' }, // user 来源类型 client: 客户端（前端）; admin：操作后台
      ip: { type: String, default: '' },
      count: { type: Number, default: 0 }, // 访问次数
      dateTag: { type: String, default: ''  },
      lastSendTime: { type: Date, default: new Date() }, // 暂时不用modifyTime来做，怕其他逻辑影响到
      remark: { type: String, default: ''   },
    }), {
      timestamps: { createdAt: 'createTime', updatedAt: 'modifyTime'},
      collection: "kcoco_user_visit",
    }
  )
  return mongoose.model('kcoco_user_visit', Visit);
}

