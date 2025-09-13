import { prisma } from "../config/db";
import { ApprovalStatus, } from "../generated/prisma";
import { RequestItemInterface } from "../interfaces/RequestItemInterface";


export const RequestRepository = {
    async create({ userId, requestItem }: { userId: string, requestItem: RequestItemInterface[] }) {
        return prisma.purchaseRequest.create({
            data: { userId, status: ApprovalStatus.draft, items: { createMany: { data: requestItem } } },
            include: {
                items: true,
            }
        });
    },
    async submit(id: string) {
        return prisma.purchaseRequest.update({
            where: { id },
            data: { status: ApprovalStatus.submitted }
        });
    },
    async getAll() {
        return prisma.purchaseRequest.findMany();
    },
    async getById(id: string) {
        return prisma.purchaseRequest.findUnique({ where: { id } })
    },
    async getByStatus() {
        return prisma.purchaseRequest.groupBy({
            by: ["status"],
            _count: { status: true }
        });
    },
    async reject(id: string) {
        return prisma.purchaseRequest.update({
            where: { id },
            data: { status: ApprovalStatus.rejected }
        });
    },
    async approve(id: string) {
        return prisma.purchaseRequest.update({
            where: { id },
            data: { status: ApprovalStatus.approved }
        });
    }
}