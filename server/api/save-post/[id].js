import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const bookmark = await prisma.bookmark.create({
    data: {
      userId: body.userId,
      postId: Number(event.context.params.id),
    },
  });

  return bookmark;
});
