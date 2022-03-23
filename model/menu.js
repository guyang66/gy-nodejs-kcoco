module.exports = app => {
  const { mongoose, baseModel } = app;
  const Menus = new mongoose.Schema(
    Object.assign({}, baseModel, {
      title: { type: String, required: [true,'title不能为空！']},
      key: { type: String, unique: true }, // 唯一键
      path: { type: String, unique: true, required: [true,'path不能为空！'] },
      roles: [], // 含有的角色
      level: { type: Number, default: 1 }, // 菜单等级
      hasLink: { type: Number, default: 1 }, // 该菜单是否可以跳转
      hasChild: { type: Number, default: 0 }, // 默认是没有子菜单
      parentMenu: { type: String }, // 父菜单
      order: { type: Number, default: 0 }, // 排序
      status: { type: Number, default: 1 } // 1：启用；0：停用
    }), {timestamps: {createdAt: 'createTime', updatedAt: 'modifyTime'}}
  )
  // 映射
  return mongoose.model('kcoco_biz_admin_menu', Menus);
}

