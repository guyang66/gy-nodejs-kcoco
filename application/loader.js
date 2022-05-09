const path = require('path')
const fs = require('fs')
const Router = require('koa-router');
const Session = require("koa-session")
const {errorLogger} = require('../common/log4')

//自动扫指定目录下面的文件并且加载

function getFileStat(path) {
  try {
    fs.statSync(path);
    return true;
  } catch (err) {
    return false;
  }
}

function scanFilesByFolder(dir, cb) {
  let _folder = path.resolve(__dirname, dir);
  if(!getFileStat(_folder)){
    return;
  }
  try {
    const files = fs.readdirSync(_folder);
    files.forEach((file) => {

      // 剔除一些隐藏文件
      if(file.match(/.DS/)){
        return;
      }
      if(file.match(/._v/)){
        return;
      }
      if(file.match(/._/)){
        return;
      }
      // 递归搜索
      let fullPath = path.join(dir, file);
      const stat = fs.statSync(path.join(__dirname,fullPath));
      if(stat.isDirectory()){
        scanFilesByFolder(path.join(dir,file),cb)
      }

      // 只处理js文件
      if(!file.match(/js/)){
        return;
      }

      let filename = file.replace('.js', '');
      let oFileCnt = require(_folder + '/' + filename);
      (typeof oFileCnt === 'function') && cb && cb(filename, oFileCnt);
    })

  } catch (error) {
    errorLogger.error('【application - loader】文件自动加载失败...', error)
    console.log('文件自动加载失败...', error);
  }
}

const initConfig = function () {
  let config = {};
  const projectConfig = require('../config.json')
  // 使用本地的配置文件
  // const projectConfig = require('../config_local.json')
  config = {...config, ...projectConfig};
  return config;
}

const initConstants = function () {
  return require('../common/constants')
}

const initController = function(app){
  let controllers = {};
  scanFilesByFolder('../controller',(filename, controller)=>{
    controllers[filename] = controller(app);
  })
  return controllers;
}

// 初始化路由
const initRouter = function(app){
  const router = new Router();
  require('../routes')({...app, router});
  return router;
}

function initService(app){
  let services = {};
  scanFilesByFolder('../service',(filename, service)=>{
    services[filename] = service(app);
  })
  return services;
}

// 初始化mongodb model
function initMongoDBModel(app){
  let model = {};
  const mongoose = require('mongoose')
  const BaseModel = require('../model/baseModel')
  scanFilesByFolder('../model',(filename, modelConfig)=>{
    model[filename] = modelConfig({...app, mongoose, BaseModel});
  });
  return model
}

// 初始化扩展
function initExtend(app) {
  scanFilesByFolder('../extend',(filename, extendFn)=>{
    app['$' + filename] = Object.assign(app['$' + filename] || {}, extendFn(app))
  })
}

function initMongodb(app) {
  const chalk = require('chalk');
  const { commonLogger, mongoDBLogger,  } = app.$log4
  const localStringify = require('../utils').localStringify
  const mongoose = require('mongoose').set('debug', function (collectionName, method, query, doc) {
    let str = collectionName + '.' + method + '(' + localStringify(query) + ',' + localStringify(doc) + ')'
    // 开启sql log
    mongoDBLogger.info(str)
  });
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
  const config = app.$config
  let dbConfig = config.mongodb.local
  if(process.env.DB_ENV === 'development'){
    dbConfig = config.mongodb.dev
  }
  if(process.env.NODE_ENV === 'production'){
    dbConfig = config.mongodb.prd
  }
  const uri = 'mongodb://' + `${dbConfig.user}` + ':' + `${encodeURIComponent(dbConfig.pass)}` + '@' + `${dbConfig.servername}`  + ':' + `${dbConfig.port}` + '/' + `${dbConfig.database}`
  let url = uri + '?gssapiServiceName=mongodb'
  console.log(url)
  mongoose.connect(url,options,function (){})
  let db = mongoose.connection

  db.on('error', (error)=>{
    commonLogger.error('数据库连接失败！' + error)
    console.log(chalk.red('数据库连接失败！' + error));
  });
  db.once('open', ()=> {
    commonLogger.info("mongoDB connect success");
    console.log(chalk.green('============== mongoDB connect success================='));
  })
  app.$mongoose = mongoose
  app.$db = db
}

// 初始化中间件middleware
function initMiddleware(app){
  let middleware = {}
  scanFilesByFolder('../middleware',(filename, middlewareConf)=>{
    middleware[filename] = middlewareConf(app);
  })
  return middleware;
}

function initLog4(app) {
  return require('../common/log4');
}

function initNodeCache () {
  const NodeCache = require('node-cache')
  return new NodeCache()
}

function initSchedule (app) {
  const schedule = require('node-schedule');
  const { $log4, $helper, $service, $nodeCache } = app
  let scheduleTag = '30 * * * * *' // 每分钟的第30秒执行一次任务函数

  app.$schedule = schedule.scheduleJob(scheduleTag, async ()=>{
    console.log(new Date().toString() + '：执行定时器任务')
    // todo: 这里写入你需要的定时任务逻辑，比如定时插入一些数据，删除一些数据之类的。
  });
}

module.exports = {
  initController,
  initRouter,
  initMiddleware,
  initService,
  initConfig,
  initLog4,
  initNodeCache,
  initExtend,
  initMongoDBModel,
  initMongodb,
  initSchedule,
  initConstants,
}
