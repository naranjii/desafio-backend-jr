import { RequestItemInterface } from "../interfaces/RequestItemInterface";
import { RequestRepository } from "../repositories/RequestRepository";

// Consultant role Services:
export async function createRequest(userId: string, requestItem: RequestItemInterface[]) {
  if (!requestItem || requestItem.length === 0) {
    throw new Error("Error creating request: Request must contain at least one item");
  }
  if (requestItem.some(item => item.quantity <= 0)) {
    throw new Error("Error creating request: All items must have a quantity greater than zero");
  }
  return RequestRepository.create({ userId, requestItem });
}

export async function submitRequest(id: string) {
  if (!id) {
    throw new Error("Error submitting request: Request ID is required to submit a request");
  }
  if (typeof id !== 'string' || id.trim() === '') {
    throw new Error("Error submitting request: Invalid Request ID");
  }
  return RequestRepository.submit(id);
}

export async function update(id: string, items: RequestItemInterface[]) {
  if (!items.length) throw new Error("Items array cannot be empty");
  return RequestRepository.patchItems({ id, items });
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

// Admin Services?
//export async function updateRequest(id: string, status: string, items: RequestItemInterface[]) {
//  return RequestRepository.update({ id, status, items });
// }
