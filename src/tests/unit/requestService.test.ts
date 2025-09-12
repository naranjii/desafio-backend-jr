import { prisma } from "../../config/db";
import * as RequestService from "../../services/RequestService";
import { clearDB } from "../helpers";

describe("RequestService (unit)", () => {
    afterAll(async () => {
        await prisma.$disconnect();
    });

    it("creates a request with items and returns them", async () => {
        const user = await prisma.user.create({ data: { name: 'u', email: 'u@example.com', password: 'p' } });
        const data = {
            items: [ { name: 'Item A', quantity: 2, price: 10.5 } ]
        };
        const req = await RequestService.createRequest(user.id, data as any);
        expect(req).toHaveProperty('id');
        expect(req).toHaveProperty('userId', user.id);
        expect(req.items).toHaveLength(1);
        expect(req.items[0]).toMatchObject({ name: 'Item A', quantity: 2, price: 10.5 });
    });

    it("lists requests including nested user", async () => {
        const user = await prisma.user.create({ data: { name: 'u2', email: 'u2@example.com', password: 'p' } });
        await RequestService.createRequest(user.id, { items: [ { name: 'X', quantity: 1, price: 1 } ] } as any);
        const all = await RequestService.getAllRequests();
        expect(all.length).toBeGreaterThanOrEqual(1);
        expect(all[0]).toHaveProperty('user');
    });

    it("gets request by id", async () => {
        const user = await prisma.user.create({ data: { name: 'u3', email: 'u3@example.com', password: 'p' } });
        const created = await RequestService.createRequest(user.id, { items: [ { name: 'Y', quantity: 3, price: 2 } ] } as any);
        const fetched = await RequestService.getRequestById(created.id);
        expect(fetched).not.toBeNull();
        expect(fetched).toHaveProperty('id', created.id);
    });
});
