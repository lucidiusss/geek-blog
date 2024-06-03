import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  let posts = await prisma.post.findMany({
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
