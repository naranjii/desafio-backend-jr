import { Request, Response } from "express";
import * as RequestService from "../services/RequestService";

export async function create(req: Request, res: Response) {
  const userId = (req as any).user.id;
  const data = req.body;
  const request = await RequestService.createRequest(userId, data);
  res.status(201).json(request);
}