const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ROOT_PATH = __dirname;

module.exports = {
    mode: "development",
    entry: path.resolve(ROOT_PATH, './src/index.js'),
    output: {
        publicPath:"./", // cdn 网址或 网站路径
        path: path.resolve(ROOT_PATH, './build'),
        filename: '[name].min.js',
        chunkFilename: '[name]-chunk.min.js' // 代码拆分后的文件名
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                // commons: {
                //     name: "commons",
                //     minSize: 0,
                //     minChunks: 2,
                //     priority: 12,
                //     reuseExistingChunk: true,
                // },
                // jquery: {
                //     name: 'jquery',
                //     test: /[\\/]node_modules[\\/]jquery[\\/]/,
                //     priority: 9,
                // },
                // lodash: {
                //     name: 'lodash',
                //     test: /[\\/]node_modules[\\/]lodash[\\/]/,
                //     priority: 10,
                // },
                // vendors: {
                //     name: 'vendors',
                //     test: /[\\/]node_modules[\\/]/,
                //     priority: -10,
                // },
                default: {
                    name: "d",
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin,
        new HtmlWebpackPlugin({
            template: path.resolve(ROOT_PATH, './public/index.html'),
            filename: 'index.html',
            title: 'App',
            meta: {
                'referrer': 'never',
                'theme-color': '#000000',
            },
            minify: {
                removeComments: true,
                // removeAttributeQuotes: true,
                collapseWhitespace: true, // 删除空白符与换行符
                minifyCSS: true, // 压缩内联样式
                minifyJS: true, // 压缩内联脚本
            },
        })
    ],
};