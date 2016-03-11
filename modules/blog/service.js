var contentList = require('../../config/blogdb').contentList;


exports.findContent = function(post_name) {
  return contentList.findAll({
    where: {
      post_status: "publish",
      post_name: post_name
    }
  }, {
    raw: true
  }).then(function(list) {
    return list[0];
  });
};


exports.findPublish = function() {
  return contentList.findAll({
    where: {
      post_status: "publish",
    }
  }, {
    raw: true
  }).then(function(list) {
    var list = list.sort(orderBy('post_date'));
    list = list.slice(-10).reverse();
    return list;
  });
};



function orderBy(num) { //排序函数升序，调用时指定排序列
  return function(object1, object2) {
    var val1 = object1[num];
    var val2 = object2[num];
    if (val1 < val2) return -1;
    else if (val1 > val2) return 1;
    else return 0;
  }
}



exports.findPublishByGt = function(post_date) {
  return contentList.findAll({
    where: {
      post_status: "publish",
      post_date: {
        $gt: post_date
      }
    }
  }, {
    raw: true
  }).then(function(list) {
    var list = list.sort(orderBy('post_date'));
    return list[0];
  });
};

exports.findPublishByLt = function(post_date) {
  return contentList.findAll({
    where: {
      post_status: "publish",
      post_date: {
        $lt: post_date
      }
    }
  }, {
    raw: true
  }).then(function(list) {
    var list = list.sort(orderBy('post_date'));
    var maxNum = list.length;
    return list[maxNum - 1];
  });
};