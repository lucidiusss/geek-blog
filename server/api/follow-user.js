import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const follow = await prisma.follows.create({
    data: {
      followedToId: body.followedToId,
      followedById: body.followedById,
    },
  });

  return follow;
});
