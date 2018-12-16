const path = require('path')
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const Dotenv = require("dotenv-webpack")
// const CleanWebpackPlugin = require("clean-webpack-plugin")

const IS_PRODUCTION = (process.env.NODE_ENV === 'production' || process.env.WEBPACK_MODE === 'production')


const plugins = [
    // new CleanWebpackPlugin("dist"),
    IS_PRODUCTION ? false: new Dotenv(),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "index.html"),
        chunks: [
            // "phaser",
            "vendor",
            "runtime",
            "index",
        ],
        chunksSortMode: "manual",
    }),
    new webpack.HotModuleReplacementPlugin(),
].filter(Boolean)


module.exports = {
    context: path.resolve(__dirname),
    entry: {
        index: './src/index.tsx',
    },
    output: {
        // publicPath: path.resolve(__dirname),
        filename: '[name].js',
        // publicPath: '/',
        // path: path.resolve(__dirname, 'dist'),
        path: path.resolve(__dirname, './dist'),
        publicPath: IS_PRODUCTION ? './' : '/',
    },
    resolve: {
        extensions: ['.ts','.tsx', '.js'],
        modules: [
            "node_modules",
            path.resolve(__dirname, "src"),
        ],
        alias: {
            // 'phaser-ce': phaser
        },
    },
    plugins: plugins,
    module: {
        rules: [
            {
                type: 'javascript/auto',
                test: /\.(json)/,
                exclude: /(node_modules)/,
                use: [{
                    loader: 'file-loader',
                    options: { 
                        name: '[name].[ext]', 
                        outputPath: "assets/",
                    },
                }],
            },
            { 
                exclude: /node_modules/,
                test: /\.([tj])sx?$/, 
                include: [path.resolve(__dirname, "src")],
                use: [
                    { 
                        loader: 'ts-loader' 
                    }
                ] 
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                query: {
                    cacheDirectory: true,
                    "plugins": [
                        ["@babel/plugin-proposal-function-bind"],
                        ["@babel/plugin-proposal-decorators", { "legacy": true }],
                        ["@babel/plugin-proposal-class-properties", { "loose" : true }]
                    ],
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.(png|jpg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "assets/",
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                // exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('postcss-import')(),
                                require('precss')(), 
                                require('autoprefixer')(),
                            ]
                        }
                    }
                ]
            }
        ],
    },
    optimization: {
        runtimeChunk: {
            name: "runtime",
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all",
                }
            }
        },
    },
    mode: IS_PRODUCTION ? "production" : "development",
    devServer: {
        index: 'index.html',
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9090,
        clientLogLevel: 'error',
        watchContentBase: true,
    },
    devtool: "hidden-source-map",
};