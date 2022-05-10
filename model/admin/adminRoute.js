const baseModel = require('../baseModel')
module.exports = app => {
  const { mongoose } = app;
  const Route = new mongoose.Schema(
    Object.assign({}, baseModel, {
      key: { type: String, unique: true, required: [true,'key不能为空！'] },
      path: { type: String, unique: true, required: [true,'path不能为空！'] },
      name: { type: String, default:'' },
      roles: [], // 权限角色
      exact: { type: Boolean, default: true }, // 是否在前端路由精确匹配（react-router使用参数）
      backUrl: { type: String, default: '/403' }, // 回退url，默认回到403页面，可配置。
      status: { type: Number, default: 1 } // 1：启用；0：停用
    }), {
      timestamps: { createdAt: 'createTime', updatedAt: 'modifyTime'},
      collection: "kcoco_admin_route",
    }
  )
  return mongoose.model('kcoco_admin_route', Route);
}

