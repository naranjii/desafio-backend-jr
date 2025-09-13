import { RequestItemInterface } from "../interfaces/RequestItemInterface";
import { RequestRepository } from "../repositories/RequestRepository";

export async function createRequest(userId: string, requestItem: RequestItemInterface[]) {
  return RequestRepository.create({ userId, requestItem });
}

export async function updateRequest(id: string, status: string, items: RequestItemInterface[]) {
  return RequestRepository.update({ id, status, items });
}

export async function submitRequest(id: string) {
  return RequestRepository.submit(id);
}
export async function approveRequest(id: string) {
  return RequestRepository.approve(id);
}
export async function rejectRequest(id: string) {
  return RequestRepository.reject(id);
}
export async function getAllRequests() {
  return RequestRepository.getAll();
}
export async function getRequestById(id: string) {
  return RequestRepository.getById(id);
}
