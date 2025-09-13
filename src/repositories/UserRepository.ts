import { prisma } from "../config/db";
import { PrismaClient, UserRole } from "../generated/prisma";
import { CreateUserInterface } from "../interfaces/UserInterface";

export const UserRepository = {
    async create({ name, email, role, hashedPassword }: CreateUserInterface) {
        return prisma.user.create({
            data: { name, email, role, password: hashedPassword }
        });
    },

    async findByEmail(email: string) {                                                        
        return prisma.user.findUnique({ where: { email } })
    }
}
