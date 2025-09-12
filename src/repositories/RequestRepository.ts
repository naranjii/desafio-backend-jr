import { prisma } from "../config/db";
import { ApprovalStatus,  } from "../generated/prisma";
import { RequestItemInterface } from "../interfaces/RequestItemInterface";


export const RequestRepository = {
    async create({ userId, requestItem }: { userId: string, requestItem: RequestItemInterface[] }) {   // => POST /requests
        return prisma.purchaseRequest.create({
            data: { userId, status: ApprovalStatus.draft, items: { createMany: { data: requestItem } } },
            include: {
                items: true,
            }
        });
    },
    async update({ id, requestItem }: { id: string, requestItem: RequestItemInterface }) {           // => PATCH /requests/:id
        return prisma.purchaseRequest.update({
            where: { id },
            data: { items: { create: requestItem } }
        });
    },
    async submit(id: string) {                                                               // => POST /requests/:id/submit
        return prisma.purchaseRequest.update({
            where: { id },
            data: { status: ApprovalStatus.submitted }
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