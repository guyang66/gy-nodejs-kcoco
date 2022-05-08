/**
 * 封装koa, mvc框架。 后面可扩展, 一个应用程序可以绑定多个koa实例
 */

const path = require('path')
const Koa = require('koa')
const chalk = require('chalk')

const {
  initConfig,
  initController,
  initRouter,
  initService,
  initLog4,
  initExtend,
  initMiddleware,
  initConstants,
  initNodeCache,
  initMongodb,
  initMysql,
  initMongoDBModel,
} = require('./loader')

class Application {
  constructor() {
    this.$app = new Koa();

    // 初始化config
    this.$config = initConfig(this);

    // 初始化静态变量
    this.$constants = initConstants()

    // 缓存对象挂到app上
    this.$nodeCache = initNodeCache(this);

    // 挂载中间件实例
    this.$middleware = initMiddleware(this);
    console.log("========= middleware ==========")
    // console.log(this.$middleware)

    // 初始化最开始需要被加载的中间件
    this.beforeAll(this)

    // 初始化通用设置
    this.initSettings(this)

    //初始化中间件
    this.initDefaultMiddleware()

    // 初始化日志系统
    this.$log4 = initLog4(this)

    // 初始化model
    this.$model = initMongoDBModel(this);
    console.log("========= models ==========")
    console.log(this.$model)

    // 初始化数据库
    initMongodb(this);

    // 初始化mysql
    // initMysql(this)

    // 初始化extend类
    initExtend(this)
    console.log("========= extends-helper ==========")
    // console.log(this.$helper)


    // 初始化service
    this.$service = initService(this);
    console.log("========= service ==========")
    // console.log(this.$service)

    // 初始化controller
    this.$controller = initController(this);

    console.log("========= controllers ==========")
    // console.log(this.$controller)

    // 初始化路router
    this.$router = initRouter(this);

    // 初始化oss clinet

    // 将ctx挂到到app上
    this.$app.use(async (ctx, next) => {
      this.ctx = ctx;
      await next()
    })

    // 路由处理
    this.$app.use(this.$router.routes());

    // 全局异常捕获
    process.on('uncaughtException',function (err){
      console.log('uncaughtException:' + err)
    })

    this.afterAll(this)
  }

  initSettings (app) {
    // 重写console 生产环境控制台不输出信息
    console.log = (function (ori){
      return function (){
        if(process.env.NODE_ENV !== 'production'){
          ori.apply(this,arguments)
        }
      }
    })(console.log);
  }

  /**
   * 初始化koa常用中间件
   */
  initDefaultMiddleware () {
    const json = require('koa-json');
    const onerror = require('koa-onerror');
    const koaStatic = require('koa-static');
    const koaBody = require('koa-body');
    const cors = require('koa2-cors');
    const views = require('koa-views');

    // 日志打点 最顶层中间件
    if(process.env.NODE_ENV === 'development'){
      // this.$app.use(logger())
    }

    // 静态资源 - 1天的缓存
    let opts = process.env.NODE_ENV === 'production' ? { maxage: 24 * 60 * 60  * 1000} : {}
    this.$app.use(koaStatic(path.resolve(__dirname, '../public'), opts))

    // body接口数据处理(用koa-body 替代koa-bodyparser和koa-multer，前者处理post的参数为json格式，后者为文件上传相关)
    this.$app.use(koaBody({
      multipart: true,
      // encoding: 'gzip',
      formidable: {
        maxFileSize: 3000 * 1024 * 1024    // 设置上传文件大小最大限制，默认30M
      }
    }));

    // 跨域处理
    this.$app.use(cors());

    // json格式化response数据
    this.$app.use(json())

    // error处理
    onerror(this.$app)

    // ejs模板引擎
    this.$app.use(views(path.resolve(__dirname, '../views'), {
      extension: 'ejs',
      async: true
    }))

    // 公共数据
    const menus = require('../mock/menu/index.js')
    const footerData = require('../mock/menu/footer.js')
    this.$app.use(async (ctx,next)=>{
      let tdk = this.$helper.getTdkByPath(ctx.path, true)
      // todo:
      // 公共数据的优先级大于模板引擎参数，如果在pageController中给template页传入tdk，则会被这里的公共tdk所覆盖
      // 特殊页面，如新闻页面的tdk还需要额外去处理，所以需要区别开来两个参数(template参数用pageTdk)
      ctx.state = {
        menus: menus,
        footerData: footerData,
        tdk: tdk
      }
      await next();
    });
  }

  /**
   * 初始化需要最开始加载的自定义中间件
   * @param app
   */
  beforeAll (app){
    // 初始化page config
    app.$app.use(app.$middleware.cache)
  }

  /**
   * 初始化需要最后加载的自定义中间件
   * @param app
   */
  afterAll (app) {
    // 在这里初始化定时任务
  }

  /**
   * 应用start
   * @param port
   */
  start(port){
    let server = this.$app.listen(port, ()=>{
      console.log(chalk.green('server start on ' + port + '..........'))
    });
    // server.timeout = 1000 * 60 * 5
  }

}

module.exports = Application
