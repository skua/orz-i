## orz-i

一路走来玩wordpress已经5年了，伴随当初的欣喜成功进化成前端工程师也近3年

随着node的不断壮大，用node的同学渐渐多了起来。

于是，本着不折腾会死的心理有这么一个打算。把我的[55u.me](http://55u.me)从php的wordpress上移植过来

#没错，用node写！





#config 文件需要 独立配置


orz-i/config/index.js

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
  domain:"http://io.orz-i.com",
  db:{
  	host:"127.0.0.1", //mongo 主机
  	port:"27017",//mongo 端口
  	username:" your user name",
  	password:" your password ",
  	collection:" mongo collection" //mongo 集合
  }
}
