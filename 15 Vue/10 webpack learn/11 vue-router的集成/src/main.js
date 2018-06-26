// 1.0 导入vue的核心包
import Vue from 'vue';

// 2.0 导入App.vue的vue对象
import App from './App.vue';

// 3.0 将vue-router集成到这个项目中
import vueRouter from 'vue-router';

// 3.0.1 将vueRouter 对象绑定到Vue对象上
Vue.use(vueRouter);

// 3.0.2 导入路由规则对应的组件对象
import login from './components/account/login.vue';
import register from './components/account/register.vue';

// 3.0.3 定义路由的规则
var router = new vueRouter({
	routes: [
		{
			path: '/login',
			component: login
		},
		{
			path: '/register',
			component: register
		}
	]
});

// 4.0 利用vue对象进行解析渲染
 new Vue({
 	el: '#app',   
 	router: router, //使用路由对象的实例
 	// render:function(create){ return create(App); }  //这是es5 写法
 	render: c=>(App)  // ES6函数的写法    =>  goes to
 });


