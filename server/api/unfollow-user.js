import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const unfollow = await prisma.follows.delete({
    where: {
      followedToId_followedById: {
        followedToId: body.followedToId,
        followedById: body.followedById,
      },
    },
  });

  return unfollow;
});
