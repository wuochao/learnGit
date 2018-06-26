<template>
	<div id="tmpl">
		<!-- 1.0 轮播图 利用mint-ui的swipe实现-->
		<mt-swipe :auto="2000">
			<!-- <mt-swipe-item>1</mt-swipe-item> -->
			<mt-swipe-item v-for="(item, index) in list" :key="index">
				<img v-bind:src="item.img" alt="">
			</mt-swipe-item>
		</mt-swipe>
		<!-- 导航区域：利用MUI的九宫格样式实现 -->
		<div class="mui-content">
	        <ul class="mui-table-view mui-grid-view mui-grid-9">
	            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
	            	<router-link to="/news/newslist">
	                    <span class="mui-icon mui-icon-home"></span>
	                    <div class="mui-media-body">新闻咨询</div>
	                </router-link>
	            </li>
	            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
	            	<router-link to="/photo/photolist">
	                    <span class="mui-icon mui-icon-email"></span>
	                    <div class="mui-media-body">图片分享</div>
	                </router-link>
	            </li>
	            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
	            	<router-link to="/goods/goodslist">
	                    <span class="mui-icon mui-icon-chatbubble"></span>
	                    <div class="mui-media-body">商品购买</div>
	                </router-link>
	            </li>
	            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
	            	<router-link to="/feedback">
	                    <span class="mui-icon mui-icon-location"></span>
	                    <div class="mui-media-body">留言反馈</div>
	                </router-link>
	            </li>
	            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
	            	<router-link to="/video">
	                    <span class="mui-icon mui-icon-search"></span>
	                    <div class="mui-media-body">视频专区</div>
	                </router-link>
	            </li>
	            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
	            	<router-link to="/callme">
	                    <span class="mui-icon mui-icon-phone"></span>
	                    <div class="mui-media-body">联系我们</div>
	                </router-link>
	            </li>
	        </ul> 
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				list : []
			}
		},
		created(){
			// 当页面中的data和methods对象都创建完毕后，会自动调用created
			this.getImgs();
		},
		methods: {
			getImgs(){
				// 实现轮播组件中的数据请求
				// 1.0 确定url
				var url = 'http://www.lovegf.cn:8899/api/getlunbo';
				// 2.0 调用$http.get(url)
				this.$http.get(url).then(function(response){
					// 判断是否异常，如果异常，弹出异常的信息
					if(response.body.status !=0){
						Toast(response.body.message);
						return;
					}
					// 如果请求正常，那么将请求获取的数据赋值给list
					this.list = response.body.message;
				});

			}
		}
	}



</script>


<style scoped>
	.mint-swipe {
		height: 300px;
	}
	.mint-swipe-item {
		/*background-color: red;*/
		width: 100%;
		height: 300px;
	}
	.mint-swipe-item img{
		width: 100%;
	}
	.mui-content, .mui-content ul {
		background-color: #fff;
	}
	.mui-grid-view.mui-grid-9{
		border-top: 0;
		border-left: 0;
	}

	.mui-grid-view.mui-grid-9 .mui-table-view-cell{
		border-right: 0;
		border-bottom: 0;
	}
	.mui-icon-home:before,
	.mui-icon-email:before,
	.mui-icon-chatbubble:before,
	.mui-icon-location:before,
	.mui-icon-search:before,
	.mui-icon-phone:before{
		content:'';
		display: inline-block;
		width: 50px;
		height: 50px;
		background-repeat: round; /* round：背景图像自动缩放直到适应且填充满整个容器。（CSS3） */
	}
	.mui-icon-home:before{
		background-image:url(../../statics/imgs/1.png);
	}
	.mui-icon-email:before{
		background-image: url(../../statics/imgs/2.png);
	}
	.mui-icon-chatbubble:before{
		background-image: url(../../statics/imgs/3.png);
	}
	.mui-icon-location:before{
		background-image: url(../../statics/imgs/4.png);
	}
	.mui-icon-search:before{
		background-image: url(../../statics/imgs/5.png);
	}
	.mui-icon-phone:before{
		background-image: url(../../statics/imgs/6.png);
	}



</style>