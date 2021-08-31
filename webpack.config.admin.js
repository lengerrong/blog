const path = require('path')
const packageJson = require('./package.json')
const {rules, resolve, optimization, plugins} = require('./webpack.config.base')

module.exports = (env, args) => {
    return {
        name: 'admin',
        target: 'web',
        entry: {
            bundle: './src/admin/index.tsx'
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
                title: 'admin title',
                filename: `admin.${packageJson.version}.html`,
                template: 'src/server/templates/admin.hbs'
            }, {
                filename: `css/[name].admin.${packageJson.version}.css`,
                chunkFilename: `css/[name].admin.${packageJson.version}.css`,
            })
        ],
        output: {
            path: path.resolve(__dirname, 'dist/public/static/admin'),
            filename: `js/[name].[contenthash].admin.${packageJson.version}.js`,
            chunkFilename: `js/[name].[contenthash].admin.${packageJson.version}.js`,
            publicPath: '/static/admin',
        }
    }
}
