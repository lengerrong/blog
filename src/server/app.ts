import {Server, Request} from '@hapi/hapi'
import * as plugins from "./plugins"
const path = require('path')
const packageJson = require('../../package.json')

const init = async () => {
    const server = new Server({
        port:3000,
        state: {
            strictHeader: false
        }
    })

    await server.register(plugins.staticServe)

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: (request: Request, reply: any) => {
            return reply.file(path.join(__dirname, `public/static/client/index.${packageJson.version}.html`))
        }
    })

    server.route({
        method: 'GET',
        path: '/admin/{param*}',
        handler: function (request, reply: any) {
            return reply.file(path.join(__dirname, `public/static/admin/admin.${packageJson.version}.html`))
        }
    })

    await server.start()
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init()
