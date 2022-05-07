module.exports = app => ({
  Result : {
    success (content) {
      return {
        success: true,
        data: content,
        errorCode: null,
        errorMessage: null
      }
    },

    fail (code, message) {
      return {
        success: false,
        data: null,
        errorCode: code,
        errorMessage: message ? message : ''
      }
    }
  },

  /**
   *  判断是否是对象
   */
  isEmptyObject  (object) {

    if(!object || typeof object !== 'object'){
      return  true
    }

    if (JSON.stringify(object) === '{}') {
      return true
    }

    return  Object.keys(object).length < 1
  },

  /**
   * 自定义分页器显示逻辑（这里有一些局限性，还可以再扩展的更好些）
   * @param total 总条数
   * @param cellCount 显示形式 7：显示 1、2、3、4、5 ... 10  这样7个UI的形式 小于7 这说明total <= 60不足以显示7个UI
   * @param currentPage 当前所在页数，判断前后时候有省略号
   * @param currentIndex 当前计算的index
   * @returns {string}
   */
  getPaginationCellText (total, cellCount = 7, currentPage, currentIndex) {
    let allPage = Math.ceil(total / 10) // allPage 总页数
    if(cellCount < 7 || allPage <= 7){
      // 只会有 [1,2,3,4,5,6]的形式，直接返回
      return '' + currentIndex
    }

    // 首页
    if(currentPage === 1){
      if(currentIndex < 6 || currentIndex === allPage){
        return  '' + currentIndex
      }
      return 'omitBack'
    }

    // 尾页
    if(currentPage === allPage){
      if(currentIndex > allPage - 5 || currentIndex === 1){
        return '' + currentIndex
      }
      return 'omitFront'
    }

    // 第二页（currentPage = 2）， 左边只有一位（首页），需要从右边多补齐一位
    if(currentPage === 2){
      if(currentIndex <= 5){
        return '' + currentIndex
      }
    }

    // 倒数第二页（allPage - 1），右边只有一位（尾页），需要从左边多补齐一位
    if(currentPage === allPage - 1){
      if(currentIndex > allPage - 5){
        return '' + currentIndex
      }
    }

    let pre = currentPage - 1
    let next = currentPage + 1

    // 首页、当前页、尾页、上一页、下一页必定显示数字
    if(currentIndex === currentPage || currentIndex === 1 || currentIndex === allPage || currentIndex === pre || currentIndex === next){
      return '' + currentIndex
    }

    // 2格以内 处理index = 3
    if(Math.abs(currentIndex - currentPage) <= 2 && currentPage <=3) {
      return '' + currentIndex
    }

    if(Math.abs(currentIndex - currentPage) <= 2 && currentPage >= allPage - 2) {
      return '' + currentIndex
    }

    // ['1','...',「3」,'4','5','...','9'] 像这种情况2就没必要用省略号了，直接显示
    if(Math.abs(currentIndex - currentPage) <= 2 && currentIndex - 1 <= 1) {
      return '' + currentIndex
    }
    // 同上
    if(Math.abs(currentIndex - currentPage) <= 2 && allPage - currentIndex <= 1) {
      return '' + currentIndex
    }

    // 其他的就直接返回省略号
    if(currentIndex < pre){
      return 'omitFront'
    }
    if(currentIndex > next){
      return 'omitBack'
    }
  },
})
