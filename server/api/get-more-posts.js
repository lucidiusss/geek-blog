import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  let posts = await prisma.post.findMany({
    skip: parseInt(query.skip, 10),
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
