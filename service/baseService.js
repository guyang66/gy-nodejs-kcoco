module.exports = app => ({

  /**
   * 查询
   * @param id
   * @param model
   * @returns {Promise<*|boolean>}
   */
  async queryById (model, id) {
    const { errorLogger } = app.$log4
    try {
      return await model.findById(id)
    } catch (e){
      errorLogger.error(e)
      console.log(e)
      return false
    }
  },

  /**
   * 查询满足条件的一个记录
   * @param model
   * @param options
   * @returns {Promise<*|boolean>}
   */
  async queryOne (model, options) {
    const { errorLogger } = app.$log4
    try {
      return await model.findOne(options)
    } catch (e){
      errorLogger.error(e)
      console.log(e)
      return false
    }
  },

  /**
   * 条件查询list
   * @param model
   * @param params
   * @param projection
   * @param opt
   *           —— false：不设置options，不设置options为空
   *           —— null or undefined（默认）：默认按id排序
   *           —— object
   * @returns {Promise<*|boolean>}
   */
  async query (model, params, projection, opt) {
    const { errorLogger } = app.$log4

    let queryOptions
    if(!opt){
      queryOptions = { sort: { _id: -1 } }
    } else {
      queryOptions = Object.assign({},{ sort: { _id: -1 } },opt)
    }
    if(opt === 'false' || opt === false){
      queryOptions = {}
    }

    try {
      return await model.find(params, projection, queryOptions)
    } catch (e){
      errorLogger.error(e)
      console.log(e)
      return false
    }
  },

  /**
   * 新增
   * @param content
   * @param model
   * @returns {Promise<boolean>}
   */
  async save (model, content) {
    const { errorLogger } = app.$log4
    let newInstance = new model({...content})
    let p = new Promise((resolve,reject)=>{
      newInstance.save(function(err, doc){
        if(err){
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
    try {
      return await p
    } catch (e){
      errorLogger.error('保存失败！' + e)
      console.log(e)
      return false
    }
  },

  /**
   * 计数
   * @param model
   * @param params
   * @returns {Promise<*|boolean>}
   */
  async count (model, params) {
    const { errorLogger } = app.$log4
    let searchParams = {...params}
    try {
      return  await model.find(searchParams).countDocuments()
    } catch (e){
      errorLogger.error('保存失败！' + e)
      console.log(e)
      return false
    }
  },

  /**
   * 通过id更新
   * @param model
   * @param id
   * @param data
   * @returns {Promise<*|boolean>}
   */
  async updateById (model, id, data) {
    const { errorLogger } = app.$log4
    try {
      return await model.findByIdAndUpdate(id, data)
    } catch (e){
      errorLogger.error(e)
      // 在控制台打印错误信息，生产环境不打印
      console.log(e)
      return false
    }
  },

  /**
   * 批量更新
   * @param model
   * @param id
   * @param data
   * @returns {Promise<*|boolean>}
   */
  async batchUpdate (model, params, data) {
    const { errorLogger } = app.$log4
    try {
      return await model.update(
        {...params},
        {
          $set: {...data}
        }
      )
    } catch (e){
      errorLogger.error(e)
      // 在控制台打印错误信息，生产环境不打印
      console.log(e)
      return false
    }
  },

  /**
   * 更新一个
   * @param model
   * @param params
   * @param data
   * @returns {Promise<*|boolean>}
   */
  async updateOne (model, params, content) {
    const { errorLogger } = app.$log4
    try {
      return await model.findOneAndUpdate(
        {...params},
        {...content}
      )
    } catch (e){
      errorLogger.error(e)
      // 在控制台打印错误信息，生产环境不打印
      console.log(e)
      return false
    }
  },


})
