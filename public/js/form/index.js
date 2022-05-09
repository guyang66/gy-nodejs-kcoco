// 解析url query 参数
function getQueryVariable(variable) {
  let query = window.location.search.substring(1);
  let vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return false;
}

let entry = getQueryVariable('entry')
if (entry === 'resource') {
  $('.form-main-wrap .form-view .title-view').text('资源下载')
  $('.form-main-wrap .form-view .desc-view').text('填写您的信息即可下载相关资源')
}

// 调整表单居中
$(function() {
  $('.form-wrap').css({
    minHeight: Math.max($(window).height(), 778) + 'px'
  })
  $('.form-view').css({
    marginTop: Math.max((Math.max($(window).height(), 778) - 778 - 64) / 2, 24) + 'px'
  })

  $(window).resize(function() {
    $('.form-wrap').css({
      minHeight: Math.max($(window).height(), 778) + 'px'
    })
    $('.form-view').css({
      marginTop: Math.max((Math.max($(window).height(), 778) - 778 - 64) / 2, 24) + 'px'
    })
  });


  /**************  发送验证码  **************/
  let intervalInstance
  const TIME_INTERVAL = 59

  function startInterval() {
    intervalInstance = setInterval(function() {
      let num = $('.send-button').attr("second")
      if (num < 0) {
        $('.send-button').text(TIME_INTERVAL + 's之后重发')
        $('.send-button').attr("second", TIME_INTERVAL)
        return
      }
      let number = $('.send-button').attr("second")
      $('.send-button').text((number - 1) + 's之后重发')
      $('.send-button').attr("second", (number - 1))

      if (number <= 1) {
        $('.send-button').text("获取验证码")
        $('.send-button').attr("second", -1)
        clearInterval(intervalInstance)
        intervalInstance = -1
      }
    }, 1000)
  }

  $('.send-button').on('click', function() {
    if (intervalInstance > 0) {
      return
    }
    let phone = $("input[name='phone']").val()
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
      $.toast({
        loader: false,
        text: '手机号码格式有误!',
        position: 'top-center',
        icon: 'error',
        hideAfter: 2000,
        allowToastClose: false
      })
      return
    }

    $.get(
      '/api/sms/send',
      {
        phone: phone
      },function (data){
        if(data.success){
          $.toast({
            loader: false,
            text: '验证码发送成功!',
            position: 'top-center',
            allowToastClose: false,
            hideAfter: 3000,
            icon: 'success'
          })
          startInterval()
        } else {
          $.toast({
            loader: false,
            text: '验证码发送失败' + ((data && data.error) ? ('(' + data.error.message + ')') : '') + '!',
            position: 'top-center',
            icon: 'error',
            hideAfter: 2000,
            allowToastClose: false
          })
        }
      }
    )
  })
  /**************  发送验证码  **************/


  /**************  验证表单  **************/
  // 提交表单
  $('.button-submit').on('click', function() {
    // 恢复初始状态
    $('.form-verify div').css({
      height: '0'
    })
    let verifyResult = verifyFormInfo()
    if (!verifyResult) {
      return
    }

    let code = $("input[name='code']").val()
    let phone = $("input[name='phone']").val()
    $.ajax({
      url: '/api/sms/verify',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: {
        phone: phone,
        code: code
      },
      success: function (data) {
        if(data.success){
          // 验证码验证成功
          saveAction()
        } else {
          $.toast({
            loader: false,
            text: (data && data.errorMessage) ? data.errorMessage : '服务异常！请稍候再试',
            position: 'top-center',
            icon: 'error',
            hideAfter: 3000,
            allowToastClose: false
          })
        }
      },
      error: function (data) {
        // 不处理error
      }
    })
  })

  // 校验输入值准确性
  function verifyFormInfo() {
    let result = true
    let phone = $("input[name='phone']").val()
    let code = $("input[name='code']").val()
    let name = $("input[name='name']").val()
    let company = $("input[name='company']").val()
    let position = $("input[name='position']").val()
    let need = $("input[name='need']").val()
    let declare = $("input[name='declare']:checked").val()

    if (!phone || phone === '') {
      $('.form-verify .phone-input-error').css({
        height: '24px',
        transition: 'all 0.3s ease-in-out'
      })
      $('.form-verify .phone-input-error').text('请填写您的手机号')
      result = false
    }

    if (!(/^1[3456789]\d{9}$/.test(phone))) {
      $('.form-verify .phone-input-error').css({
        height: '24px',
        transition: 'all 0.3s ease-in-out'
      })
      $('.form-verify .phone-input-error').text('手机号码格式错误')
      result = false
    }

    if (!code || code === '') {
      $('.form-verify .code-input-error').css({
        height: '24px',
        transition: 'all 0.3s ease-in-out'
      })
      result = false
    }

    if (!name || name === '') {
      $('.form-verify .name-input-error').css({
        height: '24px',
        transition: 'all 0.3s ease-in-out'
      })
      result = false
    }

    if (!company || company === '') {
      $('.form-verify .company-input-error').css({
        height: '24px',
        transition: 'all 0.3s ease-in-out'
      })
      result = false
    }

    // 职位非必填
    // if(!position || position === ''){
    //   $('.form-verify .position-input-error').css({height: '24px', transition: 'all 0.3s ease-in-out'})
    //   $('.form-verify .position-input-error').text('请填写您的职位')
    //   result = false
    // }

    //  如有有邮箱，可用于验证邮箱
    // let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
    // if(!reg.test(email)){
    //   $('.form-verify .email-input-error').css({height: '24px', transition: 'all 0.3s ease-in-out'})
    //   $('.form-verify .email-input-error').text('邮箱格式错误')
    //   result = false
    // }

    if (!need || need === '') {
      $('.form-verify .need-input-error').css({
        height: '24px',
        transition: 'all 0.3s ease-in-out'
      })
      result = false
    }

    if (!(declare && declare === 'on')) {
      $('.form-verify .declare-input-error').css({
        height: '24px',
        transition: 'all 0.3s ease-in-out'
      })
      result = false
    }

    return result
  }

  // 下一步
  function saveAction() {
    let params = {
      company: $("input[name='company']").val(),
      name: $("input[name='name']").val(),
      phone: $("input[name='phone']").val(),
      need: $("input[name='need']").val(),
      position: $("input[name='position']").val(),
      originHref: window.location.href,
      origin: '官网',
      remark: '',
      date: new Date().toLocaleDateString()
    }

    $.get(
      '/api/clue/save',
      params,
      function (data){
        if(data.success){
          $.toast({
            loader: false,
            text:'提交成功！',
            allowToastClose: false,
            position: 'mid-center',
            icon: 'success'
          })
          nextStep()
        } else {
          $.toast({
            loader: false,
            text: '提交失败！' + data.errorMessage,
            position: 'top-center',
            icon: 'error',
            hideAfter: 2000,
            allowToastClose: false
          })
        }
      }
    )
  }

  function nextStep() {
    // cookie 保存用户状态，避免重复提交
    $.cookie("phone", $("input[name='phone']").val(), {
      expires: 1
    })
    $.cookie("name", $("input[name='name']").val(), {
      expires: 1
    })

    console.log('我老了')
    console.log($.cookie('name'))
    // input全部重置
    $("input[name='phone']").val("")
    $("input[name='code']").val("")
    $("input[name='name']").val("")
    $("input[name='company']").val("")
    $("input[name='need']").val("")
    $("input[name='position']").val("")

    // 如果是资源中心跳转过来的，还需跳转回去
    if (localStorage.getItem('pageRedirect')) {
      let str = localStorage.getItem('pageRedirect')
      let object = JSON.parse(str)
      localStorage.removeItem('pageRedirect')
      localStorage.setItem('pageScroll', object.scrollY)
      window.location.href = object.redirect
    }
  }

  /**************  验证表单  **************/

  // 其他点击事件
  $('.select-view').hide()

  $('.normal-input-wrap.cursor-pointer').on('click', function(e) {
    e.stopPropagation();
    $('.select-view').show()
  })

  $('.select-cell').on('click', function(e) {
    e.stopPropagation();
    $("input[name='need']").val($(this).text())
    $(this).addClass('select-cell-active').siblings().removeClass('select-cell-active')
    $('.need-input-error').css({
      height: 0
    })
    $('.select-view').hide()
  })

  $(document).on('click', function() {
    $('.select-view').hide()
  })

})
