var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var request = require('request');
var logger = require('./logger');

// 递归遍历目录
var walk = exports.walk = function (dir, done) {
  var results = [];
  fs.readdir(dir, function (err, list) {
    if (err)
      return done(err);

    var pending = list.length;
    if (!pending)
      return done(null, results);

    list.forEach(function (file) {
      file = path.resolve(dir, file);
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function (err, res) {
            results = results.concat(res);
            if (!--pending)
              done(null, results);
          });
        }
        else {
          results.push(file);
          if (!--pending)
            done(null, results);
        }
      });
    });
  });
};


// 返回当前的程序调用栈  
var callsite = exports.callsite = function () {
  var orig = Error.prepareStackTrace;
  Error.prepareStackTrace = function (_, stack) {
    return stack;
  };
  var err = new Error();
  Error.captureStackTrace(err, callsite);
  var stack = err.stack;
  Error.prepareStackTrace = orig;
  return stack;
};


// 将服务器端返回的数据结构重新封装统一的格式
// {code:200, data: {message: 'some message'}}
function rebuild(res) {
  res = JSON.parse(res);
  if (_.isUndefined(res.code)) {
    return {
      code: 200,
      data: res
    };
  }
  res.code = parseInt(res.code, 10) || 200; // 0 也代表成功
  res.data = res.data2 || res.data || {}; // 奇葩的接口 绑定优惠券
  if (_.isArray(res.data)) {
    res.data = {
      list: res.data
    };
  }
  if (_.isPlainObject(res.data)) {
    res.data.message = res.msg || res.message || res.data.msg || res.data.message;
  }

  delete res.msg;
  delete res.message;
  delete res.data.msg;

  // 防止数据结构异常
  _.forIn(res, function (val, key) {
    if (key !== 'code' && key !== 'data') {
      res.data[key] = val;
      delete res[key];
    }
  });
  return res;
}

exports.request = function (options, unpack) {
  return new Promise(function (resolve, reject) {
    var start = Date.now();
    logger.debug('API-REQ', options);
    request(_.merge({
      gzip: true,
      timeout: 20000
    }, options), function (error, response, body) {
      try {
        var jsonapi = rebuild(body);
        if (!error && response.statusCode === 200) {
          if (unpack !== false) { // 拆包
            if (jsonapi.code === 200) {
              return resolve(jsonapi.data);
            }
            else {
              logger.error(body);
              return reject(jsonapi.data);
            }
          }
          return resolve(jsonapi);
        }
      }
      catch (e) {
        logger.error(options, response, e);
      }
      finally {
        logger.debug('API-RES:', body);
        logger.info('APICost:', {
          url: options.url,
          time: '[' + (Date.now() - start) + 'ms]'
        });
      }

      return reject(error);
    });
  });
};