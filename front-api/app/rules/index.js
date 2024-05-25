const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
let rules = {}

// 加载当前文件夹下所有js文件
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    rules = Object.assign({}, rules, require(path.join(__dirname, file)))
  });

module.exports = rules