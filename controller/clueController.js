module.exports = app => ({

  /**
   * 保存线索
   * @returns {Promise<void>}
   */
  async save () {
    const { ctx, $helper, $service, $model, $utils, $format, $config } = app;
    const { bizClue } = $model
    let { phone, name, company, need, position, origin, originHref, remark, date } = ctx.query

    // 校验必填项
    if($utils.isEmptyString(phone)){
      ctx.body = $helper.Result.fail(-3, '参数（phone）不存在！')
      return
    }

    if($utils.isEmptyString(name)){
      ctx.body = $helper.Result.fail(-3, '参数（name）不存在！')
      return
    }

    if($utils.isEmptyString(company)){
      ctx.body = $helper.Result.fail(-3, '参数（company）不存在！')
      return
    }

    if($utils.isEmptyString(need)){
      ctx.body = $helper.Result.fail(-3, '参数（need）不存在！')
      return
    }

    let ip = $helper.getClientIP(ctx)
    if(!date){
      date = $format.formatDate(new Date())
    }

    let r = await $service.baseService.save(bizClue, { phone, name, company, need, position, ip, origin, originHref, remark, date })

    if($config.clueBackup){
      // 如果开启了线索备份到邮箱，则异步发送到指定邮箱
      $service.emailService.clueToEmail({
        '电话': phone,
        '姓名': name,
        '公司': company,
        '职位': position,
        '需求': need,
        '日期': date
      })
    }
    if(r){
      ctx.body = $helper.Result.success('保存成功')
    } else {
      ctx.body = $helper.Result.fail(-3,'保存失败！')
    }
  }

})
