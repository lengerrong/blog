import {Plugin} from '@hapi/hapi'
import * as path from 'path'

export const staticServe: Plugin<{}> = {
    register: async (server) => {
        await server.register(require('@hapi/inert'))
        server.route({
            method: 'GET',
            path: '/static/{param*}',
            handler: {
                directory: {
                    path: path.join(__dirname, 'public/static/'),
                },
            },
            options: {
                cache: {
                    expiresIn: 10 * 24 * 60 * 60 * 1000,
                },
                state: {
                    failAction: 'ignore',
                }
            },
        })
    },
    name: 'staticServe',
    version: '1.0.0'
}

export default staticServe
