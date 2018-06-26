
// 定义自己的模块，设置一个情景, 利用 模板渲染一个列表

// 依赖模块 jquery、template-web，回调函数里面参数 $, template
define(['jquery', 'template-web'], function($, template){
	//定义模版template中的数据（对象形式)
	var obj = {
		title: '前端基本功',
		list: ['HTML语言','CSS技巧','JavaScript基础','面向对象']
	};

	//将数据加载到模版中，并以字符串形式返回给html
	var html = template('tpl', obj);

	//加载到页面中
	$('#container').html(html);
});




