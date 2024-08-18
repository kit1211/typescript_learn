import { FastifyInstance } from "fastify";
import * as bcrypt from 'bcrypt';
import { hashedPassword } from "../utils/helper";



export default (fastify: FastifyInstance, opts: Dictionary, done: Function) => {
    fastify.post<{ Body: { username: string, password: string } }>('/login', async (request, reply) => {
        const { username, password } = request.body;
        const user = await fastify.prisma.user.findUnique({
            where: {
                username
            }
        });
        if (!user) {
            return reply.code(400).send({
                success: false,
                message: 'User not found'
            });
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return reply.code(400).send({
                success: false,
                message: 'Invalid password'
            });
        }
        const { password: _, ...rest } = user;
        const token = fastify.jwt.sign({
            id: user.id
        });
        return reply.send({
            success: true,
            message: 'Logged in',
            token,
            user: rest
        });
        
        
    });
    fastify.post<{ Body: { username: string, password: string, confirmPassword: string } }>('/register', async (request, reply) => {
        const { username, password, confirmPassword } = request.body;
        if (password !== confirmPassword) {
            return reply.code(400).send({
                success: false,
                message: 'Password does not match'
            });
        }
        const isUsernameExists = await fastify.prisma.user.findUnique({
            where: {
                username
            }
        });
        if (isUsernameExists) {
            return reply.code(400).send({
                success: false,
                message: 'Username already exists'
            });
        }
        const user = await fastify.prisma.user.create({
            data: {
                username,
                password: await hashedPassword(password),
                role: 'USER'
            }
        });
        const { role, ...rest } = user;
        return reply.send({
            success: true,
            message: 'User created',
            user: rest
        });
    });
    fastify.get('/me', { onRequest: fastify.authenticate } , async (request, reply) => {
        return reply.send({
            success: true,
            user: request.user
        });
    });
    done();
};