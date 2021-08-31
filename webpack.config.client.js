const path = require('path')
const packageJson = require('./package.json')
const {rules, resolve, optimization, plugins} = require('./webpack.config.base')

module.exports = (env, args) => {
    return {
        name: 'client',
        target: 'web',
        entry: {
            bundle: './src/client/index.tsx'
        },
        module: {
            rules: [
                ...rules()
            ]
        },
        resolve: {
            ...resolve
        },
        optimization: {
            ...optimization
        },
        plugins: [
            ...plugins({
                title: 'index title',
                filename: `index.${packageJson.version}.html`,
                template: 'src/server/templates/index.hbs'
            }, {
                filename: `css/[name].client.${packageJson.version}.css`,
                chunkFilename: `css/[name].client.${packageJson.version}.css`,
            })
        ],
        output: {
            path: path.resolve(__dirname, 'dist/public/static/client'),
            filename: `js/[name].[contenthash].client.${packageJson.version}.js`,
            chunkFilename: `js/[name].[contenthash].client.${packageJson.version}.js`,
            publicPath: '/static/client',
        }
    }
}
