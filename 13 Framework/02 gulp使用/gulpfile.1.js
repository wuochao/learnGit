// 在 该文件中写任何代码都是 gulp 去处理文件的代码
// 它好比 页面项目中的 html 文件
// html 文件可以运行渲染, 同时也是 js 程序的载体
// gulpfile 和他非常类似, gulp 提供的是一个载体, 也就是说它只实现
// 需要处理什么文件, 保存到那个地方等功能. 
// 具体的处理办法由其他的包去完成


// 在 gulpfile 中要使用 gulp 就需要将 gulp 引进来
// 和 html 一模一样, html 中要使用 js 就要将 js 文件引进来

var gulp = require( 'gulp' );
// 相当于 <script src="gulp"></script>


// gulp 需要创建 任务
gulp.task( '任务名', function () {
    // 执行对应的任务就是在执行这个函数

} );

gulp.task( 'app', function () {
    console.log( '我是一个 app 的任务' );
} );

// 在 gulp 中有一个默认的任务 default
gulp.task( 'default', function () {
    console.log( '默认的任务' );
});


// 将 js 文件夹下的所有 js 文件合并
var concat = require( 'gulp-concat' );
gulp.task( 'cat', function () {

    // 确定是哪个文件
    // gulp.src( './js/*.js' )
    gulp.src( [ './js/Itcast.core.js',
                './js/Itcast.ctor.js',
                './js/Itcast.dom.js',
                './js/Itcast.event.js',
                './js/Itcast.style.js',
                './js/Itcast.attr.js' ] )
        // 要使用 gulp-concat 合并
        .pipe( concat( 'bundle.js' ) )
        // 最后将处理好的文件保存在 dist 文件夹下
        .pipe( gulp.dest( './dist' ) );
} );




// 压缩文件
var  press = require( 'gulp-uglify' );
gulp.task( 'press', function () {
    gulp.src( './dist/*.js' )
        .pipe( press() )
        .pipe( gulp.dest( './output' ) );
} );



// 先执行数组中所有的 任务, 待任务执行完成以后 在来执行当前 task 中的任务
// gulp.task( '任务名', [ '任务名', ... ], function () {
//     // ...
// } )























