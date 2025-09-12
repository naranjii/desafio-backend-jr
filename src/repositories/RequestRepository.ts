import { prisma } from "../config/db";
import { ApprovalStatus } from "../generated/prisma";
import { RequestItem } from "../models/RequestItem";

export const RequestRepository = {
    async create({ userId, requestItem }: { userId: string, requestItem: RequestItem }) {   // => POST /requests
        return prisma.purchaseRequest.create({
            data: { userId, status: ApprovalStatus.draft, items: { create: requestItem } }
        });
    },
    async update({ id, requestItem }: { id: string, requestItem: RequestItem }) {           // => PATCH /requests/:id
        return prisma.purchaseRequest.update({
            where: { id },
            data: { items: { create: requestItem } }
        });
    },

    async getAll() {                                                                        // => GET /requests
        return prisma.purchaseRequest.findMany();
    },

    async getById(id: string) {                                                             // => GET /requests/:id
        return prisma.purchaseRequest.findUnique({ where: { id } })
    },

    async getByStatus() {                                                                   // => GET /reports/summary  
        return prisma.purchaseRequest.groupBy({
            by: ["status"],
            _count: { status: true }
        });
    }
}