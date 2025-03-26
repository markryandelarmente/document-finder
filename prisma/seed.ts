import { prisma } from "@/lib/prisma"
import bcrypt  from "bcrypt";

async function main() {
  const user = {
    name: "John",
    email: "johndoe@example.com",
    password: bcrypt.hashSync("password", 10)
  }

  await prisma.user.create({
    data: user
  })
}

main()
  .then(async() => {
    await prisma.$disconnect()
  })
  .catch(error => {
    console.log(error)
  })