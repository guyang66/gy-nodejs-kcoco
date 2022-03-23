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
   * @returns {Promise<boolean>}
   */
  async query (model, params) {
    const { errorLogger } = app.$log4
    let queryParams = {...params}
    let queryOptions = {
      sort: {_id: -1}
    }
    try {
      return await model.find(queryParams, null, queryOptions)
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
  async save (content, model) {
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
})
