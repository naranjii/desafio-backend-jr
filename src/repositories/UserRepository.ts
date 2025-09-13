import { prisma } from "../config/db";
import type { CreateUserInterface } from "../interfaces/UserInterface";

export const UserRepository = {
	async create({ name, email, role, hashedPassword }: CreateUserInterface) {
		return prisma.user.create({
			data: { name, email, role, password: hashedPassword },
			omit: { password: true },
		});
	},

	async findByEmail(email: string) {
		return prisma.user.findUnique({ where: { email } });
	},
};
