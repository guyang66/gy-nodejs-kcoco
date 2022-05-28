module.exports = app => ({
  /**
   * 根据key获取common config 设置
   * @param key
   * @param valueKey 从v1、v2、v3、v4、v5...中取
   * @returns {Promise<null|*>}
   */
  async getCommonConfig (key, valueKey) {
    const { $log4, $model } = app
    const { errorLogger } = $log4
    const { commonConfig } = $model
    let result = await commonConfig.findOne({ key },function (err){
      if(err){
        console.log(err)
        errorLogger.error('【commonConfigService】- getCommonConfig:' + err.toString())
      }
    })
    if(!result){
      return []
    }
    return result[valueKey]
  },

  /**
   * 根据key跟新common config 设置
   * @param key
   * @param valueKey  需要更新的字段
   * @param content 更新内容（因为是json串，所以是整体更新）
   * @returns {Promise<*>}
   */
  async updateCommonConfig (key, valueKey, content){
    const { $model, $log4} = app
    const { commonConfig } = $model
    const { errorLogger } = $log4
    let p = {}
    p[valueKey] = content
    return await commonConfig.findOneAndUpdate({ key }, p, {}, function (err){
      if(err){
        console.log(err)
        errorLogger.error('【commonConfigService】- updateCommonConfig:' + err.toString())
      }
    })
  }
})
