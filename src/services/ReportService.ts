import { RequestRepository } from "../repositories/RequestRepository";

export async function getSummary() {
  const statuses = await RequestRepository.getByStatus();
  return statuses;
}
