import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const user = await prisma.user.findUnique({
    where: { shortId: Number(event.context.params.id) },
    include: {
      post: {
        include: {
          user: {
            include: {
              followedBy: true,
            },
          },
          likes: true,
          bookmarks: true,
          comments: {
            orderBy: { createdAt: "desc" },
            include: {
              user: true,
              likes: true,
            },
          },
        },
      },
      followedTo: true,
      followedBy: true,
    },
  });

  return user;
});
