import { UserRole } from "../generated/prisma";

export interface CreateUserInterface {
    name: string,
    email: string,
    role: UserRole,
    hashedPassword: string
}


