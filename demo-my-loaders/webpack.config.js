const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, './dist'),
  },
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, './loaders')],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'my-loader',
          {
            loader: 'sync-loader',
            options: {
              n: 222,
            },
          },
          {
            loader: path.resolve(__dirname, './loaders/async-loader.js'),
            options: {
              n: 111,
            },
          },
        ],
      },
    ],
  },
};
