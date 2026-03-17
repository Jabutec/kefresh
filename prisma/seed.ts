console.log("Starting seed...")
import { PrismaClient } from "../app/generated/prisma/client.js"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({
  connectionString: "postgres://postgres:postgres@localhost:51214/template1?sslmode=disable"
})

const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("Seeding database...")

  const owner1 = await prisma.user.create({
    data: {
      email: "zola@kefresh.co.za",
      firstName: "Zola",
      lastName: "Dlamini",
      phone: "0821234567",
      password: "hashed_password",
      role: "PRO",
    }
  })

  const salon1 = await prisma.salon.create({
    data: {
      name: "Zola's Natural Hair Studio",
      description: "Sandton's best natural hair studio specialising in 4C hair care",
      location: "Sandton",
      specialty: "4C natural hair",
      hairTypes: ["4C", "natural", "locs"],
      ownerId: owner1.id,
      services: {
        create: [
          { name: "Natural hair consultation", price: 150, duration: 30 },
          { name: "Wash & style", price: 250, duration: 60 },
          { name: "Box braids", price: 450, duration: 180 },
          { name: "Loc retwist", price: 350, duration: 120 },
        ]
      },
      cards: {
        create: [
          { imageUrl: "", style: "Box braids", category: "braids" },
          { imageUrl: "", style: "Loc retwist", category: "locs" },
        ]
      }
    }
  })

  const owner2 = await prisma.user.create({
    data: {
      email: "cuts@kefresh.co.za",
      firstName: "Thabo",
      lastName: "Nkosi",
      phone: "0839876543",
      password: "hashed_password",
      role: "PRO",
    }
  })

  const salon2 = await prisma.salon.create({
    data: {
      name: "Cuts & Culture Barbershop",
      description: "Braamfontein's freshest barbershop",
      location: "Braamfontein",
      specialty: "Barber",
      hairTypes: ["low fade", "wolf cut", "taper"],
      ownerId: owner2.id,
      services: {
        create: [
          { name: "Haircut", price: 120, duration: 45 },
          { name: "Wolf cut", price: 180, duration: 60 },
          { name: "Beard trim", price: 80, duration: 30 },
        ]
      },
      cards: {
        create: [
          { imageUrl: "", style: "Wolf cut", category: "barber" },
          { imageUrl: "", style: "Low fade", category: "barber" },
        ]
      }
    }
  })

  console.log("Database seeded! 🌱")
  console.log(`Created: ${salon1.name}`)
  console.log(`Created: ${salon2.name}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })