const path = require('path');
const log4js = require('koa-log4');
const config = require('../config.json')
// 生产环境日志级别自己定义，可保留必要的日志，避免日志太多，占服务器内存
const isPrd = process.env.NODE_ENV === 'production'
log4js.configure({
  appenders : {
    error:{
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log', //生成文件的规则
      filename: path.join(`${config.log.root}`, 'error.log'), //生成文件名
      backups: 30,
    },
    mongodb: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log', //生成文件的规则
      filename: path.join(`${config.log.root}`, 'mongodb.log'), //生成文件名
      backups: 30,
    },
    common: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log', //生成文件的规则
      filename: path.join(`${config.log.root}`, 'common.log'), //生成文件名
      backups: 30,
    },
    out: {
      type: 'console'
    },
  },
  categories: {
    default: { appenders: [ 'out' ], level: 'info' },
    error:{
      appenders: ['error'],
      level: 'error'
    },
    mongodb: {
      appenders: ['mongodb'],
      level: 'all'
    },
    common: {
      appenders: ['common'],
      level: isPrd ? 'off' : 'all'
    },
  }
})
const errorLogger = log4js.getLogger('error')
const mongoDBLogger = log4js.getLogger('mongodb')
const logger = log4js.getLogger('common')
module.exports = {logger, errorLogger, mongoDBLogger}
