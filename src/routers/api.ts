import { FastifyInstance } from "fastify";

const router = (fastify: FastifyInstance, opts: Dictionary, done: Function) => {
    fastify.get('/', async (request, reply) => {
        reply.send({
            hello: 'world'
        });
    });
    
    fastify.get<{ Params: { id: string } }>('/:id', async (request, reply) => {
        reply.send({
            hello: request.params?.id
        });
    });

    fastify.post<{ Body: { username: string, password: string }}>('/', async (request, reply) => {
        reply.send({
            success: true,
            message: 'Post request',
            payload: request.body
        });
    });
    done();
};

export default router;