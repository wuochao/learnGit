
module.exports = {
    entry: './src/main.js', //指定打包的入口文件
    output: {
        path: __dirname + '/dist', //注意：webpack@1.14.0要求这个路径是一个绝对路径
        filename: 'build.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },{
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    }
}

