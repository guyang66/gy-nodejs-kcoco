module.exports = app => {
  return async function(ctx, next) {
    const { $service, $nodeCache, $model } = app
    const { adminUrlPermission } = $model

    // 缓存
    if(!$nodeCache.get('page_url_permission')){
      let urlPermissionList = await $service.baseService.query(adminUrlPermission, { status: 1})
      $nodeCache.set('page_url_permission', urlPermissionList , 60 * 60 * 24 * 30)
    }
    await next();
  };
}
