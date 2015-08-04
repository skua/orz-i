var winston = require('winston');
var moment = require('moment');
var config = require('../config');

// 日志系统
module.exports = new(winston.Logger)({
  transports: [
    new(winston.transports.Console)({
      level: 'debug',
      colorize: true
    }),
    new(winston.transports.File)({
      name: 'info-file',
      filename: config.log.file,
      level: 'info',
      maxsize: 1024 * 1024 * 100, // 100MB
      maxFiles: 1,
      tailable: true, // loop write
      timestamp: function () {
        // timezone
        return moment().format('YYYY-MM-DD HH:mm:ss.SSS Z');
      }
    }),
    new(winston.transports.File)({
      name: 'error-file',
      filename: config.log.errorfile,
      level: 'error',
      maxsize: 1024 * 1024 * 100, // 100MB
      maxFiles: 1,
      tailable: true, // loop write
      timestamp: function () {
        // timezone
        return moment().format('YYYY-MM-DD HH:mm:ss.SSS Z');
      }
    }),
  ]
});