import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const bookmarks = await prisma.bookmark.findMany({
    where: {
      userId: event.context.params.id,
    },
    include: {
      post: {
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
      },
    },
  });

  const posts = bookmarks.map((bookmark) => bookmark.post);

  return posts;
});
