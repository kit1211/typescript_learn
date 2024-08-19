import fastify, { FastifyInstance, FastifyPluginAsync } from 'fastify';

class Server {
    fastify: FastifyInstance;
    constructor() {
        this.fastify = fastify({ logger: true, trustProxy: true, disableRequestLogging: true });
    }
    async start() {

        this.fastify.get('/', (request, reply) => {
            reply.send({
                msg: 'Hi'
            });
        });
        
        // import plugins
        this.fastify.register(import('./plugins/prisma'));
        this.fastify.register(import('@fastify/jwt'), { secret: 'supersecret' });
        this.fastify.register(import('./plugins/authenticate'));

        // import router and register
        this.fastify.register(import('./routers/api'), { prefix: '/api' });
        this.fastify.register(import('./routers/product'), { prefix: '/product' });
        this.fastify.register(import('./routers/auth'), { prefix: '/auth' });

        await this.fastify.listen({
            host:"0.0.0.0",
            port: 3000
        })

    }
}

void new Server().start();

declare global {
    type Dictionary<V = any, K extends string | symbol = string> = Record<K, V>;
}
