import { prisma } from "../config/db";

export async function clearDB() {
    await prisma.requestItem.deleteMany();
    await prisma.purchaseRequest.deleteMany();
    await prisma.user.deleteMany(); 
    await prisma.approvalHistory.deleteMany();
}