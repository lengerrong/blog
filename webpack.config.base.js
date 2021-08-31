const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const rules = (options = {}) => [
    {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
    },
    {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
    },
    {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
    }
]

const resolve = {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    modules: ['src/client', 'src/server', 'src/admin', 'src', 'node_modules'],
    plugins: [new TsconfigPathsPlugin()]
}

const optimization = {
    splitChunks: {
        minSize: 0,
        maxAsyncRequests: 10,
        maxInitialRequests: 15,
        cacheGroups: {
            vendor: {
                chunks: 'initial',
                test: /node_modules/,
                name: 'vendor'
            }
        }
    }
}

const plugins = (htmlWebpackOptions= {}, miniCssOptions = {}) => [
    new HtmlWebpackPlugin(htmlWebpackOptions),
    new MiniCssExtractPlugin(miniCssOptions)
]

module.exports = {
    rules,
    resolve,
    optimization,
    plugins
}
