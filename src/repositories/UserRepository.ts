import { prisma } from "../config/db";
import { PrismaClient, UserRole } from "../generated/prisma";

export const UserRepository = {
    async create({ name, email, role, hashedPassword }: {                                       // => POST /auth/register
        name: string, email: string, role: UserRole, hashedPassword: string
    }) {
        return prisma.user.create({
            data: { name, email, role, password: hashedPassword }
        });
    },

    async findByEmail(email: string) {                                                          // => POST /auth/login
        return prisma.user.findUnique({ where: { email } })
    }
}