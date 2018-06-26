
//导入html-webpack-plugin包，根据模版自动生成index.html
var htmlwp = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js', //指定打包的入口文件
    output: {
        path: __dirname + '/dist', //注意：webpack@1.14.0要求这个路径是一个绝对路径
        filename: 'build.js',
		watch: true
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.scss$/,
            loader: 'style-loader!css-loader!sass-loader'
        }, {
            test: /\.less$/,
            loader: 'style-loader!css-loader!less-loader'
        },{
            test: /\.(png|jpg|gif|ttf)$/,
            loader:'url-loader?limit=20000&name=images/[hash:12].[ext]'
            //limit表示图片的大小为20K是临界值，小于20K的图片均被打包到build.js中去，请求图片就会很快
        }]
    },
    plugins:[
        new htmlwp({
            title: 'Homepage', //生成页面的标题<title></title>，实际上没有效果，这是webpack的bug
            filename:'index.html',//webpack-dev-server在内存中生成的文件名称，自动将build注入到这个页面底部才能实现自动刷新
            template:'template.html' //根据模版文件template.html生成index.html
        })
    ]
}

