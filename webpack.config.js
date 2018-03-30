// console.log(process.env.NODE_ENV);
// // dev模式：起服务，不用进行压缩
// // build打包模式：不用起服务，要压缩，代码分离
// const webpack = require('webpack');
// let UglifyPlugin = webpack.optimize.UglifyJsPlugin;
// let baseConfig = { // commonjs规范
//     entry: { // 入口文件
//         'bundle': __dirname + '/src/main'
//     },
//     output: { // 输出
//         'filename': '[name].js',
//         'path': __dirname + '/dist'
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.(js|jsx)$/,
//                 use: ['babel-loader']
//             }
//         ]
//     },
//     plugins: []

// };

// let config = {};
// if (process.env.NODE_ENV == 'development') {
//     config = {
//         ...baseConfig,
//         devServer: {
//             historyApiFallback: true,
//             inline: true,
//             open: true,
//             port: 3000
//         },
//         devtool: 'eval-source-map'
//     }
// }
// if (process.env.NODE_ENV == 'production') { // 生产模式
//     // 往plugins中追加插件
//     baseConfig.plugins.push(new UglifyPlugin())
//     config = {
//         ...baseConfig
//     };
// }
// // console.log(config);
// module.exports = config;
