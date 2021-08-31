const adminConfig = require('./webpack.config.admin')
const clientConfig = require('./webpack.config.client')
const serverConfig = require('./webpack.config.server')

module.exports = (env, args) => [adminConfig(env, args), clientConfig(env, args), serverConfig(env, args)]
