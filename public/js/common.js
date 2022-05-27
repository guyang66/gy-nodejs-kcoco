$(function() {
  scrollEvent();
  // pv记录
  checkPageVisit()
  // tp记录
  checkTimeOnPage()
});

function scrollEvent(){
  const tabsEle = $('.tabs-wrap .tabs-content li');
  getTabsOffsetActive()
  // 获取激活tabs
  function getTabsOffsetActive() {
    var tabsLen = tabsEle.length;
    var contH = $('.header-wrap').height() + ($(".banner-wrap").height()) - 50;
    var hideTop = $(document).scrollTop();
    var num = hideTop / contH;

    // 导航切换
    if (num >= 1) {
      $(".tabs-wrap").addClass('fixed');
    } else {
      $(".tabs-wrap").removeClass('fixed');
    };

    if (hideTop >= num) {
      tabsEle.removeClass('active')
      tabsEle.eq(0).addClass('active')
    }

    for(let i = 1; i < tabsLen; i++) {
      const contentLen = $('.tabs-content-wrap').eq(i).offset().top - 50
      if (hideTop >= contentLen) {
        tabsEle.removeClass('active')
        tabsEle.eq(i).addClass('active')
      }
    }
  }

  $(window).on('scroll', function(event) {
    event.preventDefault();
    getTabsOffsetActive();
  });

  tabsEle.on('click', function(event) {
    event.preventDefault();
    var i = $(this).index();
    tabsEle.removeClass('active');
    $(this).addClass('active');
    var offTop = $(".tabs-content-wrap").eq(i).offset().top - 50;
    $('html, body').animate({scrollTop: offTop}, 500);
  })
}

/**
 * 埋点-pv，（todo:不能通过后端路由统计，因为会有一些爬虫来访问，除非你能剔除掉爬虫访问）
 */
function checkPageVisit () {
  let params = {
    path: '' + window.location.pathname ,
    name: $.cookie("name"),
    phone: $.cookie("phone"),
  }
  $.get(
    '/api/statics/pv',
    params,
    function (data){
    })
}

/**
 * 埋点-uv
 * 主要还是存储到localstorage中，进入下一个页面之后取出来保存到服务端，所以缺点就是：会丢失最后一次访问的tp
 */
function checkTimeOnPage () {
  let key = localStorage.getItem('page_tag')
  if(key && key !== ''){
    let resultString = localStorage.getItem('page_tag')
    let result = JSON.parse(resultString)
    let endTime = new Date().getTime()
    let interval = endTime - result.startTime
    let params = {
      path: result.path,
      time: interval,
      name: $.cookie("name"),
      phone: $.cookie("phone"),
    }

    $.get(
      '/api/statics/tp',
      params,
      function (data){
      })

    // 拼接url
    let path = '' + window.location.pathname
    let startTime = new Date().getTime()
    let obj = {
      path: path,
      startTime: startTime
    }
    localStorage.setItem('page_tag', JSON.stringify(obj))
  } else {
    // 第一次进
    let path = '' + window.location.pathname
    let startTime = new Date().getTime()
    let obj = {
      path: path,
      startTime: startTime
    }
    localStorage.setItem('page_tag', JSON.stringify(obj))
  }
}
