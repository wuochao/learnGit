/*  处理请求路径的分发
    1、req对象是Class: http.IncomingMessage的实例对象
    2、res对象是Class: http.ServerResponse的实例对象
*/
const http = require('http');
const fs = require('fs');

http.createServer((req,res)=>{
    // req.url可以获取请求服务器的URL中的路径（端口之后部分）
    // res.end(req.url);  http://域名:端口/index.html
    console.log("INDEX");
    if(req.url.startsWith('/index')){
        // write向客户端响应内容，可以写多次
        fs.readFile('./www/about.html', (err, data)=>{
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf8'
            });
            res.end(data);
        });
        // end方法用来完成响应，只能执行一次
        //res.end('index');
    }else if(req.url.startsWith('/about')){
        res.end('about');
    }else{
        res.end('no content');
    }
}).listen(3000,()=>{
    console.log('running...');
});