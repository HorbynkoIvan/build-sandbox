const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: "development",

    //loaders
    module: {
        rules: [
            //Loading js
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
                /*use: [{
                    loader: "babel-loader",
                }]*/
            },
            //Loading images
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        outputPath: 'images',
                        name: '[name]-[sha1:hash:7].[ext]'
                    }
                }]
            },
            //Loading fonts
            {
                test: /\.(ttf|otf|eot|woff|woff2)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        outputPath: 'fonts',
                        name: '[name].[ext]'
                    }
                }]
            },
            //Loading css
            {
                test: /\.(css)$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
                /*use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"}
                ]*/
            },
            //Loading sass/scss
            {
                test: /\.(s[ca]ss)$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
                /*use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "sass-loader"}
                ]*/
            }
        ]
    },

    //plugins
    plugins: [
        new HtmlWebpackPlugin({template: "public/index.html"}),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name]-[hash:8].css',
            chunkFilename: '[id].css',
        }),
    ]
}