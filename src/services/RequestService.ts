import { prisma } from "../config/db";
import { PurchaseRequestInput } from "../types/types";

export async function createRequest(userId: string, data: PurchaseRequestInput) {
    return prisma.purchaseRequest.create({
        data: {
            status: "draft",
            userId,
            items: {
                create: data.items
            }
        },
        include: { items: true }
    });
}
export async function getAllRequests() {
    return prisma.purchaseRequest.findMany({ include: { items: true, user: true } });
}
export async function getRequestById(id: string) {
    return prisma.purchaseRequest.findUnique({ where: { id }, include: { items: true } });
}
