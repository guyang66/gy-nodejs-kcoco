#! /usr/bin/expect

set user [lindex $argv 0]
set pwd [lindex $argv 1]
set serverIp [lindex $argv 2]
set targetDir [lindex $argv 3]
set tarDirName [lindex $argv 4]
set projectName [lindex $argv 5]

spawn ssh $user@$serverIp

expect {
  "*yes/no" { send "yes\r"; exp_continue }
  "*password:" { send "$pwd\r" }
}

expect "$*"

# 进入目录
send "cd $targetDir\r"
# 解压到当前目录即可
send "tar zxvf $tarDirName\r"
send "ls \r"
send "cd $projectName\r"
# 进入到项目目录了，可以执行npm run prd

# 查看pm2 进程 (npm run prd 的使用，进程是以projectName（gy-nodejs-kcoco）来命令的)
send "pm2 ls | grep $projectName |awk '{print \$4}'\r"
sleep 2

expect {
  # 匹配到名字就直接重启
  $projectName {
    send "pm2 ls\r"
    send "pm2 stop $projectName\r"
    sleep 1
    send "npm run prd\r"
    send "exit\r"
  }
   # 没有匹配到说明是stop或者从未启动过
   "$*" {
    send "npm run prd\r"
    send "exit\r"
  }
}

sleep 2
expect eof
