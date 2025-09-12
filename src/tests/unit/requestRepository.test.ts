import { prisma } from "../../config/db";
import { RequestRepository } from "../../repositories/RequestRepository";
import { clearDB } from "../helpers";

describe('RequestRepository (unit)', () => {
    afterAll(async () => {
        await prisma.$disconnect();
    });

    it('create and retrieve by id', async () => {
        const user = await prisma.user.create({ data: { name: 'r', email: 'r@example.com', password: 'p' } });
        const created = await RequestRepository.create({ id: 'custom-id-1', status: 'draft' as any, userId: user.id });
        expect(created).toHaveProperty('id');
        const found = await RequestRepository.getById(created.id);
        expect(found).not.toBeNull();
        expect(found?.id).toBe(created.id);
    });

    it('getAll returns array', async () => {
        const user = await prisma.user.create({ data: { name: 'r2', email: 'r2@example.com', password: 'p' } });
        await RequestRepository.create({ id: 'custom-id-2', status: 'draft' as any, userId: user.id });
        const all = await RequestRepository.getAll();
        expect(Array.isArray(all)).toBe(true);
        expect(all.length).toBeGreaterThanOrEqual(1);
    });
});
