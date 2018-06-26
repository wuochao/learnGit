<template>
	<div class="tmpl">
		<!-- 1.0页面头部 -->
		<mt-header fixed title="vueproject header"></mt-header>
		<!-- 2.0 路由占位 -->
		<router-view></router-view>
		<!-- 3.0 页面底部 -->
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/newslist">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar">
				<span class="mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge">0</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/newsinfo">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
	</div>
</template>

<script>
	export default { //es6导出对象的写法
		data(){		 //等价于es5： data:function(){}
			return {

			}
		},
		methods: {

		},
		created(){

		}
	}

</script>

<style scoped>
/*当前页面的css样式写到这里，其中scoped表示这个里面写的css代码只是在当前组件页面上有效，不会去影响到其他组件页面*/
	.red {
		color: red;
	}


</style>







