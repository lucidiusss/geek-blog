import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const posts = await prisma.post.findMany({
    where: { userId: event.context.params.id },
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        include: {
          followedBy: true,
        },
      },
      likes: true,
      comments: true,
      bookmarks: true,
    },
  });

  return posts;
});
