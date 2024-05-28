import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const res = await prisma.like.create({
    data: {
      userId: body.userId,
      commentId: Number(event.context.params.id),
    },
  });
  return res;
});
