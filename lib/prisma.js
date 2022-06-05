import { PrismaClient } from "@prisma/client";

let global = {};

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE === "development") global.prisma = prisma;

export default prisma;
