import { prisma } from "../config/db";
import { approvalStatus } from "../generated/prisma";
import { RequestItem } from "../models/RequestItem";

export const RequestRepository = {
    async create({userId, requestItem }: { userId: string, requestItem: RequestItem  }) {
        return prisma.purchaseRequest.create({
            data: { userId, status: approvalStatus.draft, items: { create: requestItem } }
        });
    },

    async getAll() {
        return prisma.purchaseRequest.findMany();
    },

    async getById(id: string) {
        return prisma.purchaseRequest.findUnique({ where: { id } })
    },

    async getSummary() {
        return prisma.purchaseRequest.groupBy({
            by: ["status"],
            _count: { status: true }
        });
    }
}