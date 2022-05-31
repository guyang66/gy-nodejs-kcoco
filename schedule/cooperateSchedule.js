/** 定时任务：扫描线索，线索中有需求为商务合作的发送到指定邮箱 **/
module.exports = app => {
  const { $log4, $format, $service } = app
  const { scheduleLogger } = $log4
  return {
    /** cron风格调度格式
     * *    *    *    *    *    *
     ┬    ┬    ┬    ┬    ┬    ┬
     │    │    │    │    │    |
     │    │    │    │    │    └ 一周的星期 (0 - 7) (0 or 7 is Sun)
     │    │    │    │    └───── 月份 (1 - 12)
     │    │    │    └────────── 月份中的日子 (1 - 31)
     │    │    └─────────────── 小时 (0 - 23)
     │    └──────────────────── 分钟 (0 - 59)
     └───────────────────────── 秒 (0 - 59, OPTIONAL)
     */
    open: true,
    // 每天早上8点整执行(开发环境每半分钟执行)
    interval: process.env.NODE_ENV === 'development' ? '0,30 * * * * *' : '0 0 8 * * *',
    handler: async () => {
      scheduleLogger.info($format.formatDate(new Date())  + '：======= 执行定时器任务：商务合作线索转发到商务邮箱 =============')
      console.log($format.formatDate(new Date())  + '：执行定时器任务：商务合作线索转发到商务邮箱 ')
      let r
      if(process.env.NODE_ENV === 'production'){
        r = await $service.emailService.sendCooperateClue()
      } else {
        // 测试环境如果要测试定时任务，请取消注释
        // r = await $service.emailService.sendCooperateClue()
        r = { result: true }
      }
      if(r.result){
        scheduleLogger.info($format.formatDate(new Date())  + '：执行定时器：=> 商务合作线索转发 任务成功')
      } else {
        scheduleLogger.info($format.formatDate(new Date())  + '：执行定时器：=> 商务合作线索转发 任务失败！失败原因：' + r.errorMessage)
      }
    }
  }
}
