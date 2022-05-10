const baseModel = require('../baseModel')
module.exports = app => {
  const { mongoose } = app;
  const Menu = new mongoose.Schema(
    Object.assign({}, baseModel, {
      title: { type: String, required: [true,'菜单名字不能为空！']},
      key: { type: String, unique: true },  // 菜单key
      path: { type: String, unique: true, required: [true,'path不能为空！'] },
      roles: [], //含有的角色
      level: { type: Number, default: 1 }, // 菜单级别，目前分为1、2、3级。1代表顶级菜单
      hasLink: { type: Number, default: 1 }, // 该菜单是否可以跳转（是否有独立页面）
      hasIcon: { type: Number, default: 1}, // 是否显示icon
      iconKey: { type: String, default: ''}, // icon key
      hasChild: { type: Number, default: 0 }, // 默认是没有子菜单
      parentMenu: { type: String }, // 父菜单
      isCommon: { type: Number, default: 0 }, // 是否是公共菜单（1：是所有人都能看到，和权限无关，设置了权限也不会生效；0：否，需要配置权限，有权限的角色可以看）
      order: { type: Number, default: 0 }, // 排序
      status: { type: Number, default: 1 } // 1：启用；0：停用
    }), {
      timestamps: { createdAt: 'createTime', updatedAt: 'modifyTime'},
      collection: "kcoco_admin_menu",
    }
  )
  return mongoose.model('kcoco_admin_menu', Menu);
}

