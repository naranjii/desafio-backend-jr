import { prisma } from "../config/db";
import { approvalStatus, PrismaClient, UserRole } from "../generated/prisma";

export const RequestRepository = {
    async create({ id, status, userId }: { id: string, status: approvalStatus, userId: string }) {
        return prisma.purchaseRequest.create({
            data: { id, userId, status: 'draft' }
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