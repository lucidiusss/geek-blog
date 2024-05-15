import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = readBody(event);
  const res = await prisma.posts.findUnique({
    where: {
      id: Number(body.id),
    },
  });
  return res;
});
