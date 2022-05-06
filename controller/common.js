
const Core = require('@alicloud/pop-core');


module.exports = app => ({

  async test () {
    const { ctx, $helper } = app

    var client = new Core({
      accessKeyId: 'LTAI5t78JUZpBdTDjC8TatxN',
      accessKeySecret: 'xH40wVKEZ0b54JKpYAfBDvEgjiYHUB',
      endpoint: 'https://dysmsapi.aliyuncs.com',
      apiVersion: '2017-05-25'
    });

    var params = {
      "PhoneNumbers": "13588295865",//接收短信的手机号码
      "SignName": "阿里云短信测试",//短信签名名称
      "TemplateCode": "SMS_154950909", //短信模板CODE
      "TemplateParam": "{\"phone\":\"13588295865\",\"code\":\"123456\"}"
    }

    var requestOption = {
      method: 'POST'
    };

    try {
      let r = await client.request('SendSms', params, requestOption)
      ctx.body = $helper.Result.success(r.data.Message)

    } catch (e) {
      ctx.body = $helper.Result.fail(-1,e.data.Message)
    }

  },

  async saveCustomer () {
    const { ctx, $service, $helper, $model } = app
    const { customer } = $model

    let obj = {
      name: 'data' + Math.floor((Math.random() * 10) + 1),
      company: '这是公司' + new Date().toString()
    }

    let r = await $service.baseService.save(customer, obj)
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
