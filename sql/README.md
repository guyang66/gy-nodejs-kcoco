- ### mongodb 语法接近js
    1、直接到数据库管理工具执行即可。
    2、命令行
        a、登录mongodb命令行
        b、数据量不大的直接复制到命令行执行，数据量大的用mongoimport命令导入
  
- ### 注意
    手写的sql，表名最后要加s
    如表 kcoco_biz_admin_menus
    在代码里映射的时候不需要加s
- ### 查看sql执行日志
  cd logs
  tail -100f mongodb.log
