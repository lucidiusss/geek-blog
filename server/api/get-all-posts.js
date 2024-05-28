import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  let posts = await prisma.post.findMany({
    take: 5,
    orderBy: { id: "desc" },
    include: {
      user: {
        include: {
          followedTo: true,
          followedBy: true,
        },
      },
      likes: true,
      comments: true,
    },
  });
  return posts;
});
