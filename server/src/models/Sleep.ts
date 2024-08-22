import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const Sleep = prisma.sleep;
export type SleepModel = typeof prisma.sleep;