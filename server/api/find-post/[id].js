import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const deleted = await prisma.post.findUnique({
    where: { id: Number(event.context.params.id) },
    include: {
      user: true,
    },
  });

  return deleted;
});
