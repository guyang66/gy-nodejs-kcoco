module.exports = app => {
  return async function(ctx, next) {
    const { $model, $config, $service, $nodeCache } = app
    const { pageTdk, commonConfig, sysCache } = $model
    // todo:
    // 这种小网站其实用不用缓存都可以的，流量大的时候，查询速度慢的数据才进缓存
    // 常用的比如redis，我们这里用nodecache来做，数据量不大，直接进内存。
    // nodecache缓存是做在中间件上的，第一次访问的时候会加载慢点（在准备缓存），之后使用缓存就快了，可以把缓存做到应用一加载就初始化一次。
    if(!$nodeCache.get('page_tdk_config')){
      const tdkCacheConfig = await $service.baseService.queryOne(sysCache, {key: 'page_tdk_config', status: 1})
      // 如果该缓存配置已停用，则永久使用实时查询,不进入tdk缓存逻辑
      if(tdkCacheConfig) {
        // tdk缓存逻辑
        let tdk
        if($config.dataMock){
          tdk = require('../mock/tdk')
        } else {
          tdk = await $service.baseService.query(pageTdk, {status: 1})
        }
        let tdkConfig = {}
        tdk.forEach(item => {
          tdkConfig[item.path] = item
        })
        // 网页tdk 缓存
        $nodeCache.set('page_tdk_config', tdkConfig , 60 * 60 * 24 * 30)
      }
    }

    if(!$nodeCache.get('page_index_news')){
      const indexNewsCacheConfig = await $service.baseService.queryOne(sysCache, {key: 'page_index_news', status: 1})
      if(indexNewsCacheConfig){
        const indexNews = await $service.baseService.queryOne(commonConfig, {key: 'page_index_news'})
        $nodeCache.set('page_index_news', indexNews , 60 * 60 * 24 * 30)
      }
    }

    if(!$nodeCache.get('page_index_banners')){
      const indexBannersCacheConfig = await $service.baseService.queryOne(sysCache, {key: 'page_index_banners', status: 1})
      if(indexBannersCacheConfig){
        const indexBanner = await $service.baseService.queryOne(commonConfig, {key: 'page_index_banners'})
        $nodeCache.set('page_index_banners', indexBanner , 60 * 60 * 24 * 30)
      }
    }

    if(!$nodeCache.get('page_index_columns')){
      const indexColumnsCacheConfig = await $service.baseService.queryOne(sysCache, {key: 'page_index_columns', status: 1})
      if(indexColumnsCacheConfig){
        const indexColumn = await $service.baseService.queryOne(commonConfig, {key: 'page_index_columns'})
        $nodeCache.set('page_index_columns', indexColumn , 60 * 60 * 24 * 30)
      }
    }

    await next();
  };
}
