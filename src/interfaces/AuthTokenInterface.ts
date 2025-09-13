import { UserRole } from "../generated/prisma";

export interface AuthTokenInterface { id: string, role: UserRole }
