/* 图书管理系统-入口文件  */
const path = require('path');
const express = require('express');
const app = express();
const template = require('art-template');
const bodyParser = require('body-parser');

/*自定义router*/
const router = require('./router.js');

// 1 启动静态资源服务
app.use('/www',express.static('public'));

// 2  设置模板引擎
// 2.1 设置模板的路径
app.set('views',path.join(__dirname,'views'));
// 2.2 设置模板的引擎
app.set('view engine','art');
// 2.3 使express兼容art-template模板引擎
app.engine('art', require('express-art-template'));

// 3 处理请求参数
// 3.1 挂载参数处理中间件（post）
app.use(bodyParser.urlencoded({ extended: false }));
// 3.2 处理json格式的参数
app.use(bodyParser.json());

// 4 启动服务器功能
// 4.1 配置路由
app.use(router);
// 4.2 监听端口
app.listen(3000,()=>{
    console.log('running...');
});




