function cell (item) {

  // ecoco的cell组件是用来渲染资源cell的，通过webpack可以解析成html，但是在服务端没有webpack，就得自己解析，好在ejs模板规则很简单，就是简单的替换，倒也问题不大。
  // todo: cell.ejs也不需要了
  // 这里有点像在写react
  // 这里基本是沿用了ecoco项目的js逻辑（对seo不太友好，但是对于这里的资源也无所谓了，本来东西也不多，），如果要处理成服务端渲染，就参照新闻模式

  function renderTagView(list) {
    let result = ''
    for(let i = 0; i < list.length; i++){
      result = result + ' <span class="tag">' + list[i] + '</span>'
    }
    return result
  }

  let r =
    '<div class="content-cell">' +
    '  <img class="icon fn-left" src="/images/common/wenjian.svg" alt="文件" />' +
    '  <div class="title">' +
         item.title +
         ((item.tag && item.tag.length > 0) ? renderTagView(item.tag) : '') +
    '  </div>' +
       ((item.desc && item.desc !== '') ? '<div class="desc">' + item.desc + '</div>' : '') +
    '  <div class="extra-wrap">' +
    '    <div class="fn-left text-wrap">' +
    '      <img src="/images/service/resource/other/shijian.svg" alt="时间" />' +
    '      <span>' + item.date +'</span>' +
    '    </div>' +
    '    <div class="fn-left text-wrap">' +
    '      <img src="/images/service/resource/other/xiazai.svg" alt="下载" />' +
    '      <span>' + item.download +'次下载</span>' +
    '    </div>' +
    '    <div class="fn-left text-wrap">' +
    '      <img src="/images/service/resource/other/daxiao.svg" alt="文件大小" />' +
    '      <span>' + item.size +'</span>' +
    '    </div>' +
    '    <div class="fn-left text-wrap">' +
    '      <img src="/images/service/resource/other/ziyuan.svg" alt="文件类型" />' +
    '      <span>' + item.type +'</span>' +
    '    </div>' +
    '  </div>' +
    '' +
    '  <div class="btn-wrap">' +
    '    <span class="txt" href="/pdf/1.pdf" download="/pdf/1.pdf">点击下载</span>' +
    '    <img src="/images/common/xiangyou-fill.svg" alt="下载" />' +
    '  </div>' +
    '</div>'
  return r
}

$(function() {

  $('.resource-main-wrap .btn-wrap').on('click', function() {
    let name = $.cookie("name")
    let phone = $.cookie("phone")
    if (!name || !phone) {
      let target = {
        scrollY: window.scrollY,
        redirect: '' + window.location.pathname + window.location.search
      }
      localStorage.setItem('pageRedirect', JSON.stringify(target))
      //todo:下载没完成
      window.location.href = '/form?from=/resource&action=download'
      return
    }
    let a = document.createElement('a')
    a.href = '/pdf/1.pdf'
    a.download = '/pdf/1.pdf'
    a.click()
  })
})

$(document).ready(function() {
  let scroll = localStorage.getItem('pageScroll')
  if (scroll) {
    $('html, body').animate({
      scrollTop: scroll
    }, 500);
    localStorage.removeItem('pageScroll')
  }
})

$(function () {
  var swiper = new Swiper('.news-slide-container', {
    autoplay: 5000,
    effect: 'fade',
    pagination: '.news-pagination',
    paginationClickable: true,
  });

  $('.news-pagination .swiper-pagination-bullet').on('click', function () {
    let index = $(this).index();
    swiper.slideTo(index + 1);
  });

  // 初始化分页
  initPagination(downloadData.content);

  $('.resource-view .tabs-view .tab-item').on('click', function () {
    let index = $(this).index();
    let viewLeftPadding = 20;
    let firstNodeWidth = 34;
    if (index === 0) {
      $('.resource-view .tab-line').css({
        left: viewLeftPadding + 'px',
        width: firstNodeWidth + 'px',
      });
    } else {
      let target = viewLeftPadding;
      let cellMargin = 20 + 20;
      for (let i = 0; i < index; i++) {
        target =
          target +
          $('.resource-view .tabs-view .tab-item').eq(i).width() +
          cellMargin;
      }
      $('.resource-view .tab-line').css({
        left: target + 'px',
        width: $(this).width(),
      });
    }
    let key = $(this).attr('key');
    $('.resource-view .tabs-view').attr('key', key);
    $('#resource-list').empty();
    let html = '';
    let filterList = downloadData.content.filter(function (v) {
      return v.key === key || key === 'all';
    });
    filterList.slice(0, 10).forEach((item) => {
      html =
        html +
        cell(item);
    });
    $('#resource-list').append(html);
    initPagination(filterList);
    $('.resource-view .search-view').find('.input').val('');
    $('.download-sort').attr('download', '');
    $('.download-sort')
      .children('.download-icon')
      .attr('src', '/images/common/paixu-n.svg');
    $('.download-sort').children('.download-icon').css({
      transform: 'rotateZ(0deg)',
    });
  });

  $('.resource-view .search-view')
    .find('.search-icon')
    .on('click', function () {
      searchAction();
    });
  $('.resource-view .search-view')
    .find('.input')
    .keyup(function (e) {
      // 监听回车
      if (e.keyCode === 13) {
        searchAction();
      }
    });

  $('.download-sort').on('click', function () {
    let downloadSort = $(this).attr('download');
    let origin = [...downloadData.content];
    if (!downloadSort || downloadSort === '') {
      // 升序
      $(this).attr('download', 'asc');
      $(this)
        .children('.download-icon')
        .attr('src', '/images/common/paixu-h.svg');
      $(this).children('.download-icon').css({
        transform: 'rotateZ(180deg)',
      });
      origin.sort(function (a, b) {
        return b.download - a.download;
      });
      let key = $('.resource-view .tabs-view').attr('key') || 'all';
      let html = '';
      origin.slice(0, 10).forEach((item) => {
        if (item.key === key || key === 'all') {
          html =
            html +
            cell(item);
        }
      });
      $('#resource-list').empty();
      $('#resource-list').append(html);
      initPagination(origin);
    } else if (downloadSort === 'asc') {
      $(this).attr('download', 'desc');
      $(this).children('.download-icon').css({
        transform: 'rotateZ(0deg)',
      });
      origin.sort(function (a, b) {
        return a.download - b.download;
      });
      let key = $('.resource-view .tabs-view').attr('key') || 'all';
      let html = '';
      origin.slice(0, 10).forEach((item) => {
        if (item.key === key || key === 'all') {
          html =
            html +
            cell(item);
        }
      });
      $('#resource-list').empty();
      $('#resource-list').append(html);
      initPagination(origin);
    } else if (downloadSort === 'desc') {
      $(this).attr('download', '');
      $(this)
        .children('.download-icon')
        .attr('src', '/images/common/paixu-n.svg');
      $(this).children('.download-icon').css({
        transform: 'rotateZ(0deg)',
      });

      let key = $('.resource-view .tabs-view').attr('key') || 'all';
      let html = '';
      downloadData.content.slice(0, 10).forEach((item) => {
        if (item.key === key || key === 'all') {
          html =
            html +
            cell(item);
        }
      });
      $('#resource-list').empty();
      $('#resource-list').append(html);
      initPagination(downloadData.content);
    }
  });
});

function initPagination(list) {
  new Pagination({
    element: '#pages',
    pageIndex: 1,
    pageSize: 10,
    total: list.length,
    jumper: true,
    singlePageHide: false,
    prevText: '上一页',
    nextText: '下一页',
    disabled: true,
    currentChange: function (index) {
      $('#resource-list').empty();
      let html = '';
      let start = index - 1 === 0 ? 0 : index - 1 + '0';
      let end = index + '0';

      list.slice(+start, +end).forEach(function (item) {
        html += cell(item);
      });
      $('#resource-list').append(html);
      document.body.scrollTop = document.documentElement.scrollTop = 424 + 380;
    },
  });

  $('.search-text .search-item').on('click', function () {
    let searchKey = $(this).text();
    $('.search-view').find('.input').val(searchKey);
    searchAction();
  });
}

function searchAction() {
  let searchString = $('.resource-view .search-view').find('.input').val();
  console.log(searchString);
  let filterList = downloadData.content.filter(function (v) {
    return (
      v.title.toLowerCase().indexOf(searchString.toLowerCase()) >= 0 ||
      v.desc.toLowerCase().indexOf(searchString.toLowerCase()) >= 0 ||
      v.date.toLowerCase().indexOf(searchString.toLowerCase()) >= 0 ||
      (v.tag && v.tag.includes(searchString))
    );
  });

  // todo: es6 的箭头函数 没有babel处理的话，在前端就不要用了（nodejs端是可以用的）
  $('#resource-list').empty();
  let key = $('.resource-view .tabs-view').attr('key') || 'all';
  let html = '';
  filterList.slice(0, 10).forEach((item) => {
    if (item.key === key || key === 'all') {
      html =
        html +
        cell(item);
    }
  });
  $('#resource-list').append(html);
  initPagination(filterList);
}
