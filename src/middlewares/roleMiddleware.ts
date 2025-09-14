import type { NextFunction, Request, Response } from "express";
import { UserRole } from "../generated/prisma";
import type { AuthenticatedRequest } from "./authMiddleware";

export function roleMiddleware(role: UserRole = UserRole.approver) {
	return (req: Request, res: Response, next: NextFunction) => {
		// Done to infer the authenticated request to the object. this is only used after authentication.
		const user = (req as unknown as AuthenticatedRequest).user;
		if (user.role !== role)
			return res.status(403).json({ error: "Acesso negado" });
		next();
	};
}
