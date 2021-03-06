const path = require('path')
const multer = require('koa-multer')
const config = process.env.NODE_ENV === 'production' ? require('../config_prd.json') : require('../config.json')
const storage = multer.diskStorage({
  destination: path.resolve(config.upload.multerPath),
  filename: (ctx, file, cb)=>{
    cb(null, file.originalname);
  }
});

module.exports = app => {
  // multer已经是一个中间件了
  return multer({storage});
}
