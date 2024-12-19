const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: "./src/index.ts",
    target: "node",
    mode: "none",
    output: {
        filename: "index.ts",
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "commonjs",
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
        ],
    },
    externals: [nodeExternals()],
};
