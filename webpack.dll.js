const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    _: ['lodash'],
    jQuery: ['jquery'],
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, './dll'),
    library: '[name]',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      name: '[name]',
      path: path.resolve(__dirname, './dll/[name].manifest.json'),
    }),
  ],
};
