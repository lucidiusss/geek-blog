import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const comment = await prisma.comment.create({
    data: {
      userId: body.userId,
      postId: Number(event.context.params.id),
      text: body.text,
    },
  });

  return comment;
});
