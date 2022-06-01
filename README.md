### 项目介绍
本项目内容为常见企业官网展示，由我自己的另一个项目ecoco（https://github.com/guyang66/gy-ejs-ecoco ）重构而来，ecoco项目是webpack+ejs+stylus+jquery
架构的传统官网项目，为纯静态渲染，完成度在90%，感兴趣的朋友可以自行查看学习。

因为ecoco项目是纯静态页面，不利于seo，同时一些调用后端接口的地方并未实现（当时没有后端可提供使用），故而萌发了用nodejs发开一个简单的后台应用，既能提供api接口，又能做到服务端渲染。
ecoco项目使用的是ejs，而ejs模板引擎是有客户端和服务端之分的，好在差异很小，在重构的时候修改的地方不多。最大的问题在于css的处理，ecoco项目使用的是stylus，最初的想法是把ecoco
打包好的所有css拷贝到这个项目来使用，但是发现维护这些原生css其实蛮头疼的。于是我想到了加入webpack，但是webpack太沉重，加入的话又几乎成了第二个ecoco项目，而且webpack的入口文件是js
（我并不想为每个页面再写一个入口js文件，我要做的只有一件事，就是如何把原来的stylus转化为css，能嵌入到html中使用），而我需要处理的只有stylus文件，最终把目光放到了轻量的gulp上面，
基本能满足需求，然后重构也基本是时间问题了。

在开发的时候也看了git上面很多开源项目，借鉴了github上一些优秀的nodejs项目，尤其是quick-h5（https://github.com/huangwei9527/quark-h5）

####架构方面：
前端部分：
```
ejs + stylus + gulp + jquery
```
后端部分：
```
koa + mongodb
```

### 官网（前端）效果预览
首页：
![官网](index.gif)
产品页：
![官网](product.gif)

### 项目结构
```
├─ application                       应用实例封装
    ├─ index.js                      应用初始化模块
    ├─ loader.js                     应用加载模块
├─ common                            公共模块
    ├─ constants.js                  常量枚举
    ├─ erroCode.js                   （应用）错误枚举
    ├─ log4.js                       日志配置文件 
├─ controller                           
    ├─ admin                         （rcoco）管理后台相关控制器 
    ├─ ...                           其他控制器   
├─ extend                            扩展模块
    ├─ format.js                     格式化相关 
    ├─ helper.js                     辅助相关 
    ├─ utils                         其他工具方法 
├─ middleware                        中间件
    ├─ auth.js                       鉴权中间件 
    ├─ cache.js                      缓存中间件      
    ├─ multer.js                     multer上传中间件 
    ├─ redirect.js                   404重定向中间件
    ├─ urlPermission.js              url权限中间件（逻辑写在auth中间件中了）  
├─ mock                              官网归档内容（文案数据）
    ...                                 
    ├─ tdk.js                        html tdk 设置     
├─ model                             mongodb数据库model
    ├─ admin                         （rcoco）管理后台相关model
    ├─ page                          官网页面相关model
    ├─ ...
├─ public                            静态资源目录 
    ├─ common                        第三方jqeury插件
    ├─ css                           gulp转化stylus后的css文件
    ├─ fakeCdn                       给管理后台（rcooc）模拟的cdn，存放的外部资源包
    ├─ images                        官网图片资源
    ├─ js                            官网页面js文件
    ├─ javascript                    gulp压缩js后的文件（生产环境使用） 
    ├─ upload                        管理后台资源上传存放目录
├─ routes   
    ├─ index.js                      页面/api接口路由
├─ schedule                          定时任务
    ├─ cooperateSchedule.js          定时任务:商务合作邮件定时发送任务
├─ scripts                           service模块
    ├─ excuteSql                     
        ├─ insert.sh                 数据库数据（sql）自动化导入脚本(和export.sh脚本是相反操作)
        ├─ export.sh                 数据库数据导出脚本   
├─ service                           service模块
    ├─ ...
├─ sql                               mongodb数据sql（应用初始化数据）
    ├─ sql                           sql（原始）语句
    ├─ export                        使用mongodump全库导出的源数据（可以直接导入数据库）
    ├─ json                          单边json数据
    ├─ preview                       演示预览图   
    ├─ README.md                     数据库数据导入说明   
├─ test 
    ├─ unit                          单元测试      
├─ views
    ├─ component                     官网页面组件
    ├─ layout                        官网页面layout布局组件
    ├─ page                          官网页面  
    ├─ styles                        公共stylus文件
├─ .gitigore                         git忽略
├─ app.js                            应用入口文件
├─ condfig.js                        项目配置文件
├─ gulpfile.js                       gulp配置文件
├─ package.json
├─ ...                                                
                                
```

### 项目配置文件介绍
+ port：应用端口号
+ mongodb：
    + local：本地环境mongodb数据库配置
        + servername：数据库host
        + database：数据库名
        + port：数据库应用端口
        + user：数据库连接账号
        + pass：数据库连接密码
    + dev：开发环境mongodb数据库配置
    + prd：生产环境mongodb数据库配置
+ cdn：静态资源cdn地址（未使用该配置项）
+ redis：redis配置（未使用该配置项）
+ log：应用日志配置
    + rootPath：开发环境日志存放目录
    + prdRootPath：生产环境日志存放目录
    + level：日志级别
+ engine：模板引擎（未使用该配置项）
+ session：session配置(具体配置请查看koa-session文档)
    + key：session key
    + ...
+ jwt：单点登录json web token 配置
    + resetWhenReload：为ture时应用重启时重置jwt初始化key，强制客户端登录失效（生产环境强制开启）
    + secret：jwt 公钥
+ crypto：（用户密码）加密公钥
+ smtp：邮件服务
    + serviceType：当前使用邮件服务类型
    + qq：qq邮箱（qq邮件服务，需要去qq邮箱设置开启smtp，不会请搜索相关资资料）
        + host：邮件服务host
        + port：邮件服务端口
        + auth
            + user：邮箱账号
            + pass：邮箱密码
    + alimail：阿里邮箱
    + receiver：邮件接收者
        + common：线索备份邮箱
        + partner：商务邮箱
+ sms：短信服务
    + type：短信服务商类型
    + aliyun：阿里云短信服务
        + accsessKey：(详细配置请查看阿里云短信服务文档)
        + ...
+ oss：阿里云oss配置项
    + region：(详细配置请查看阿里云oss文档)
    + accssKeyId：(详细配置请查看阿里云oss文档)
    + ...
+ captcha：验证码生产配置
    + size：验证码字符个数
    + width：宽度
    + height：长度
    + fontSize：验证码字体大小
    + ignoreChars：忽略字符
    + noise：干扰线条数
    + color：彩色
    + background：背景颜色
+ upload：资源上传配置项
    + devBaseUrl：开发环境资源上传前缀地址
    + prdBaseUrl：生产环境资源上传前缀地址
    + multerPath：multer上传存放目录
    + rootPath：资源上传根目录
    + staticResourcePath：静态资源根目录
+ dataMock：为ture，忽略数据库连接是否成功，官网数据将全部使用mock目录下的数据（注意：此时api接口会异常），为false，会和数据库交互，数据来源于数据库，api接口正常
+ clueBackup：为ture，线索保存到数据库的同时，会将线索数据备份并发到指定者邮箱
+ bodyParse：为ture，将使用koa-body中间件作为资源上传（注意：此时multer上传会异常，二者有冲突）
+ redirect：为ture，官网404页面将会被重定向到首页（生产环境强制开启）
+ timeZone：时区差（未使用该配置项）
+ timeZoneString：时区差字符串（未使用该配置项）

### 启动

- #### 开发环境（连接数据库）
  ```
  npm run start
  ```
  如果未安装数据库或不想连接数据库启动项目，需要设置config->dataMock为true，此时官网页面能正常访问（为静态数据）
  部分api接口将会异常
- #### 生产部署
  ```
  npm run build // 打包压缩js和css等文件，
  ```
  ```
  npm run prd
  ```
### 其他命令

- #### 杀死进程
  ```
  npm run kill
  ```

- #### 清空日志
  ```
  npm run clear
  ```
- #### 启动qa环境（qa环境下短信服务将在测试环境生效，即测试环境能真正收到短信验证码）
  注：因为没有买短信服务（要花钱的 - -），所以该功能未实现，需要的同学请自行实现逻辑，等同于：npm run start
  ```
  npm run qa
  ```
- #### 前端打包css、js
  ```
  npm run gulp
  ```
- #### 单元测试
  注：目前只测试通过了utils中的一个方法（通过单元测试测试功能，避免造真正的数据来测试，太麻烦）
  需要更多的单元测试，请自行测试，如需更进阶的单元测试，请查阅karma、mocha、sinon、chai等单元测试工具
  ```
  npm run test
  ```
- #### 数据库数据导出
  注：需要本地安装数据库服务并开启，数据库管理员账号已注册，且能正确访问
  更多细节请查看：scripts/excuteSql/export.sh
  ```
  npm run export
  ```
- #### 数据库数据导入
  注：需要本地安装数据库服务并开启，数据库管理员账号已注册，且能正确访问，确保sql/json目录下有文件
  更多细节请查看：scripts/excuteSql/insert.sh
  ```
  npm run insert
  ```

