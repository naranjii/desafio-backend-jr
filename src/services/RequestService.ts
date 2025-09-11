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
