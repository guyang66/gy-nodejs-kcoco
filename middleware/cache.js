module.exports = app => {
  return async function(ctx, next) {
    const { $model, $config } = app
    const { pageTdk } = $model
    const service = app.$service
    const nodeCache = app.$nodeCache
    // todo:
    // 这种小网站其实用不用缓存都可以的，流量大的时候，查询速度慢的数据才进缓存
    // 常用的比如redis，我们这里用nodecache来做，数据量不大，直接进内存。

    if(nodeCache.get('page_tdk_config')){
      // 如果缓存中已经有tdk的配置信息，则跳过
      await next();
      return
    }
    let tdk
    if($config.dataMock){
      tdk = require('../mock/tdk')
    } else {
      tdk = await service.baseService.query(pageTdk)
    }
    let tdkConfig = {}
    tdk.forEach(item => {
      tdkConfig[item.path] = item
    })
    // 网页tdk 缓存
    nodeCache.set('page_tdk_config', tdkConfig , 60 * 60 * 24 * 30)
    await next();
  };
}
