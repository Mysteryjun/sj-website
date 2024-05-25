const fs = require('fs');
const path = require('path');

// 递归创建目录 同步方法
function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname, '../../'))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

const checkDirExist = function (p) {
  mkdirsSync(p)
}

const getUploadFileExt = function (name) {
  let ext = name.split('.');
  console.log(ext[ext.length - 1])
  if (ext[ext.length - 1] === 'blob') {
    return 'jpg'
  }
  return ext[ext.length - 1];
}

const getUploadFileName = function (ext){
  return `${Date.now()}${Number.parseInt(Math.random() * 10000)}.${ext}`;
}

module.exports = {
  checkDirExist,
  getUploadFileExt,
  getUploadFileName
};
