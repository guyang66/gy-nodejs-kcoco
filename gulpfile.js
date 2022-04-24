const { src, dest, parallel, watch, series } = require('gulp')
const stylus = require('gulp-stylus')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const uglify = require('gulp-uglify') // 压缩js
const cssmin = require('gulp-clean-css') // 压缩css
const gulpif = require('gulp-if')

var env
function setEnv (cb) {
  // 设置打包环境
  // development - 开发环境  js和css都不需要压缩
  // production - 生成环境  js和css需要压缩，有必要可以js混淆
  env = process.env.NODE_ENV || 'development'
  cb();
}

// 策略是
// function js() {
//   // 压缩js
//   if(env === 'development'){
//     return
//   }
//   return src('public/js/**/*.js')
//     .pipe(uglify())
//     .pipe(dest('public/javascripts'))
// }
//
// function jsCommon(){
//   // 压缩全局js
//   if(env === 'development'){
//     return
//   }
//   return src('public/common/plugins/**/*.js')
//     .pipe(uglify())
//     .pipe(dest('public/javascripts/common'))
// }

function css() {
  // 编译css
  const postcssConfig = [
    autoprefixer({overrideBrowserslist: 'last 2 versions'})
  ];
  return src('views/page/**/*.styl')
    .pipe(stylus())
    .pipe(postcss(postcssConfig))
    .pipe(gulpif(env === 'production', cssmin()))
    .pipe(dest('public/css'))
}

function cssGlobal () {
  // 编译全局css
  const postcssConfig = [
    autoprefixer({overrideBrowserslist: 'last 2 versions'})
  ];
  return src('views/style/*.styl')
    .pipe(stylus())
    .pipe(postcss(postcssConfig))
    .pipe(gulpif(env === 'production', cssmin()))
    .pipe(dest('public/css'))
}

function cssCommon () {
  if(env === 'development'){
    return
  }
  // 压缩common css
  return src('public/common/css/**.css')
    .pipe(cssmin())
    .pipe(dest('public/css/common'))
}

watch(['views/page/**/*.styl'],function (cb){
  css();
  cb();
})

watch(['views/styles/*.styl'],function (cb){
  // 只编译css
  cssGlobal();
  cb();
})

exports.default = series(setEnv, parallel(css, cssGlobal, cssCommon))
