import { Request, Response } from "express";
import * as RequestService from "../services/RequestService";
import { userInfo } from "os";

export async function create(req: Request, res: Response) {
  const userId = (req as any).user.id;
  const data = req.body;
  const request = await RequestService.createRequest(userId, data);
  res.status(201).json(request);
}

export async function list(req: Request, res: Response) {
  const requests = await RequestService.getAllRequests();
  res.json(requests);
}

export async function getById(req: Request, res: Response) {
  const id = req.params.id;
  const request = await RequestService.getRequestById(id);
  res.json(request);
}

export async function update(req: Request, res: Response) {
  const data = req.body;
  const id = req.params.id;
  const items = data.items;
  const request = await RequestService.update(id, items);
  res.json(request);
}

export async function submit(req: Request, res: Response) {
  const id = req.params.id;
  const submitted = await RequestService.submitRequest(id);
  res.json(submitted);
}

export async function approve(req: Request, res: Response) {
  const id = req.params.id;
  const approved = await RequestService.approveRequest(id);
  res.json(approved);
}

export async function reject(req: Request, res: Response) {
  const id = req.params.id;
  const rejected = await RequestService.rejectRequest(id);
  res.json(rejected);
}
