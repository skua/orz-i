## orz-i （wordpress的nodejs前端框架）

一路走来玩wordpress已经5年了，伴随当初的欣喜成功进化成前端工程师也近3年

随着node的不断壮大，用node的同学渐渐多了起来。

于是，本着不折腾会死的心理有这么一个打算。把我的[55u.me](http://55u.me)从php的wordpress上移植过来

#没错，用node写！





#config 文件需要 独立配置


重要 需要在wp的wp_post表中增加 createdAt 和 updatedAt 两个字段

在local/config.js中 配置


```js
module.exports = {
  // 服务端口
  port: 8888,
    // 日志
  log: {
    file: '/data/logs/mobile.log', // INFO日志文件位置
    errorfile: '/data/logs/mobile-error.log', // ERROR日志文件位置
  },
  //微信
  wxconfig:{
  	appid : "wx****0697f984****", //appid
    secret: "4ebe****c709b80b7df7ee4639****2c", // 秘钥
  },
    //domain
  domain:"http://orz-i.com",
    // 数据库
  database: {
    host: ' ',
    port: ' ',
    username: ' ',
    password: ' ',
    dbname: ' ',
    dialect: 'mysql',
  },

    //是否线上环境
  isOnline: false,

  //报错页面

  errPage: {
    "404": "../orz-i/modules/common/templates/404.html",
    "500": "../orz-i/modules/common/templates/500.html"
  }

}
```

建议使用pm2做守护进程 ，挂了自己会重启

node run.js 启动项目

 
