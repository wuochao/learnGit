/*
    参数处理
*/
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
// 挂载内置中间件
app.use(express.static('public'));

// 挂载参数处理中间件（post）
app.use(bodyParser.urlencoded({ extended: false }));
// 处理json格式的参数
app.use(bodyParser.json());

// 处理get提交参数
app.get('/login',(req,res)=>{
    let data = req.query;
    console.log(data);
    res.send('get data');
});

// 处理post提交参数
app.post('/login',(req,res)=>{
    let data = req.body;
    // console.log(data);
    if(data.username == 'admin' && data.password == '123'){
        res.send('success');
    }else{
        res.send('failure');
    }
});

app.put('/login',(req,res)=>{
    res.end('put data');
});

app.delete('/login',(req,res)=>{
    res.end('delete data');
});

app.listen(3000,()=>{
    console.log('running...');
});