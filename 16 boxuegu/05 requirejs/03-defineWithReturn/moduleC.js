//一个非常简单的模块，该模块依赖模块B
define(['moduleB'], function(){
	console.log('moduleC start');
	console.log( arguments );
	console.log('moduleC end');
});

