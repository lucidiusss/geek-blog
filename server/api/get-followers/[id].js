import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const followersId = await prisma.follows.findMany({
    where: {
      followedToId: event.context.params.id,
    },
  });

  const users = await prisma.user.findMany({
    where: {
      id: {
        in: followersId.map((follower) => follower.followedById),
      },
    },
  });

  return users;
});
