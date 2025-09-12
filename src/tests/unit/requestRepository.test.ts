import { prisma } from "../../config/db";
import { RequestRepository } from "../../repositories/RequestRepository";
import { clearDB } from "../helpers";

describe('RequestRepository (unit)', () => {
    beforeEach(async () => {
        await clearDB();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    afterAll(async () => {
        await clearDB();
        await prisma.$disconnect();
    });

    it('create and retrieve by id (mocked custom id)', async () => {
        const user = await prisma.user.create({ data: { name: 'r', email: 'r@example.com', password: 'p' } });

        // mock create to return custom id
        const createdObj = { id: 'custom-id-1', userId: user.id, status: 'draft' };
        jest.spyOn((prisma as any).purchaseRequest, 'create').mockResolvedValueOnce(createdObj);
        jest.spyOn((prisma as any).purchaseRequest, 'findUnique').mockResolvedValueOnce(createdObj);

        const created = await RequestRepository.create({ userId: user.id, requestItem: [{ name: 'Item', quantity: 1, price: 1 }] });
        expect(created).toHaveProperty('id', 'custom-id-1');

        const found = await RequestRepository.getById(created.id);
        expect(found).not.toBeNull();
        expect(found?.id).toBe('custom-id-1');
    });

    it('getAll returns array (with mocked create and findMany)', async () => {
        const user = await prisma.user.create({ data: { name: 'r2', email: 'r2@example.com', password: 'p' } });
        const createdObj = { id: 'custom-id-2', userId: user.id, status: 'draft' };

        jest.spyOn((prisma as any).purchaseRequest, 'create').mockResolvedValueOnce(createdObj);
        jest.spyOn((prisma as any).purchaseRequest, 'findMany').mockResolvedValueOnce([createdObj]); 

        await RequestRepository.create({ userId: user.id, requestItem: [ { name: 'Item2', quantity: 2, price: 2 }] });
        const all = await RequestRepository.getAll();
        expect(Array.isArray(all)).toBe(true);
        expect(all.length).toBeGreaterThanOrEqual(1);
        expect(all[0]).toHaveProperty('id', 'custom-id-2');
    });
});
