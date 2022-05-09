## 说明
mock文件夹下面存放的是前端页面的渲染文案数据（由项目ecoco复制过来）
前端页面并非所有的数据都入数据库，只有部分关键需要动态配置的数据入了数据库
如果不需要连接数据库，请设置配置文件config.json->dataMock值为true（此时可忽略数据库连接失败错误）

####  config.json->dataMock = true
此时前端所有页面的数据均从mock本地数据取，此时部分接口功能会异常（如表单提交功能），务必注意。

#### config.json->dataMock = false
此时前端页面的数据部分从数据库取，包括以下部分：
1、首页banner模块、首页banner下面的漂浮模块、首页新闻模块
2、客户案例
3、最新活动
4、资源下载
5、新闻中心、新闻详情
6、加入我们->简历投递模块
7、html的title、description、keywords配置信息
