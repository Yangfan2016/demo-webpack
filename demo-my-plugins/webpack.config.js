const path = require('path');
const CopyrightWebpackPlugin = require('./plugins/copyright-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new CopyrightWebpackPlugin('copyright@2019 yangfan'),
  ],
};
