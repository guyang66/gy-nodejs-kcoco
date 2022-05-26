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
   * 单文件上传(上传阿里云oss上)，多文件上传查看对应文档，或者用promise.all封装多个单文件上传，然后执行拿到返回结果即可。
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
   * 上传到服务器上(koa-body + nodejs原生)
   * @returns {Promise<void>}
   */
  async uploadV2 () {
    const { ctx, $config, $helper, $log4 } = app;
    const { errorLogger } = $log4
    let { name, overwrite, dir, type } = ctx.request.body
    /**
     * 是否是富文本编辑器在上传图片
     * 富文本编辑器需要返回其满足的response数据格式，不然会报错，需要和前端沟通好
     * @type {boolean}
     */
    const isWange = (type === 'wange')
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
    // 不监听error事件，createWriteStream一旦异常 会导致程序崩溃
    upStream.on('error',function (err){
      console.log(err)
      errorLogger.error('【commonController】 —— uploadV2 —— createWriteStream：', err)
    })

    try {
      await reader.pipe(upStream);
    } catch (e) {
      console.log(e)
      errorLogger.error('【commonController】 —— uploadV2 —— reader.pipe：', e)
      ctx.body = isWange ? { errno: -1, data: '上传失败！' } : $helper.Result.error('UPLOAD_SYSTEM_ERROR')
      return
    }

    let preUrl = $config.upload.devBaseUrl
    if(process.env.NODE_ENV === 'product'){
      preUrl = $config.upload.prdBaseUrl
    }
    let url = preUrl + path.join('upload', dir, filename)
    ctx.body = isWange ? { errno: 0, data: [url] } : $helper.Result.success(url)
  },

  /**
   * 多文件上传()，这里支持了前端wange富文本编辑器的多图片上传，其他的请自行实现上传逻辑
   * @returns {Promise<void>}
   */
  async multiUpload () {
    const { ctx, $config, $helper, $log4 } = app;
    const { errorLogger } = $log4
    let { name, overwrite, dir, type } = ctx.request.body
    const isWange = (type === 'wange')
    if(!ctx.request.files){
      ctx.body = $helper.Result.error('UPLOAD_NO_FILE_ERROR')
      return
    }

    const singleFile = ctx.request.files[name]
    const uploadRootPath = path.join(__dirname, '../public', $config.upload.rootPath)
    // 处理目录不存在的情况
    await $helper.pathToDir(path.join(uploadRootPath, dir))

    if(!singleFile && Object.keys(ctx.request.files).length >= 2){
      // 这里是多个文件上传
      const wrapPromise = (reader, upStream) => {
        return new Promise(async (resolve, reject)=>{
          try {
            reader.pipe(upStream);
            resolve(true)
          } catch (e){
            reject(e)
          }
        })
      }

      let promiseArray = []
      let resultArray = []
      for(let fileKey in ctx.request.files){
        let file = ctx.request.files[fileKey]
        let filePath = file.path // 文件暂存目录
        let filename = file.name // 文件全名
        let newFilePath = path.join(uploadRootPath, dir, filename); // 文件指定存放目录
        if(overwrite === 'N'){
          // 同步读取
          if(fs.existsSync(newFilePath)){
            ctx.body = $helper.Result.error('UPLOAD_FILE_EXIST_ERROR')
            return
          }
        }

        // 创建多个读写流，然后用promise.all异步执行，用await同步一个一个执行也行，时间开销大
        let reader = fs.createReadStream(filePath);
        reader.on('error',function (err){
          console.log(err)
          errorLogger.error('【commonController】 —— uploadV2 —— createReadStream：', err)
        })
        let upStream = fs.createWriteStream(newFilePath);
        upStream.on('error',function (err){
          console.log(err)
          errorLogger.error('【commonController】 —— uploadV2 —— createWriteStream：', err)
        })
        let p = wrapPromise(reader, upStream)
        promiseArray.push(p)
        let preUrl = $config.upload.devBaseUrl
        if(process.env.NODE_ENV === 'product'){
          preUrl = $config.upload.prdBaseUrl
        }
        let url = preUrl + path.join('upload', dir, filename)
        resultArray.push(url)
      }

      try {
        await Promise.all(promiseArray)
      } catch (e) {
        console.log(e)
        errorLogger.error('【commonController】 —— uploadV2 —— reader.pipe：', e)
        ctx.body = isWange ? { errno: -1, data: '上传失败！' } : $helper.Result.error('UPLOAD_SYSTEM_ERROR')
        return
      }
      ctx.body = isWange ? { errno: 0, data: resultArray } : $helper.Result.success(url)
      return
    }

    // 单文件逻辑
    let filePath = singleFile.path // 文件暂存目录
    let filename = singleFile.name // 文件全名
    let newFilePath = path.join(uploadRootPath, dir, filename); // 文件指定存放目录

    // 判断同名覆盖设置规则
    if(overwrite === 'N'){
      // 同步读取
      if(fs.existsSync(newFilePath)){
        ctx.body = $helper.Result.error('UPLOAD_FILE_EXIST_ERROR')
        return
      }
    }

    let reader2 = fs.createReadStream(filePath); // reader流
    reader2.on('error',function (err){
      console.log(err)
      errorLogger.error('【commonController】 —— uploadV2 —— createReadStream：', err)
    })
    let upStream2 = fs.createWriteStream(newFilePath);
    upStream2.on('error',function (err){
      console.log(err)
      errorLogger.error('【commonController】 —— uploadV2 —— createWriteStream：', err)
    })

    try {
      await reader2.pipe(upStream2);
    } catch (e) {
      console.log(e)
      errorLogger.error('【commonController】 —— uploadV2 —— reader.pipe：', e)
      ctx.body = isWange ? { errno: -1, data: '上传失败！' } : $helper.Result.error('UPLOAD_SYSTEM_ERROR')
      return
    }

    let preUrl = $config.upload.devBaseUrl
    if(process.env.NODE_ENV === 'product'){
      preUrl = $config.upload.prdBaseUrl
    }
    let url = preUrl + path.join('upload', dir, filename)
    ctx.body = isWange ? { errno: 0, data: [url] } : $helper.Result.success(url)
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
  },

  /**
   * 资源下载量+1
   * @returns {Promise<void>}
   */
  async addResourceDownloadCount () {
    const { ctx, $service, $helper,$model } = app;
    const { pageResourceDownload, bizResourceRecord } = $model
    let { id, phone, name } = ctx.query;
    if(!id){
      ctx.body = $helper.Result.fail(-1, '参数缺失（id不存在）！')
      return
    }
    let exist = await $service.baseService.queryOne(pageResourceDownload, {id: id})
    if(!exist){
      ctx.body = $helper.Result.fail(-1, '未查询到相关数据！')
      return
    }
    // 访问者登录之后才能进行下载操作
    let instance = {
      objectId: exist._id,
      type: 'download',
      typeString: '下载',
      name: name || '',
      ip: $helper.getClientIP(ctx),
      phone: phone || 'phone',
    }
    await $service.baseService.save(bizResourceRecord, instance)
    let r = await $service.resourceService.updateResourceCount(exist._id, 1)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '更新失败！')
    }
  },

  /**
   * 记录访问者点击事件
   * @returns {Promise<void>}
   */
  async resourceClickRecord () {
    const { ctx, $service, $helper,$model } = app;
    const { pageResourceDownload, bizResourceRecord } = $model
    let { id, phone, name } = ctx.query;
    if(!id){
      ctx.body = $helper.Result.fail(-1, '参数缺失（id不存在）！')
      return
    }
    let exist = await $service.baseService.queryOne(pageResourceDownload, {id: id})
    if(!exist){
      ctx.body = $helper.Result.fail(-1, '未查询到相关数据！')
      return
    }
    // 访问者登录之后才能进行下载操作
    let instance = {
      objectId: exist._id,
      type: 'click',
      typeString: '点击',
      name: name || '',
      ip: $helper.getClientIP(ctx),
      phone: phone || 'phone',
    }
    let r = await $service.baseService.save(bizResourceRecord, instance)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '记录失败！')
    }
  },

  /**
   * 保存埋点搜索词
   * @returns {Promise<void>}
   */
  async saveSearchKey () {
    const { ctx, $service, $helper,$model } = app;
    const { bizSearchKey } = $model
    let { key, phone, name, type, typeString } = ctx.query;
    if(!type || type === ''){
      ctx.body = $helper.Result.fail(-1, '埋点类型不能为空！')
      return
    }
    if(!key || key === ''){
      ctx.body = $helper.Result.fail(-1, '埋点搜索关键词不能为空！')
      return
    }
    let instance = {
      type: type,
      typeString: typeString,
      key: key,
      name: name || '',
      ip: $helper.getClientIP(ctx),
      phone: phone || 'phone',
    }
    let r = await $service.baseService.save(bizSearchKey, instance)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, '保存失败！')
    }
  }

})
