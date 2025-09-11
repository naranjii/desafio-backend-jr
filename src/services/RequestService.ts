import { Prisma } from '@prisma/client';

export async function createRequest(userId: string, data: { items: Prisma.RequestItemCreateManyPurchaseRequestInput[] }) {
  return prisma.purchaseRequest.create({
    data: {
      userId,
      items: {
        create: data.items || [],
      },
    },
    include: { items: true },
  });
}