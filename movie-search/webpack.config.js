const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
const isProduction = options.mode === 'production';

const conf = {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'none' : 'source-map',
    watch: !isProduction,
    entry: './src/script.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js',
    },
    devServer: {
        overlay: true
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }, 
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            favicon: './src/img/favicon.png',
            template: './index.html'
        }),
        new CopyPlugin([
            { from: './src/', to: './' },
        ]),
    ]
}
return conf;
}
