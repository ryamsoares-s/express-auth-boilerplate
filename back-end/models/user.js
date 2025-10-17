import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function create(userInputValues) {
  const newUser = await prisma.user.create({
    data: {
      name: userInputValues.name,
      email: userInputValues.email,
      password: userInputValues.password,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  return newUser;
}

async function findByEmail(userInputValues) {
  const user = await prisma.user.findUnique({
    where: { email: userInputValues.email },
  });

  return user;
}

async function listAll() {
  const users = await prisma.user.findMany({ omit: { password: true } });

  return users;
}

const user = {
  create,
  findByEmail,
  listAll,
};

export default user;
