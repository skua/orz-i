
55u.me迁移记录
==================

orz-i 数据格式只保留wp之前重要字段
账户管理 评论管理以后再补充
* wp_posts
* ID：自增唯一ID
* post_author：对应作者
* post_date：发布时间
* post_content：正文
* post_title：标题
* post_status：文章状态（publish/auto-draft/inherit等）
* post_modified：修改时间
* post_url：URL地址 同时作为页面的key
* post_description：用于seo的描述/微信描述
* post_keywords：用于seo的关键词 
* post_wximg：用于微信缩略图

==================

*七牛同步图片数据
*静态文件cdn.orz-i.com

==================

*启用PM2管理服务
*改为io.js
*review文章删除了一些清理由于几次改版迁移产生的无用class和一些行内样式标签

==================

*增加config文件防止敏感信息提交上去
*增加微信access_token cache

