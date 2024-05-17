import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const res = await prisma.post.create({
    data: {
      userId: body.userId,
      username: body.username,
      image: body.image,
      content: body.content,
      picture: body.picture,
    },
  });
  return res;
});
