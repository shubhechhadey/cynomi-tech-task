import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const User = prisma.user;
export type UserModel = typeof prisma.user;