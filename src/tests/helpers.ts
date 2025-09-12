import { prisma } from "../config/db";

export async function clearDB() {
    await prisma.user.deleteMany()
    
}