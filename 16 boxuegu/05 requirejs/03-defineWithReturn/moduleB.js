//一个非常简单的模块，该模块依赖模块A，且返回一个数据（字符串）
define(['moduleA'], function(){
	console.log('moduleB start');
	console.log( arguments );
	console.log('moduleB end');
	return '一个由 模块B 返回的字符串';
});

