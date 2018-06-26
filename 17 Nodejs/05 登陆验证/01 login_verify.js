/*  登录验证功能 */
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const ss = require('./staticServer.js');

http.createServer((req,res)=>{
    // 启动静态资源服务
    if(req.url.startsWith('/www')){
        ss.staticServer(req,res,__dirname);
    }
    console.log(req.url);
    // 动态资源： req.method判断请求方式get/post
    if(req.url.startsWith('/login')){
        // get请求
        if(req.method == 'GET'){
            let param = url.parse(req.url,true).query;   //解析完，取url对象的query属性
            if(param.username == 'admin' && param.password == '123'){
                res.end('get success');
            } else {
                res.end('get failure');
            }
        }
        // post请求
        if(req.method == 'POST'){
            let pdata = '';
            req.on('data',(chunk)=>{
                pdata += chunk;
            });
            req.on('end',()=>{
                let obj = querystring.parse(pdata);
                if(obj.username == 'admin' && obj.password == '123'){
                    res.end('post success');
                }else{
                    res.end('post failure');
                }
            });
        }
    }
}).listen(3000,()=>{
    console.log('running....');
});