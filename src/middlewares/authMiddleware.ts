import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const header = req.headers["authorization"];
  if (!header) return res.status(401).json({ error: "Token ausente" });

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as any;
    (req as any).user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Token inválido" });
  }
}
