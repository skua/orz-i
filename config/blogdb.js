var config = require('./index');
var Sequelize = require('sequelize');
var logger = require('../support/logger');

var sequelize = new Sequelize('orzwp', config.database.username, config.database.password, {
  host: config.database.host,
  port: config.database.port,
  dialect: config.database.dialect,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: logger.info
});


// code,status

// openID,code,nick,time


// cdk列表
var contentList = sequelize.define('wp_posts', {
  ID: {
    type: Sequelize.STRING
  },
  post_title: {
    type: Sequelize.STRING
  },
  post_content: {
    type: Sequelize.STRING
  },
  post_status: {
    type: Sequelize.STRING
  },
  post_date: {
    type: Sequelize.STRING
  },
  post_name: {
    type: Sequelize.STRING
  }
});



// 如果单独运行 则重建表结构
if (require.main === module) {
  // 创建表
  contentList.sync({
    force: false
  });

}
// 对外模型
exports.contentList = contentList;