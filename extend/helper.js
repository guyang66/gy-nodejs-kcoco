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

  getPaginationCellText (total, cellCount = 7, currentPage, currentIndex) {

    /*
    * 显示 1、2、3、4、5 ... 10  这样7个UI的形式
    */
    cellCount = 7

    // 计算分页器的数字
    let allPage = Math.ceil(total / 10)
    if(cellCount < 7){
      // 只会有 [1,2,3,4,5,6]
      return '' +  (currentIndex + 1)
    }

    let omitFoot = false; // 后面省略
    if(allPage - currentPage >= 6 || currentPage < 6) {
      omitFoot = true
    }

    if(omitFoot) {
      if(currentPage < 6 && currentIndex < 5) {
        return  ''  +  (currentIndex + 1)
      }

      if(currentIndex < 5) {
        return '' +  (currentPage + currentIndex)
      }

      if(currentIndex === 5) {
        return '...'
      }

      if(currentIndex > 5) {
        return '' + allPage
      }
    } else {
      if(currentIndex < 1) {
        return  '' + 1
      }

      if(currentIndex === 1) {
        return  '...'
      }

      return  '' + (allPage - (6 - currentIndex))
    }
  },
})
