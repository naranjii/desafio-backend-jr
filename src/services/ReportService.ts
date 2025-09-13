import { RequestRepository } from "../repositories/RequestRepository";

export async function getSummary() {
  return RequestRepository.getGroupedListByStatus();
}
