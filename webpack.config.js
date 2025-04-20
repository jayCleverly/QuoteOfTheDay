const path = require('path');

module.exports = {
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.ya?ml$/,
                type: "json",
                use: 'yaml-loader'
            }
        ],
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs'
    },

    mode: 'production',

    devtool: 'inline-source-map',

    optimization: {
        usedExports: false,
    }
};