/*
 路由（根据请求路径和请求方式进行路径分发处理）
 http的常用请求方式：
 post   添加
 get    查询
 put    更新
 delete 删除

 restful api (一种URL的格式)
 */

const express = require('express');
const app = express();
const router = require('./myrouter.js');

// 直接使用use分发可以处理所有的路由请求
// app.use((req,res)=>{
//     res.send('ok');
// });

// all方法绑定的路由与请求方式无关，实际很少用，除非写一个通用的接口，如：网站维护中 这类的
// app.all('/abc',(req,res)=>{
//     res.end('test router');
// });

app.all('/*', (req, res)=> {
    res.end('网站维护中');
});

// 基本的路由处理，单独处理
const express = require('express');
const app = express();
const router = require('./myrouter.js');
app.get('/', (req, res)=> {
    res.send('get data');
});
app.post('/', (req, res)=> {
    res.send('post data');
});
app.put('/', (req, res)=> {
    res.send('put data');
});
app.delete('/', (req, res)=> {
    res.send('delete data');
});
app.listen(3000, ()=> {
    console.log('running...');
});

// ----------------------------
// route方法可以指定特定的请求方式，与all相比更加灵活
app.route('/hello')
    .get((req, res)=> {
        res.send('get data');
    }).post((req, res)=> {
        res.send('post data');
    });

app.use('/admin', router);


