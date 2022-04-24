## 项目介绍
本项目内容为常见企业官网展示，由另一个项目演变而来，从纯静态页面转变为ssr（服务端渲染），更利于seo
包含常见的接口

借鉴了github上一些好的项目，尤其是quick-h5

## 项目架构

前端部分：
```
ejs + stylus + gulp + jquery
```
后端部分：
```
koa + mongodb
```

## 注意实现

### 本地 先安装mongodb，并执行/sql目录下的sql（非必须，部分测试接口的数据）
npm run start

### dev 不用本地安装mongodb，使用服务器上已安装的数据库（已执行sql）
npm run start1

### 生产环境 安装nodejs（>15.0）和pm2 (以守护进程启动nodejs)
npm run prd


