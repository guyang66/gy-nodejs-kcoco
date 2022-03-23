module.exports = app => ({

  async test () {
    const { ctx, $helper } = app
    ctx.body = $helper.Result.success('这是测试')
  },

  async saveCustomer () {
    const { ctx, $service, $helper, $model } = app
    const { customer } = $model

    let obj = {
      name: 'data' + Math.floor((Math.random() * 10) + 1),
      company: '这是公司' + new Date().toString()
    }

    let r = await $service.baseService.save(obj, customer)
    if(r){
      ctx.body = $helper.Result.success('ok')
    } else {
      ctx.body = $helper.Result.fail(-1, 'fail!')
    }
  },

  async getCustomer () {
    const { ctx, $service, $helper, $model } = app
    const { customer } = $model
    let r = await $service.baseService.queryOne(customer)
    if(r){
      ctx.body = $helper.Result.success(r)
    } else {
      ctx.body = $helper.Result.fail(-1, 'fail!')
    }
  },

  async getUserInfo () {
    const { ctx, $helper, $model } = app
    ctx.body = $helper.Result.success('这是返回的正确名字！')
  }

})
