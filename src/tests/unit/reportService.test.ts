import { prisma } from "../../config/db";
import { RequestRepository } from "../../repositories/RequestRepository";
import * as ReportService from "../../services/ReportService";
import { clearDB } from "../helpers";

describe("ReportService (unit)", () => {
	beforeEach(async () => {
		await clearDB();
		jest.clearAllMocks();
	});

	afterAll(async () => {
		await clearDB();
		await prisma.$disconnect();
	});

	it("returns sorted and formatted status counts", async () => {
		jest.spyOn(RequestRepository, "getGroupedListByStatus").mockResolvedValue([
			{ status: "approved", _count: { status: 3 } },
			{ status: "rejected", _count: { status: 5 } },
		]);

		const summary = await ReportService.getSummary();
		expect(summary).toEqual([
			{ status: "rejected", count: 5 },
			{ status: "approved", count: 3 },
		]);
	});

	it("returns empty array if no requests", async () => {
		jest
			.spyOn(RequestRepository, "getGroupedListByStatus")
			.mockResolvedValue([]);
		const summary = await ReportService.getSummary();
		expect(summary).toEqual([]);
	});
});
