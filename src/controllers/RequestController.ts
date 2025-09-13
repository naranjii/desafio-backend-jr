import { Request, Response } from "express";
import * as RequestService from "../services/RequestService";

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

export async function edit(req: Request, res: Response) {
  const id = req.params.id;
  const status = req.params.status;
  const items = req.params.items;
  const updated = await RequestService.updateRequest({id, status, items});
  res.json(updated);
}

// para ambos abaixo falta limitar os pedidos a 'draft's e de submit para approve e reject

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