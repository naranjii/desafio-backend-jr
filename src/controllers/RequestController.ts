import { Request, Response } from "express";
import * as RequestService from "../services/RequestService";

export async function create(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const data = req.body;
    const request = await RequestService.createRequest(userId, data);
    res.status(201).json(request);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

export async function list(_: Request, res: Response) {
  try {
    const requests = await RequestService.getAllRequests();
    res.json(requests);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const request = await RequestService.getRequestById(id);
    res.json(request);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

export async function update(req: Request, res: Response) {
  try {
    const data = req.body;
    const id = req.params.id;
    const items = data.items;
    const request = await RequestService.update(id, items);
    res.json(request);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

export async function submit(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const submitted = await RequestService.submitRequest(id);
    res.json(submitted);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

export async function approve(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const approved = await RequestService.approveRequest(id);
    res.json(approved);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

export async function reject(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const rejected = await RequestService.rejectRequest(id);
    res.json(rejected);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}
