import { prisma } from "../../config/db";
import * as ReportService from "../../services/ReportService";
import { clearDB } from "../helpers";

describe('ReportService (unit)', () => {
    beforeEach(async () => {
        await clearDB();
    });

    afterAll(async () => {
        await clearDB();
        await prisma.$disconnect();
    });

    it('returns grouped status counts', async () => {
        const user = await prisma.user.create({ data: { name: 'r', email: 'r@example.com', password: 'p' } });
        await prisma.purchaseRequest.createMany({ data: [
            { userId: user.id },
            { userId: user.id },
            { userId: user.id }
        ] });

        const summary = await ReportService.getSummary();
        const draft = summary.find((s: any) => s.status === 'draft');
        const submitted = summary.find((s: any) => s.status === 'submitted');
        const approved = summary.find((s: any) => s.status === 'approved');
        const declined = summary.find((s: any) => s.status === 'declined');
    });
});
