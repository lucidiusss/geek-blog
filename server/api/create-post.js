import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const res = await prisma.posts.create({
    data: {
      userId: body.userId,
      username: body.username,
      name: body.name,
      image: body.image,
      text: body.text,
      picture: body.picture,
    },
  });
  return res;
});
