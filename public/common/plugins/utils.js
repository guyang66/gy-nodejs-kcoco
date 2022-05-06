/**
 * 获取url 参数
 * @param variable
 * @returns {string|boolean}
 */
//todo: 统一归口到这里
function getQueryVariable(variable) {
  let query = window.location.search.substring(1);
  let vars = query.split("&");
  for (let i=0;i<vars.length;i++) {
    let pair = vars[i].split("=");
    if(pair[0] === variable){return pair[1];}
  }
  return false;
}

/**
 * 多个查询参数url拼接
 * @returns {string}
 */
function localUrlSearchParams() {
  let search = ''
  for(let i = 0; i < arguments.length;i++){
    if(arguments[i]){
      let item = getQueryVariable(arguments[i])
      if(item){
        search = search + '&'
        search = search + arguments[i] + '=' + item
      }
    }
  }
  return search
}

/**
 * 前端js 获取当前url
 * @returns {string}
 */
function getUrlPath () {
  return location.protocol + '//' + location.host + location.pathname
}
