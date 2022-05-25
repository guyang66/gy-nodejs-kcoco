const baseModel = require('../baseModel')
module.exports = app => {
  const { mongoose } = app;
  const User = new mongoose.Schema(
    Object.assign({}, baseModel, {
      username: { type: String, unique: true, required: [true,'username不能为空'] },
      password: { type: String, required: [true,'password不能为空'] },
      name: { type: String, default: '' }, // 昵称
      email: { type: String, default: '' }, // 邮箱
      phone: { type: String, default: '' }, // 手机
      avatar: { type: String, default: '' }, // 头像
      position: { type: String }, // 职位
      department: { type: String }, // 部门
      roles: { type: Array }, // 拥有的角色列表
      action: { type: Array }, // 拥有的动作列表

      defaultRoleName: { type: String }, // 冗余一个rolename 字段
      defaultRole: { type: String }, // 默认角色（即首次登录之后的默认角色，以后系统有切换角色功能时可用）

      jobNumber: { type: Number }, // 工号

      remark: { type: String },
      noModify: { type: Number, default: 0 }, // 不可修改，避免用户全部修改之后无法登录系统...
      status: { type: Number, default: 1 }, // 1：启用；0：停用
    }), {
      timestamps: { createdAt: 'createTime', updatedAt: 'modifyTime'},
      collection: "kcoco_admin_user",
    }
  )
  return mongoose.model('kcoco_admin_user', User);
}

