const path = require('path');

let ROOT_PATH = __dirname;

module.exports = {
    mode: "production",
    devtool: "source-map",
    entry: {
        yf: path.resolve(ROOT_PATH, "./src/yf.js"),
    },
    output: {
        filename: "[name].min.js",
        path: path.resolve(ROOT_PATH, "./dist"),
        libraryTarget: "umd",
        library: "yf",
        // libraryExport:'default',
    },
    externals: [
        {
            _: 'lodash',
        }
    ],
};