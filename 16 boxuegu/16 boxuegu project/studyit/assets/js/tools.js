//定义一个tools模块，来提供工具方法
define(['jquery'], function($){
	// 封装菜单高亮函数
	var setMenu = function( urlpart ){
		//先获得当前页面的 pathname
		var pathname = urlpart || location.pathname;

		// 在菜单的a标签中找到对应href的取值为pathname的a标签
		$('.navs li a').toArray().filter(function(dom){
			//判断获取的dom元素的pathname是否与给定的pathname一致
			return dom.pathname == pathname;
		}).forEach(function(dom){
			$(dom).addClass('active');
		});

	};

	var expandMenu = function(){
		$('.aside a + ul').show();
	};

	//封装获取url地址的函数
	var getSearch = function(){
		var temp = {};
		var search = location.search; //系统给出的search是带有问号？
		if(search.length === 0){  //不带参数
			return temp;
		} else { //带有参数，使用slice截取除去？以外的内容，并用连字符& 分隔
			// search形式： ?k1=v1&k2=v2&k3=v3
			search.slice(1).split('&').forEach(function( item ){
				var kv = item.split('=');
				temp[kv[0]] = kv[1];
			});

			return temp;
		}

	};

	return {
		setMenu: setMenu,
		expandMenu: expandMenu,
		getSearch: getSearch
	}

});


