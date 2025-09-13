import { InvalidPayloadError } from "../errors/invalidPayload.error";
import { NotFoundError } from "../errors/notFound.error";
import { ApprovalStatus } from "../generated/prisma";
import { RequestItemInterface } from "../interfaces/RequestItemInterface";
import { RequestRepository } from "../repositories/RequestRepository";

// Consultant role Services:
export async function createRequest(userId: string, requestItems: RequestItemInterface[]) {
  if (!requestItems || requestItems.length === 0) {
    throw new InvalidPayloadError("Error creating request: Request must contain at least one item");
  }
  if (requestItems.some(item => item.quantity <= 0)) {
    throw new InvalidPayloadError("Error creating request: All items must have a quantity greater than zero");
  }
  return RequestRepository.create({ userId, requestItems });
}

export async function submitRequest(id: string, userId: string) {
  const request = await getRequestById(id)

  if (request.status !== ApprovalStatus.draft) throw new InvalidPayloadError('Request must be a draft to be submitted.')

  return RequestRepository.submit({ id, userId });
}

export async function update(id: string, items: RequestItemInterface[]) {
  if (!items.length) throw new InvalidPayloadError("Items array cannot be empty");
  return RequestRepository.patchItems({ id, requestItems: items });
}

export async function approveRequest(id: string, userId: string) {
  const request = await getRequestById(id)
  if (request.status !== ApprovalStatus.submitted) throw new InvalidPayloadError('Request must be a draft to be submitted.')
  return RequestRepository.approve({ id, previousStatus: request.status, userId });
}
export async function rejectRequest(id: string, userId: string) {
  const request = await getRequestById(id)
  if (request.status !== ApprovalStatus.submitted) throw new InvalidPayloadError('Request must be a draft to be submitted.')
  return RequestRepository.reject({ id, previousStatus: request.status, userId });
}
export async function getAllRequests() {
  return RequestRepository.getAll();
}

export async function getRequestById(id: string) {
  const request = await RequestRepository.getById(id)
  if (!request) throw new NotFoundError('Not Found')
  return request
}

// Admin Services?
//export async function updateRequest(id: string, status: string, items: RequestItemInterface[]) {
//  return RequestRepository.update({ id, status, items });
// }
