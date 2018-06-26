//写moduleB的路径时，按照require.config中的baseUrl和path定义的“键值对”路径形式书写

define ( [ 'moduleB' ], function () {
	console.log( 'moduleA' );
} );