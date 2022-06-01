#!/bin/sh
# 执行脚本之前务必请先确认数据库已安装，数据可服务已开启，数据库管理员账号已注册
# 将数据库连接参数修改为你自己本地数据库，然后在根目录执行npm run insert

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
# 格式校验符
format=".json"
# 导入文件目录
jsonPath="sql/json"
# 导入文件根目录
rootPath="./sql/json/"

files=$(ls $jsonPath)
# 编辑sql/json目录下的所有json文件，通过mongoimport插入到数据库中
for filename in $files
  do
    if [[ $filename != *$format* ]]
    then
    echo "文件：$filename 不是json文件，跳过"
    else
    echo "准备导入:$filename"
    # 如果需要权限，则前面加上sudo即可：sudo mongoimport --port $port -h $host -u $user -p $pass -d $database -c ${filename%%.*} --type=json --drop --file ${rootPath}${filename}
    mongoimport --port $port -h $host -u $user -p $pass -d $database -c ${filename%%.*} --type=json --drop --file ${rootPath}${filename}
    fi
done
