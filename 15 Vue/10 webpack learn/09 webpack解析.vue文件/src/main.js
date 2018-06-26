// 1.0 导入vue核心包
// 凡是使用npm安装的包，引入的时候都不需要写相对路径，只需要写包名即可
import Vue from 'vue';

// 2.0 导入App.vue的vue对象
import App from './App.vue';

// 3.0 利用Vue对象进行解析渲染
new Vue({
    el: '#app',
    // render:function(create){ return create(App)} //es5的写法
    render: c => c(App) // es6的函数写法 =>：goes to
});
