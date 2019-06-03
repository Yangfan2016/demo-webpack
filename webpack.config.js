const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PurifyCSS = require('purifycss-webpack');
const glob = require('glob-all');

const ROOT_PATH = __dirname;

module.exports = {
    // mode: "development",
    devtool: 'source-map',
    entry: path.resolve(ROOT_PATH, './src/index.js'),
    output: {
        publicPath: "./", // cdn 网址或 网站路径
        path: path.resolve(ROOT_PATH, './build'),
        filename: 'static/js/[name].min.js',
        chunkFilename: 'static/js/[name]-chunk.min.js' // 代码拆分后的文件名
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
                jquery: {
                    name: 'jquery',
                    test: /[\\/]node_modules[\\/]jquery[\\/]/,
                    priority: 10,
                },
                lodash: {
                    name: 'lodash',
                    test: /[\\/]node_modules[\\/]lodash[\\/]/,
                    priority: 9,
                },
                vendors: {
                    name: 'vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 1,
                },
                default: {
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
            },
            {
                test: /\.(sc|sa|c)ss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // 在为css文件配置 loader时， 添加 publicPath 属性。 
                            // 这样做， 我们在图片打包时， 仍会将图片复制在 /dist/images/ 文件夹之下， 
                            // 但是 在css文件中引用时， 会将路径替换为 publicPath + name
                            publicPath: '../../',
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // @import 应用前 n 个 loader
                            // 0 => no loaders (default); 
                            // 1 => postcss-loader; 
                            // 2 => postcss-loader, sass-loader
                            importLoaders: 2,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                // 加 前缀
                                require('autoprefixer'),
                                // 生成雪碧图
                                require('postcss-sprites')({
                                    // spritePath:'',
                                })
                            ],
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        outputPath: 'static/images',
                        name: '[name]-[hash:5].min.[ext]',
                    }
                }
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
        }),
        // 抽离 css 为独立文件
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].min.css',
            chunkFilename: 'static/css/[id].min.css',
        }),
        // 压缩 css 文件
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'), //用于优化\最小化 CSS 的 CSS处理器，默认为 cssnano
            cssProcessorOptions: { safe: true, discardComments: { removeAll: true } }, //传递给 cssProcessor 的选项，默认为{}
            canPrint: true, //布尔值，指示插件是否可以将消息打印到控制台，默认为 true
        }),
        // css tree shaking
        new PurifyCSS({
            paths: glob.sync([
                // 要做 CSS Tree Shaking 的路径文件
                path.resolve(ROOT_PATH, './public/*.html'), // 请注意，我们同样需要对 html 文件进行 tree shaking
                path.resolve(ROOT_PATH, './src/*.js')
            ])
        })
    ],
    resolve: {
        // 省略的文件后缀名
        extensions: [' ', '.js', '.json', '.vue', '.scss', '.sass', '.css'],
    }
};