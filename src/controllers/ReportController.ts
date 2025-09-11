import { Request, Response } from "express";
import * as ReportService from "../services/ReportService";

export async function summary(req: Request, res: Response) {
  const data = await ReportService.getSummary();
  res.json(data);
}
