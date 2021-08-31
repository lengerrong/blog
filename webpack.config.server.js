const path = require('path')
const {rules, resolve, optimization} = require('./webpack.config.base')

module.exports = (env, args) => {
    return {
        name: 'server',
        target: 'node',
        entry: {
            bundle: './src/server/app.ts'
        },
        module: {
            rules: [
                ...rules()
            ]
        },
        resolve: {
            ...resolve
        },
        node: {
            global: false,
            __dirname: false,
            __filename: false,
        },
        output: {
            path: path.resolve(__dirname, 'dist/'),
            filename: `app.js`,
        }
    }
}
