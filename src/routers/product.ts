import { FastifyInstance } from "fastify";

export default async (fastify: FastifyInstance, opts: Dictionary, done: Function) => {
    fastify.get('/', async (request, reply) => {
        reply.send({
            success: true,
            message: 'Product route'
        });
    });
    done();
}
// export default router;