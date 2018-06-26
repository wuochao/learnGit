
module.exports = {
    entry: './src/main.js', //指定打包的入口文件
    output: {
        path: __dirname + '/dist', //注意：webpack@1.14.0要求这个路径是一个绝对路径
        filename: 'build.js'
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
        	loader:'url-loader?limit=20000&name=images/[hash:8].[ext]'
        	//limit表示图片的大小为20K是临界值，小于20K的图片均被打包到build.js中去，请求图片就会很快
        }]
    }
}
