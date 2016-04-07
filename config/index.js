var path = require('path');
var helper = require('../support/helper');

// 尝试加载个性化配置
var environment = {};
try {
  environment = require('../local/config');
}
catch (e) {
  console.log('服务环境未指定，默认使用线上正式环境');
}

module.exports = helper.merge({

  // 建议该部配置线上环境 *********************
  // 本地测试环境建议配置在local目录下**********

  // port: 3444,
  // // 日志
  // log: {
  //   file: '/mobile.log', // INFO日志文件位置
  //   errorfile: '/mobile-error.log', // ERROR日志文件位置
  // },
  // //微信
  // wxconfig: {
  //   appid: "wx***",
  //   secret: "4e***",
  // },
 
  // //domain
  // domain: "https://orz-i.com",
 
  //   // 数据库
  // database: {
  //   host: '',
  //   port: ' ',
  //   username: ' ',
  //   password: ' ',
  //   dbname: ' ',
  //   dialect: 'mysql',
  // },
 
   // 静态目录
  static: path.join(__dirname, environment.isOnline === false ? '../static/tmp' : '../static/dist'),
 
}, environment);