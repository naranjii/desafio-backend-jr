import { RequestRepository } from "../repositories/RequestRepository";
import { RequestItem } from "../models/RequestItem";

export async function createRequest(userId: string, requestItem: RequestItem) {
  return RequestRepository.create({ userId, requestItem });
}
export async function updateRequest(id: string, requestItem: RequestItem) {
  return RequestRepository.update({ id, requestItem });
}
export async function submitRequest(id: string) {
  return RequestRepository.submit(id);  
}


export async function getAllRequests() {
  return RequestRepository.getAll();
}
export async function getRequestById(id: string) {
  return RequestRepository.getById(id);
}
