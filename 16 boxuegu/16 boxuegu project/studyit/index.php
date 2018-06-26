<?php

	//模拟下：页面的url请求
	//studyit.com							->  /views/index/index.html
	//studyit.com/index.php 				->  /views/index/index.html
	//studyit.com/index.php/login 			->  /views/index/login.html
	//studyit.com/index.php/repass 			->  /views/index/repass.html
	//studyit.com/index.php/teacher/list	->  /views/teacher/list.html
	//studyit.com/index.php/user/add		->  /views/user/add.html
	//使用php实现路由，我们约定：
	//如果url后面什么都没有时，或者写的是： index.php ，那么显示 /views/index/index.html
	//如果url后面只有1个名字时，那么显示 /views/index目录下对应的html页面
	//如果url后面有2个名字时，那么将其连接起来，显示 /views目录下对应（名字1）的文件夹里面的对应（名字2）的html页面

	//利用 $_SERVER 打印在控制台中，可以发现 REQUEST_URL比较容易所有的url的数据，我们不使用它，作为练习exercise完成
	//而在博学谷项目中，我们采用 PATH_INFO实现路由，PATH_INFO的特点： 只会拿到 index.php 后面的内容，
	//同时，如果页面没有编写任何文件路径，那么就不存在该属性

	$pathInfoExists = array_key_exists('PATH_INFO', $_SERVER);
	if($pathInfoExists){
		//echo "有数据：".$_SERVER['PATH_INFO'];
		$path_info = $_SERVER['PATH_INFO'];
	} else {
		//echo "没有数据：应该显示主页： /view/index/index.html";
		$path_info = '/';
	}

	//总结归纳： 无论页面有没有数据，都可以将其划定为有数据，如果没有将其设置为 /，那么路径可以归纳为3种情况：
	// （1） 只有一个 /        
	// （2） /后面只有1个名字
	// （3） /后面有2个名字
	//使用类似于split方法将其分割，PHP中的explode
	
	//开始之前，要将 / 移除 ，使用substr方法
	$path_info = substr($path_info, 1);

	$path_infos = explode('/',  $path_info);
	//上面这句代码的结果也有3种情况：（因为有3种情况的数据源）
	// （1） ['']
	// （2） ['名字']
	// （3） ['名字1','名字2']
	// 判断字符串的长度，使用strlen()
	if(strlen($path_infos[0]) == 0){
		//第1种情况，没有输入任何路径，默认显示的是主页
		$path =  'index';
		$filename = 'index';
	} elseif(count($path_infos) == 2) {
		//输入的是2个名字
		$path = $path_infos[0];
		$filename = $path_infos[1];
	} else {
		//输入的一个名字，显示index下的对应页面
		$path = 'index';
		$filename = $path_infos[0];
	}

	//测试下
	//echo './views/'.$path.'/'.$filename.'.html';
	include('./views/'.$path.'/'.$filename.'.html');

	//include(文件的路径)： 可以将文件读取出来并放到当前位置。
	//提供一个功能，无论访问什么页面都是通过这个php文件来实现的导航
	//另外，需要使用php复用页面结构

?>