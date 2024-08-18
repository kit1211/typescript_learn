import fp from 'fastify-plugin';
import { PrismaClient } from "@prisma/client";
import { FastifyPluginAsync } from "fastify";

declare module 'fastify' {
    interface FastifyInstance {
        prisma: PrismaClient;
    }
}

const plugins: FastifyPluginAsync = fp(async (server, opts) => {
    const prisma = new PrismaClient();

    await prisma.$connect();
    server.log.info('Prisma connected');
    server.decorate('prisma', prisma);
    server.addHook('onClose', async (instance) => {
        await instance.prisma.$disconnect();
    });
});


export default plugins;