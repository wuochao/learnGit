/*
    初步实现服务器功能
*/
const express = require('express');
const app = express();


// app.get('/',(req,res)=>{
//     res.send('ok');
// }).listen(3000,()=>{
//     console.log('running...');
// });
// ----------------------------------
let server = app.get('/',(req,res)=>{
    res.send('创建服务器成功');
});
server.listen(3000,()=>{
    console.log('running...');
});



