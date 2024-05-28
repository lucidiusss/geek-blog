import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const likeId = await prisma.like.findMany({
    where: {
      userId: body.userId,
    },
  });

  const res = await prisma.like.delete({
    where: { id: likeId[0].id, commentId: Number(event.context.params.id) },
  });
  return res;
});
