const path = require('path');
const log4js = require('koa-log4');
const config = require('../config.json')
// 生产环境日志级别自己定义，可保留必要的日志，避免日志太多，占服务器内存
// 生产环境的日志不要放到项目中，统一放到专门的日志目录
// todo: 日志的作用就是定位错误，所以尽可能的多记录信息，方便快速找到出错的地方比如，用【】特殊标记，标准才是规矩，才是不出错的保证
const isPrd = process.env.NODE_ENV === 'production'
const rootPath = isPrd ? config.log.prdRootPath : config.log.rootPath

log4js.configure({
  appenders : {
    common: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log', //生成文件的规则
      filename: path.join(`${rootPath}`, 'common.log'), //生成文件名
      backups: 30,
    },
    error:{
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log', //生成文件的规则
      filename: path.join(`${rootPath}`, 'error.log'), //生成文件名
      backups: 30,
    },
    mongodb: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log', //生成文件的规则
      filename: path.join(`${rootPath}`, 'mongodb.log'), //生成文件名
      backups: 30,
    },
    // 记录短信发送记录，留档
    sms: {
      type: 'file',
      maxLogSize: 10485760, // 10mb,日志文件大小,超过该size则自动创建新的日志文件
      filename: path.join(`${rootPath}`, 'sms.log'), //生成文件名
      backups: 10, // 仅保留最新的30个日志文件
    },
    out: {
      type: 'console'
    },
  },
  categories: {
    default: { appenders: [ 'out' ], level: 'info' },
    common: {
      appenders: ['common'],
      level: isPrd ? 'all' : 'all'
    },
    error:{
      appenders: ['error'],
      level: 'error'
    },
    // 默认关闭生产环境数据库sql日志，流量不大的话，开启也无所谓
    mongodb: {
      appenders: ['mongodb'],
      level: isPrd ? 'off' : 'all'
    },
    sms: {
      appenders: ['sms'],
      level: 'all'
    }
  }
})
const errorLogger = log4js.getLogger('error')
const mongoDBLogger = log4js.getLogger('mongodb')
const commonLogger = log4js.getLogger('common')
const smsLogger = log4js.getLogger('sms')
module.exports = { commonLogger, errorLogger, mongoDBLogger, smsLogger}
