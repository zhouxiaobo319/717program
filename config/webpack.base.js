// dev模式：起服务，不用进行压缩
// build打包模式：不用起服务，要压缩，代码分离
// let path = require('path');

let dir = process.cwd(); // 获取当前程序运行的目录

let baseConfig = { // commonjs规范
    entry: { // 入口文件
        'bundle': dir + '/src/main'
    },
    output: { // 输出
        'filename': '[name].js',
        'path': dir + '/dist'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(eot|svg|ttf|woff)$/,
                use: ['url-loader']
            },
            {
                test: /\.(jpg|png|gif|jpeg)$/,
                use: ['url-loader']
            }
        ]
    },
    plugins: [],
    resolve: {
        extensions: ['.js', '.jsx']
    }
};

module.exports = baseConfig;
