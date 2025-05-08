import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: "Admin",
        email: "admin@test.com",
        password: bcrypt.hashSync("secret", 10),
        phone: faker.phone.number(),
      },
      {
        name: "Test User",
        email: "test@test.com",
        password: bcrypt.hashSync("secret", 10),
        phone: faker.phone.number(),
      },
    ],
  });
  for (let i = 0; i < 55; i++) {
    await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync("secret", 10),
        phone: faker.phone.number(),
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
