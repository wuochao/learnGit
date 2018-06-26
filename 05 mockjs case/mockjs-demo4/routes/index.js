var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/mockjs', function(req, res, next) {
  var Mock = require('mockjs')
  var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
    }]
  });
  var ret = JSON.stringify(data, null, 4);
  // 输出结果
  console.log(ret);
  res.render('index', { title: ret });
});

router.get('/mockapi', function(req, res, next) {
  var Mock = require('mockjs')
  var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
    }]
  });
  var ret = JSON.stringify(data, null, 4);
  // 输出结果
  console.log(ret);
  res.send(ret);
});

module.exports = router;
