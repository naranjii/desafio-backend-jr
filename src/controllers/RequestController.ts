import { Request, Response } from "express";
import * as RequestService from "../services/RequestService";
import { errorHandler } from "../errors/_handler";
import { AuthenticatedTypedRequest, TypedRequest } from "../interfaces/TypedRequest";
import { CreateRequestDto, UpdateRequestDto } from "../dtos/request.dto";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

export async function create(req: TypedRequest<CreateRequestDto>, res: Response) {
  try {
    const { user } = req as AuthenticatedRequest;
    const data = req.body;
    const request = await RequestService.createRequest(user.id, data.items);
    res.status(201).json(request);
  } catch (error) {
    return errorHandler(error, res)
  }
}

export async function list(_: Request, res: Response) {
  try {
    const requests = await RequestService.getAllRequests();
    res.json(requests);
  } catch (error) {
    return errorHandler(error, res)
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const request = await RequestService.getRequestById(id);
    res.json(request);
  } catch (error) {
    return errorHandler(error, res)
  }
}

export async function update(req: TypedRequest<UpdateRequestDto>, res: Response) {
  try {
    const { id, items } = req.body;
    const request = await RequestService.update(id, items);
    res.json(request);
  } catch (error) {
    return errorHandler(error, res)
  }
}

export async function submit(req: Request, res: Response) {
  try {
    const { user } = req as AuthenticatedRequest;
    const id = req.params.id;
    const submitted = await RequestService.submitRequest(id, user.id);
    res.json(submitted);
  } catch (error) {
    return errorHandler(error, res)
  }
}

export async function approve(req: Request, res: Response) {
  try {
    const { user } = req as AuthenticatedRequest;
    const id = req.params.id;
    const approved = await RequestService.approveRequest(id, user.id);
    res.json(approved);
  } catch (error) {
    return errorHandler(error, res)
  }
}

export async function reject(req: Request, res: Response) {
  try {
    const { user } = req as AuthenticatedRequest;
    const id = req.params.id;
    const rejected = await RequestService.rejectRequest(id, user.id);
    res.json(rejected);
  } catch (error) {
    return errorHandler(error, res)
  }
}
