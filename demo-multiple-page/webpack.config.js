const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

const config = {
  mode: 'production',
  entry: {
    index: path.resolve(__dirname, './src/index.js'),
    login: path.resolve(__dirname, './src/login.js'),
  },
  output: {
    filename: '[name]-[chunkhash].min.js',
    path: path.resolve(__dirname, './dist'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: 1,
        },
        default: {
          name: 'common',
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin(),
  ],
};

Object.keys(config.entry).forEach((key) => {
  config.plugins.push(new HtmlWebpackPlugin({
    filename: `${key}.html`,
    template: path.resolve(__dirname, `./public/${key}.html`),
    chunks: ['vendors', 'common', key],
  }));
});

module.exports = config;
