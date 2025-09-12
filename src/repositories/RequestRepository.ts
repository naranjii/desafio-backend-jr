import { prisma } from "../config/db";
import { ApprovalStatus } from "../generated/prisma";
import { RequestItem } from "../models/RequestItem";

export const RequestRepository = {
    async create({ userId, requestItem }: { userId: string, requestItem: RequestItem }) {
        return prisma.purchaseRequest.create({
            data: { userId, status: ApprovalStatus.draft, items: { create: requestItem } }
        });
    },
    async update({ id, requestItem }: { id: string, requestItem: RequestItem }) {
        return prisma.purchaseRequest.update({
            where: { id },
            data: { items: { create: requestItem } }
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
    }
}