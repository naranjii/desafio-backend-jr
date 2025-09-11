import { prisma } from "../config/db";

export async function getSummary() {
  const statuses = await prisma.purchaseRequest.groupBy({
    by: ["status"],
    _count: { status: true }
  });
  return statuses;
}
