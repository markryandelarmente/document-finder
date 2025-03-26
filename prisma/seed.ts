import { prisma } from "@/lib/prisma"
import bcrypt  from "bcrypt";
import { faker } from '@faker-js/faker';


const generateRandomFileName = () => {
  const fileExtensions = ["pdf", "docx", "xlsx"];
  const randomExtension = faker.helpers.arrayElement(fileExtensions);
  return `${faker.system.fileName()}.${randomExtension}`;
};


const seedDocuments = async() => {
  const cabinets = Array.from({length: 10}).map((item: any, index: number) => {
    return {
      name: `Cabinet ${index + 1}`
    }
  })
  
  await prisma.cabinet.createMany({
    data: cabinets
  })

  const allCabinets = await prisma.cabinet.findMany()

  for(const cabinet of allCabinets) {
    const documents = Array.from({length: 10}).map((item: any, index: number) => {
      return {
        name: generateRandomFileName(),
        mimetype: 'pdf',
        size: 10,
        src: "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=2048x2048&w=is&k=20&c=dFWJz1EFJt7Tq2lA-hgTpSW119YywTWtS4EwU3fpKrE=",
        cabinetId: cabinet.id
      }
    })

    await prisma.document.createMany({
      data: documents as any
    })
  }
}


async function main() {
  const user = {
    name: "John",
    email: "johndoe@example.com",
    password: bcrypt.hashSync("password", 10)
  }

  await prisma.user.create({
    data: user
  })

  await seedDocuments()
}

main()
  .then(async() => {
    await prisma.$disconnect()
  })
  .catch(error => {
    console.log(error)
  })