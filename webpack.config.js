const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
    mode: "development",
    entry: './app',
    output: {
    filename: './src/js/bundle.js',
    path: path.resolve(__dirname, './'),
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: './src/css/main.min.css',
          chunkFilename: '[id].css',
          ignoreOrder: false,
          linkType: 'text/css'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: '/template/index.html'
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 5000,
            server: { baseDir: ['./'] },
            files: ['./*'],
            notify: false
          }),
      ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: './',
                        },
                    },
                    'css-loader',
                ],
            },
            {
                test:/\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    },
    optimization: {
        minimizer: [
          new CssMinimizerPlugin(),
        ],
    },
    watch: true
};