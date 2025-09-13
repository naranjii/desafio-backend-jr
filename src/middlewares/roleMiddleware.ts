import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./authMiddleware";
import { UserRole } from "../generated/prisma";

export function roleMiddleware(role: UserRole = UserRole.approver) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user || user.role !== role) return res.status(403).json({ error: "Acesso negado" });
    next();
  };
}
