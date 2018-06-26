
// 获得包
var gulp = require( 'gulp' );
var concat = require( 'gulp-concat' );
var press = require( 'gulp-uglify' );

gulp.task( 'concat', function () {
    gulp.src( [ 'js/Itcast.Core.js',
                'js/Itcast.Constructor.js',
                'js/Itcast.DOM.js',
                'js/Itcast.Event.js',
                'js/Itcast.Style.js',
                'js/Itcast.Attribute.js' ] )
        .pipe( concat( 'output/Itcast.js' ) )
        .pipe( gulp.dest( './dist' ) );
} );

gulp.task( 'press', function () {
        // return 可以将异步任务变成同步任务 
    return gulp.src( [ 'js/Itcast.Core.js',
                        'js/Itcast.Constructor.js',
                        'js/Itcast.DOM.js',
                        'js/Itcast.Event.js',
                        'js/Itcast.Style.js',
                        'js/Itcast.Attribute.js' ] )
        .pipe( press( 'Itcast.min.js' ) )
        .pipe( gulp.dest( './output' ) );
} );

// 最后一个任务用来执行前面两个任务
gulp.task( 'default', [ 'concat', 'press' ], function () {
    gulp.src( './dist/Itcast.min.js' )
        .pipe( press() )
        .pipe( gulp.dest( './dist' ) );
} );






