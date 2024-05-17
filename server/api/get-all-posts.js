import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  let posts = await prisma.post.findMany({
    orderBy: { id: "desc" },
    include: {
      user: true,
    },
  });
  return posts;
});
