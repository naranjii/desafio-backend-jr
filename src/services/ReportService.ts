import { RequestRepository } from "../repositories/RequestRepository";

export async function getSummary() {
	const rawReport = await RequestRepository.getGroupedListByStatus();

	return rawReport
		.map((item) => ({
			status: item.status,
			count: item._count.status,
		}))
		.sort((a, b) => b.count - a.count);
}
