import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = readBody(event);

  let posts = await prisma.post.findMany({
    where: { userId: body.id },
    orderBy: { id: "desc" },
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
