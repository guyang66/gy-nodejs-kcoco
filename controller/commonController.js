const path = require('path')
const fs=require('fs')
const chalk = require('chalk');
module.exports = app => ({

  async test () {
    const { ctx, $helper } = app
    ctx.body = $helper.Result.success('')
  },

  /**
   * 获取验证码
   * @returns {Promise<void>}
   */
  async getCaptcha () {
    const { ctx, $config, $helper } = app;
    const svgCaptcha = require('svg-captcha')
    const cap = svgCaptcha.create({
      size: $config.captcha.size, // 验证码长度
      width: $config.captcha.width,
      height: $config.captcha.height,
      fontSize: $config.captcha.fontSize,
      ignoreChars: $config.captcha.ignoreChars, // 验证码字符中排除 0o1i
      noise: $config.captcha.noise, // 干扰线条的数量
      color: $config.captcha.color, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
      background: $config.captcha.background // 验证码图片背景颜色
    })
    ctx.response.type = 'image/svg+xml'
    ctx.session.captcha = cap.text.toLowerCase()
    ctx.body = $helper.Result.success(cap.data)
  },

  /**
   * 单文件上传(上传阿里云oss上)
   * 如果有nginx反向代理，注意nginx可能拦截大资源文件，注意放开nginx的请求实体大小
   * 如果有自己的文件服务器，就上传到自己的文件服务器即可。
   * @returns {Promise<void>}
   */
  async upload () {
    const { ctx, $oss, $config, $helper, $log4 } = app;
    const { errorLogger } = $log4
    /**
     * @name 客户端自定义上传文件名
     * @override 是否同名覆盖  Y：开启（同名文件上传时oss客户端会报错）；N：关闭；
     * @dir 客户端自定义上传上传目录
     */
    let { name, overwrite, dir } = ctx.request.body
    if(!ctx.request.files){
      ctx.body = $helper.Result.error('UPLOAD_NO_FILE_ERROR')
      return
    }
    if(!name || !ctx.request.files[name]){
      ctx.body = $helper.Result.error('UPLOAD_FILE_NAME_EMPTY_ERROR')
      return
    }

    if(!dir){
      dir = ''
    }
    const filepath = ctx.request.files[name].path
    const filename = ctx.request.files[name].name
    const putHeader = {}
    if(overwrite && overwrite === 'Y'){
      // 是否开启禁止同名覆盖，默认关闭
      putHeader.headers = { 'x-oss-forbid-overwrite': true }
    }

    // 区分开生产环境和测试缓存的图片路径
    let ossRootPath = $config.oss.rootDir
    if(process.env.NODE_ENV === 'production'){
      ossRootPath = $config.oss.prdRootDir
    }
    // 直接用oss 客户端直传到指定目录
    try {
      // 允许客户端自定义上传路径。
      // 客户端看到的上传进度只是上传到这个服务的时间进度，但是上传到oss上还需要时间，客户端是不知道的
      // 也就是说当客户端看到上传进度达到100%的时候，还要等待（文件越大上传到oss时间越长）一段时间请求才算完成。
      const result = await $oss.put(path.join(ossRootPath, dir, filename), path.normalize(filepath), putHeader);
      ctx.body = $helper.Result.success(result && result.url)
    } catch(err) {
      console.log(chalk.red(err))
      errorLogger.error('【commonController】—— upload：' + err)
      ctx.body = $helper.Result.fail(err.status, err && err.name)
    }
  },

  /**
   * 多文件上传
   * @returns {Promise<void>}
   */
  async multiUpload () {

  },

  /**
   * 上传到服务器上(koa-body + nodejs原生)
   * @returns {Promise<void>}
   */
  async uploadV2 () {
    const { ctx, $config, $helper, $log4 } = app;
    const { errorLogger } = $log4
    let { name, overwrite, dir } = ctx.request.body

    // 上传文件格式：form-data，一般element-ui和antd的upload组件都写好的格式
    // 步骤
    // 1.从上传请求的files中获取需要上传的file
    // 2.使用fs.createReadStream从文件临时缓存目录（比如/var/folders/...）创建一个读取流
    // 3.使用fs.createWriteStream将读取的内容写入指定目录即可（一般指向我们的静态资目录，当服务启动的时候，就可以访问这个资源了）
    // 4.关闭流，完成

    // 使用koa-body中间件files才会挂到ctx.request上
    if(!ctx.request.files){
      ctx.body = $helper.Result.error('UPLOAD_NO_FILE_ERROR')
      return
    }

    // todo: 自定义文件目录和名字，以及写入目录不存在时需要创建
    // 注意：服务器目录权限，可能会发生没有写入权限的问题
    // 注意：关注一下暂存目录的文件会不会定时被清理，如果没有是否需要手动清理？不然随着上传，服务器磁盘内存会被一点点吃掉
    const file = ctx.request.files[name]
    const filePath = file.path // 文件暂存目录
    const filename = file.name // 文件全名
    const uploadRootPath = path.join(__dirname, '../public', $config.upload.rootPath)
    const newFilePath = path.join(uploadRootPath, dir, filename); // 文件指定存放目录
    const prefix = file.name.split('.')[1]; // 文件后缀

    // 判断同名覆盖设置规则
    if(overwrite === 'N'){
      // 同步读取
      if(fs.existsSync(newFilePath)){
        ctx.body = $helper.Result.error('UPLOAD_FILE_EXIST_ERROR')
        return
      }
    }

    // 处理目录不存在的情况
    await $helper.pathToDir(path.join(uploadRootPath, dir))

    const reader = fs.createReadStream(filePath); // reader流
    reader.on('error',function (err){
      console.log(err)
      errorLogger.error('【commonController】 —— uploadV2 —— createReadStream：', err)
    })
    const upStream = fs.createWriteStream(newFilePath);

    // createWriteStream不抛出异常，它传递一个错误的异步回调，所以用try catch包裹是无法捕获异常的
    // 不监听error 时间，createWriteStream一旦异常 会导致程序崩溃
    upStream.on('error',function (err){
      console.log(err)
      errorLogger.error('【commonController】 —— uploadV2 —— createWriteStream：', err)
    })

    await reader.pipe(upStream);

    let preUrl = $config.upload.devBaseUrl
    if(process.env.NODE_ENV === 'product'){
      preUrl = $config.upload.prdBaseUrl
    }
    let url = path.join('upload', dir, filename)
    ctx.body = $helper.Result.success(preUrl + url)
  },

  /**
   * 使用multer中间件来上传文件
   * @returns {Promise<void>}
   */
  async uploadV3 () {
    const { ctx, $helper, $config } = app;
    let file = ctx.req.file
    let preUrl = $config.upload.devBaseUrl
    if(process.env.NODE_ENV === 'product'){
      preUrl = $config.upload.prdBaseUrl
    }
    if(file){
      let url = path.join($config.upload.multerPath, file.originalname)
      ctx.body = $helper.Result.success(preUrl + url)
    } else {
      // koa-body中间件替代koa-bodyparser和koa-multer，所以koa-body和koa-multer、@koa/multer、multer、busboy等都有冲突
      // 使用multer上传文件
      // 方法1：注释掉application中对koa-body的初始化
      // 方法2: config.json设置bodyParse为false，重启应用
      console.log(chalk.red('ctx.req.file不存在，如果使用milter上传文件，需要取消koa-body中间使用！'))
      ctx.body = $helper.Result.fail(-3, '上传失败！')
    }
  }

})
