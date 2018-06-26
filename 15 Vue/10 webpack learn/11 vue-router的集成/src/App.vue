<!-- 以后项目的根组件 -->
<template>
	<div>
		<!-- 1.0 template主要是放html元素的html页面结构		 -->
		<span v-text="msg" class="red"></span>
		<button @click="add(1, 2)">add</button>
		<router-link to="/login">登陆</router-link>
		<router-link to="/register">注册</router-link>

		<!-- 路由占位符 -->
		<router-view></router-view>
	</div>
</template>

<script>
	// 按照实际需要导入相关的方法
	import { add } from './calc.js';
	import { substract } from './calc.js';

	// 负责导出 .vue组件对象（它的本质是一个Vue对象，所以vue中该定义的元素都可以使用）
	// function add(x, y){ console.log( x+y ); }
	// module.exports = { 导出对象的ES5写法}
	export default {
		data(){
			return {
				msg: 'hello vuejs,today! 2017-8-12'
			}
		},
		methods:{
			add: add,  // 这是es5写法，也可以写成 add（只要key 和 value的名字相同）
			substract: substract
		},
		created(){

		}
	}


</script>

<style scoped>
	/*当前页面css样式写在这里，其中scoped表示这个里面写的css代码只是在当前组件页面上有效，不会影响其他组件页面*/
	.red {
		color : red;
	}

</style>

