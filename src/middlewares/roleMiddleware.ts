import type { NextFunction, Response } from "express";
import { UserRole } from "../generated/prisma";
import type { AuthenticatedRequest } from "./authMiddleware";

export function roleMiddleware(role: UserRole = UserRole.approver) {
	return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
		const user = req.user;
		if (user.role !== role)
			return res.status(403).json({ error: "Acesso negado" });
		next();
	};
}
