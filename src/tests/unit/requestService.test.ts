import { prisma } from "../../config/db";
import { RequestRepository } from "../../repositories/RequestRepository";
import * as RequestService from "../../services/RequestService";
import { clearDB } from "../helpers";

describe("RequestService (unit)", () => {
    beforeEach(async () => {
        await clearDB();
    });

    afterAll(async () => {
        await clearDB();
        await prisma.$disconnect();
    });

    it("creates a request with items and returns them", async () => {
        const user = await prisma.user.create({ data: { name: 'u', email: 'u@example.com', password: 'p' } });
        const req = await RequestService.createRequest(user.id,  [ { name: 'Item A', quantity: 2, price: 10.5 } ]);
        expect(req).toHaveProperty('id');
        expect(req).toHaveProperty('userId', user.id);
        expect(req.items).toHaveLength(1);
        expect(req.items[0]).toMatchObject({ name: 'Item A', quantity: 2, price: 10.5 });
    });

    it("lists requests", async () => {
        const user = await prisma.user.create({ data: { name: 'u2', email: 'u2@example.com', password: 'p' } });
        await RequestService.createRequest(user.id,  [ { name: 'X', quantity: 1, price: 1 } ]);
        const all = await RequestService.getAllRequests();
        expect(all.length).toBeGreaterThanOrEqual(1);
    });

    it("gets request by id", async () => {
        const user = await prisma.user.create({ data: { name: 'u3', email: 'u3@example.com', password: 'p' } });
        const created = await RequestService.createRequest(user.id, [ { name: 'Y', quantity: 3, price: 2 } ]);
        const fetched = await RequestService.getRequestById(created.id);
        expect(fetched).not.toBeNull();
        expect(fetched).toHaveProperty('id', created.id);
    });
});
