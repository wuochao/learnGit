
// 1 获取dom元素
var v1 = document.querySelector('#v1');
var v2 = document.querySelector('#v2');
var bt = document.querySelector('#bt');
var res = document.querySelector('#res');

// 2 导入site.css、site1.scss
require('../statics/css/site.css');
require('../statics/css/site1.scss');

bt.onclick = function(){
    "use strict";
    // 获取两个输入框的值
    var v1value = parseFloat(v1.value);
    var v2value = parseFloat(v2.value);
    // 调用引入的add方法
    var add = require('./calc.js');
    res.value = add(v1value, v2value);
};