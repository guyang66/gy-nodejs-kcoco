#!/bin/sh
# 执行脚本之前务必请先确认数据库已安装，数据可服务已开启，数据库管理员账号已注册

# 端口
port="27017"
# ip
host="localhost"
# 用户名
user="gy"
# 密码
pass="123456"
# 数据库名
database="kcoco"
# 数据导出存放纹路
outputPath="sql/json/"
# json文件根目录
rootPath="./sql/json/"

# 需要导出的表名数组
tableName=(
kcoco_admin_menu
kcoco_admin_role
kcoco_admin_ui_permission
kcoco_admin_url_permission
kcoco_admin_user
kcoco_admin_route
kcoco_common_config
kcoco_page_brand_activity
kcoco_page_hot_activity
kcoco_page_product_activity
kcoco_page_activity
kcoco_page_case
kcoco_page_common_tag
kcoco_page_index_banner_action
kcoco_page_news_category
kcoco_page_news
kcoco_page_resource_category
kcoco_page_resource_column
kcoco_page_resource_download
kcoco_page_resume_category
kcoco_page_resume_column
kcoco_page_resume_place
kcoco_page_resume
kcoco_page_tdk
kcoco_sys_cache
)
# 要导出其他表的数据请自己行添加表名到tableName中

# 遍历tableName 依次执行mongoexport命令，导出到指定目录
for filename in ${tableName[*]}
  do
  echo "表：$filename 开始导出"
  mongoexport --port $port -h $host -u $user -p $pass -d $database -c $filename --type=json -o ${outputPath}${filename}.json --forceTableScan
done
