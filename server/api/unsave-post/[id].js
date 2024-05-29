import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const bookmarkId = await prisma.bookmark.findMany({
    where: {
      userId: body.userId,
    },
  });

  const res = await prisma.bookmark.delete({
    where: {
      id: bookmarkId[0].id,
    },
  });
  return res;
});
