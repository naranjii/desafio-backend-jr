import { prisma } from "../config/db";

export async function createRequest(userId: number, data: any) {
  return prisma.purchaseRequest.create({
    data: {
      status: "draft",
      userId,
      items: {
        create: data.items || []
      }
    },
    include: { items: true }
  });
}