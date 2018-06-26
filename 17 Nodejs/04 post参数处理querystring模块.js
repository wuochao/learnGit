/* post参数处理 */

//const querystring = require('querystring');
// parse方法的作用就是把字符串转成对象
//let param1 = 'username=lisi&password=123';
//let obj1 = querystring.parse(param1);
//console.log(obj1);  //打印 { username: 'lisi', password: '123' }
// stringify的作用就是把对象转成字符串


//const querystring = require('querystring');
//let obj2 = {
//    flag : '123',
//    abc : ['hello','hi']
//}
//let str2 = querystring.stringify(obj2);
//console.log(str2); //打印 flag=123&abc=hello&abc=hi
//let param = 'foo=bar&abc=xyz&abc=123';


const querystring = require('querystring');
const http = require('http');
http.createServer((req,res)=>{
    if(req.url.startsWith('/login')){
        let pdata = '';
        req.on('data',(chunk)=>{
            // 每次获取一部分数据
            pdata += chunk;
        });

        req.on('end',()=>{
            // 这里才能得到完整的数据
            console.log(pdata);
            let obj = querystring.parse(pdata);
            res.end(obj.username+'-----'+obj.password);
        });
    }
}).listen(3000,()=>{
    console.log('running...');
})