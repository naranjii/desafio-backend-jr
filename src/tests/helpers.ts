import { prisma } from "../config/db";

export async function clearDB() {
	await prisma.approvalHistory.deleteMany();
	await prisma.requestItem.deleteMany();
	await prisma.purchaseRequest.deleteMany();
	await prisma.user.deleteMany();
}
