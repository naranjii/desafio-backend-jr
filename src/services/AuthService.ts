import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/UserRepository";
import { UserRole } from "../generated/prisma";
import { RegisterDto } from "../dtos/auth.dto";
import { ConflictError } from "../errors/conflict.error";
import { NotFoundError } from "../errors/notFound.error";
import { AuthenticationError } from "../errors/authentication.error";

export async function register(data: RegisterDto) {
	const { email, name, password } = data;
	const user = await UserRepository.findByEmail(email);
	if (user) throw new ConflictError("Email already in use");
	const hashed = await bcrypt.hash(password, 10);
	return UserRepository.create({
		name,
		email,
		role: "consultant",
		hashedPassword: hashed,
	});
}

export async function login(email: string, password: string) {
	const user = await UserRepository.findByEmail(email);
	if (!user) throw new NotFoundError("User not found");
	const valid = await bcrypt.compare(password, user.password);
	if (!valid) throw new AuthenticationError("Invalid email or password");

	return jwt.sign(
		{ id: user.id, role: user.role },
		process.env.JWT_SECRET || "secret",
		{
			expiresIn: "1h",
		},
	);
}
