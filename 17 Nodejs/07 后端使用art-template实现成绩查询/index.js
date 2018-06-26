const http = require('http');
const path = require('path');
const fs = require('fs');
const querystring = require('querystring');
const scoreData = require('./scores.json');
const template = require('art-template');

http.createServer((req,res)=>{
    // 路由（请求路径+请求方式）
    // 查询成绩的入口地址 /query
    if(req.url.startsWith('/query') && req.method == 'GET'){
        let content = template(path.join(__dirname,'view','index.art'),{});
        res.end(content);
    }else if(req.url.startsWith('/score') && req.method == 'POST'){
        // 获取成绩的结果 /score
        let pdata = '';
        req.on('data',(chunk)=>{
            pdata += chunk;
        });
        req.on('end',()=>{
            let obj = querystring.parse(pdata);
            let result = scoreData[obj.code];
            let content = template(path.join(__dirname,'view','result.art'), result);
            res.end(content);
        });
    }else if(req.url.startsWith('/all') && req.method == 'GET'){
        let arr = [];
        for(let key in scoreData){
            arr.push(scoreData[key]);
        }
        // 全部成绩，将数组arr转换成对象形式： list: arr
        let content = template(path.join(__dirname,'view','list.art'),{
            list : arr
        });
        res.end(content);
    }
}).listen(3000,()=>{
    console.log('running....');
});