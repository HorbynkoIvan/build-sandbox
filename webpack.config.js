const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = (env = {}) => {
    console.log(env)
    const {mode = 'development'} = env;
    const isProd = mode === 'production';
    const isDev = mode === 'development';

    const getStyleLoaders = () => {
        return [isProd ? MiniCssExtractPlugin.loader : "style-loader", "css-loader"]
    }
    const getPlugins = () => {
        const plugins = [new HtmlWebpackPlugin({template: "public/index.html"})]

        if (isProd) {
            plugins.push(
                new MiniCssExtractPlugin({
                    // Options similar to the same options in webpackOptions.output
                    // both options are optional
                    filename: '[name]-[hash:8].css',
                }))
        }
        return plugins;
    }
    return {
        mode: isProd ? 'production' : isDev && 'development',
        output: {
            filename: isProd ? 'main-[hash:8].js' : undefined
        },

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
                    use: getStyleLoaders()
                    /*use: [
                        {loader: "style-loader"},
                        {loader: "css-loader"}
                    ]*/
                },
                //Loading sass/scss
                {
                    test: /\.(s[ca]ss)$/,
                    use: [...getStyleLoaders(), "sass-loader"]
                    /*use: [
                        {loader: "style-loader"},
                        {loader: "css-loader"},
                        {loader: "sass-loader"}
                    ]*/
                }
            ]
        },

        //plugins
        plugins: getPlugins(),

        //devServer
        devServer: {
            open: true,
            port: 9000
        }
    }
}