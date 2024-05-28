import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  let posts = await prisma.post.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        include: {
          followedBy: true,
        },
      },
      likes: true,
      comments: true,
    },
  });
  return posts;
});
