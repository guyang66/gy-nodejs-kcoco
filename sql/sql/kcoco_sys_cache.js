db.kcoco_sys_cache.insertMany([
{
    key: 'page_tdk_config',
    name: '官网tdk缓存',
    status: 1,
    createTime: new Date(),
    modifyTime: new Date(),
},
{
    key: 'page_url_permission',
    name: 'url权限缓存',
    status: 1,
    createTime: new Date(),
    modifyTime: new Date(),
},
{
    key: 'page_index_news',
    name: '首页新闻缓存',
    status: 0,
    createTime: new Date(),
    modifyTime: new Date(),
},
{
    key: 'page_index_banners',
    name: '首页banner缓存',
    status: 1,
    createTime: new Date(),
    modifyTime: new Date(),
},
{
    key: 'page_index_columns',
    name: '首页column缓存',
    status: 0,
    createTime: new Date(),
    modifyTime: new Date(),
}
])