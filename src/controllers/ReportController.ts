import { Request, Response } from "express";
import * as ReportService from "../services/ReportService";
import { errorHandler } from "../errors/_handler";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

export async function summary(_: AuthenticatedRequest, res: Response) {
  try {
    const data = await ReportService.getSummary();
    res.json(data);
  } catch (error) {
    return errorHandler(error, res)
  }
}
