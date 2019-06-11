const path = require('path');

let ROOT_PATH = __dirname;

module.exports = {
    mode: "production",
    devtool: "source-map",
    entry: {
        yf: path.resolve(ROOT_PATH, "./src/yf.ts"),
    },
    output: {
        filename: "[name].min.js",
        path: path.resolve(ROOT_PATH, "./test"),
        libraryTarget: "umd",
        library: "yf",
        libraryExport: 'default',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                }
            }
        ],
    },
    externals: [
        {
            lodash: '_',
        }
    ],
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
    },
};

