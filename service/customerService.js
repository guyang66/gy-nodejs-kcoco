module.exports = app => ({

  /**
   * 分页查询
   * @param id
   * @param model
   * @returns {Promise<*|boolean>}
   */
  async getList (page = 1, pageSize = 10, params) {
    const { errorLogger } = app.$log4
    const { customer } = app.$model
    const { name, company} = params

    let list = []
    let searchParams = {}

    if(name){
      searchParams.name = name
    }
    if(company){
      searchParams.company = company
    }

    let sortParam = {
      _id: -1
    }

    let total = await customer.find(searchParams).countDocuments()
    list = await customer.find(searchParams, null, {skip: pageSize * (page < 1 ? 0 : (page - 1)), limit: (pageSize - 0), sort : sortParam }, function (err, docs){
      if(err){
        errorLogger.error(err)
      }
    })
    return { list, total }
  }
})
