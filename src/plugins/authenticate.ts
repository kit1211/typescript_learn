import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
declare module 'fastify' {
    interface FastifyInstance {
        authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    }
}
declare module '@fastify/jwt' {
    interface FastifyJWT {
        user: {
            id: number;
        }
    }
}

const authenticate: FastifyPluginAsync = fp(async (fastify, opts) => {
    fastify.decorate('authenticate', async (request, reply) => {
        const data = await request.jwtVerify<{
            id: number;
        }>();
        if (!data) {
            return reply.code(401).send({
                success: false,
                message: 'Unauthorized'
            });
        }
        const user = await fastify.prisma.user.findUnique({
            where: {
                id: data.id
            }, select: {
                id: true,
                username: true,
                role: true
            }
        });
        if (!user) {
            return reply.code(401).send({
                success: false,
                message: 'Unauthorized'
            });
        }
        request.user = user;
    });
});

export default authenticate;