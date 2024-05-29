import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const follows = await prisma.follows.findMany({
    where: {
      followedById: event.context.params.id,
    },
  });

  const users = await prisma.user.findMany({
    where: {
      id: {
        in: follows.map((user) => user.followedToId),
      },
    },
  });

  return users;
});
