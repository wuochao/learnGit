/**
 * data-main="./src/moduleA.js" 表示默认搜索路径是在 moduleA.js 文件的所在文件夹
 * 因此 moduleB的路径写法是相对于 moduleA.js所在文件夹的路径来写的
 */


define ( [ 'mainModule/moduleB' ], function () {
	console.log( 'moduleA' );
} );