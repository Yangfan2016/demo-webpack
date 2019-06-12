/* eslint-disable */

const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PurifyCSS = require('purifycss-webpack');
const glob = require('glob-all');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

const ROOT_PATH = __dirname;

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: 'source-map',
  entry: {
    app: path.resolve(ROOT_PATH, './src/index.js'),
  },
  output: {
    publicPath: !isProd ? "./" : undefined, // cdn 网址或 网站路径
    path: path.resolve(ROOT_PATH, './build'),
    filename: 'static/js/[name].min.js',
    chunkFilename: 'static/js/[name].min.js' // 代码拆分后的文件名
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
        //     priority: 10,
        // },
        // lodash: {
        //     name: 'lodash',
        //     test: /[\\/]node_modules[\\/]lodash[\\/]/,
        //     priority: 9,
        // },
        // vendors: {
        //     name: 'vendors',
        //     test: /[\\/]node_modules[\\/]/,
        //     priority: 1,
        // },
        // default: {
        //     priority: -20,
        //     reuseExistingChunk: true,
        // },
      },
    },
    // Keep the runtime chunk separated to enable long term caching
    runtimeChunk: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              fix: true, // 它会帮你自动修复一些错误，不能自动修复的，还是需要你自己手动修复
            }
          }
        ],
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
                // require('postcss-sprites')({
                //     spritePath:'',
                // })
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
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            outputPath: 'static/fonts',
            name: '[name]-[hash:5].min.[ext]',
          }
        }
      },
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
      // chunks: ['vendors~app','vendors~watch', 'watch', 'app'],
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
    }),
    // 自动加载模块，而不必到处 import 或 require
    new webpack.ProvidePlugin({
      $: 'jquery', // [key]: [npm module]
      jQuery: 'jquery',
    }),
    // HMR 热模块替换
    new webpack.HotModuleReplacementPlugin,
    new webpack.NamedModulesPlugin,
    // PWA
    new WorkboxWebpackPlugin.GenerateSW({
      skipWaiting: true, // 强制等待中的 Service Worker 被激活
      clientsClaim: true, // Service Worker 被激活后使其立即获得页面控制权
    }),
    // 它会将我们打包后的 dll.js 文件注入到我们生成的 index.html
    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(ROOT_PATH, "./dll/_.dll.js"),
    }),
    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(ROOT_PATH, "./dll/jQuery.dll.js"),
    }),
    // 引入我们打包后的映射文件
    new webpack.DllReferencePlugin({
      manifest: path.resolve(ROOT_PATH, "./dll/_.manifest.json"),
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(ROOT_PATH, "./dll/jQuery.manifest.json"),
    }),
  ],
  resolve: {
    // 省略的文件后缀名
    extensions: [' ', '.js', '.json', '.vue', '.scss', '.sass', '.css'],
  },
  devServer: {
    contentBase: path.join(ROOT_PATH, 'build'),
    // 它会告诉 WebpackDevServer 使用这个配置作为根路径
    // 开发环境下，应该总是设置为 '/'
    // It is important to tell WebpackDevServer to use the same "root" path
    // as we specified in the config. In development, we always serve from /.
    publicPath: '/',
    port: 9876,
    // 开启 HMR
    hot: true,

    // By default files from `contentBase` will not trigger a page reload.
    watchContentBase: true,
  },
};
