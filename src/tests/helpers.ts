import { prisma } from "../config/db";

export async function clearDB() {
    // delete dependent records first to avoid foreign key constraints
    await prisma.approvalHistory.deleteMany().catch(() => {});
    await prisma.requestItem.deleteMany().catch(() => {});
    await prisma.purchaseRequest.deleteMany().catch(() => {});
    await prisma.user.deleteMany().catch(() => {});
}