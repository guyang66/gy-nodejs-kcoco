// 处理导航栏
$(function () {
  if ($(document).scrollTop() > 535 - 95 - 64) {
    $('.header-bg').css('opacity', 1);
  }

  $(window).scroll(function () {
    if ($(document).scrollTop() > 535 - 95 - 64) {
      $('.header-bg').css('opacity', 1);
    } else {
      $('.header-bg').css('opacity', 0.4);
    }
  });
});

// 过渡效果
$(document).ready(function() {
  $('.main-layout .header-wrap').removeClass('header-absolute').addClass('header-fixed')
  handleScroll()
  $(window).scroll(handleScroll)
})

function handleScroll() {
  let bannerViewHeight = $('.main-banner-wrap').height()
  let productViewHeight = $('.product-wrap').height()
  let solutionViewHeight = $('.solution-wrap').height()
  let customerViewHeight = $('.customer-wrap').height()
  let logoViewHeight = $('.logo-view-wrap').height()
  let staticsViewHeight = $('.statics-wrap').height()
  let certifyViewHeight = $('.certify-wrap').height()
  let resourceViewHeight = $('.resource-wrap').height()

  let screenHeight = $(window).height()
  let scrollHeight = $(document).scrollTop()
  let offsetHeight = 60

  let productDistance = bannerViewHeight + offsetHeight - screenHeight
  if (scrollHeight > productDistance || productDistance < 0) {
    $('.product-wrap .transition-hide,.product-wrap .transition-hide-bottom ').addClass('transition-fade-in')
  }

  let solutionDistance = productDistance + productViewHeight
  if (scrollHeight > solutionDistance || solutionDistance < 0) {
    $('.solution-wrap .transition-hide,.solution-wrap .transition-hide-bottom ').addClass('transition-fade-in')
  }

  let customerDistance = solutionDistance + solutionViewHeight
  if (scrollHeight > customerDistance || customerDistance < 0) {
    $('.customer-wrap .transition-hide,.customer-wrap .transition-hide-bottom ').addClass('transition-fade-in')
  }

  let logoDistance = customerDistance + customerViewHeight
  if (scrollHeight > logoDistance || logoDistance < 0) {
    $('.logo-view-wrap .transition-hide,.logo-view-wrap .transition-hide-bottom ').addClass('transition-fade-in')
  }

  let staticsDistance = logoDistance + logoViewHeight
  if (scrollHeight > staticsDistance || staticsDistance < 0) {
    $('.statics-wrap .transition-hide,.statics-wrap .transition-hide-bottom ').addClass('transition-fade-in')
  }

  let certifyDistance = staticsDistance + staticsViewHeight
  if (scrollHeight > certifyDistance || certifyDistance < 0) {
    $('.certify-wrap .transition-hide,.certify-wrap .transition-hide-bottom ').addClass('transition-fade-in')
  }

  let resourceDistance = certifyDistance + certifyViewHeight
  if (scrollHeight > resourceDistance || resourceDistance < 0) {
    $('.resource-wrap .transition-hide,.resource-wrap .transition-hide-bottom ').addClass('transition-fade-in')
  }

  let newsDistance = resourceDistance + resourceViewHeight
  if (scrollHeight > newsDistance || newsDistance < 0) {
    $('.news-wrap .transition-hide,.news-wrap .transition-hide-bottom ').addClass('transition-fade-in')
  }
}
