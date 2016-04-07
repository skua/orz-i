
55u.me迁移记录
==================

orz-i 数据格式只保留wp之前重要字段
账户管理 评论管理以后再补充

* author：对应作者
* date：发布时间 同时作为分页排序
* content：正文
* title：标题
* status：文章状态（publish/auto-draft/inherit等）
* modified：修改时间
* url：URL地址 同时作为页面的key
* description：用于seo的描述/微信描述
* keywords：用于seo的关键词 
* wximg：用于微信缩略图

==================

*七牛同步图片数据blog
*静态文件cdn.orz-i.com

==================

*启用PM2管理服务
*改为io.js
*review文章删除了一些清理由于几次改版迁移产生的无用class和一些行内样式标签

==================

*增加config文件防止敏感信息提交上去
*增加微信access_token cache


==================

*增加静态文件合并压缩及本地文件调用
*增加七牛上传模块
*微信授权模块
*链接mongodb
*日志目录本地

===================

*access_token变更为全局对象，不再存在本地
*socket双屏demo
*静态文件版本号
*本地配置文件
*链接mysql

===================

*爬虫

===================

*混淆加密js
*redis
*页面压缩去空格
*错误页面处理
*gulp

===================