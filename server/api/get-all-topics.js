import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  let topics = await prisma.category.findMany({
    orderBy: { id: "desc" },
  });
  return topics;
});
