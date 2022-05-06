$(function () {

  // 规则
  // 1.点击搜索，tab自动切回「全部」，分页器回到第一页
  // 2.页面存在searchKey，再点击tab切换的话，带上searchKey参数，分页器回到第一页
  // 3.点击pagination，tabKey和searchKey都要同步带上（基本上都是在a标签上处理）

  // tabs 切换
  $('.news-view .tabs-view .tab-cell').on('click', function () {
    let key = $(this).attr('key');
    let targetUrl = location.protocol + '//' + location.host + '/about/news/1' + '?type=' + key
    // 规则2
    targetUrl = targetUrl + localUrlSearchParams(
      'search',
    )
    window.location.href = targetUrl
  });

  $('.search-view')
    .find('.icon')
    .on('click', function () {
      searchAction();
    });

  $('.search-view')
    .find('.input')
    .keyup(function (e) {
      // 监听回车
      if (e.keyCode === 13) {
        searchAction();
      }
    });

  $('.search-view .search-text .search-item').on('click',function (){
    searchAction($(this).text())
  })

});

function searchAction(search) {
  let searchString = $('.search-view').find('.input').val();
  // 规则1
  if(search && search !== ''){
    window.location.href = location.protocol + '//' + location.host + '/about/news/1' + '?search=' + search
    return
  }
  if(searchString && searchString !== ''){
    window.location.href = location.protocol + '//' + location.host + '/about/news/1' + '?search=' + searchString
    return
  }
  window.location.href = location.protocol + '//' + location.host + '/about/news/1'
}
