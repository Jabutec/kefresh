import { PrismaClient } from "../app/generated/prisma/client"
import { withAccelerate } from "@prisma/extension-accelerate"
import { PrismaPg } from "@prisma/adapter-pg"

const globalForPrisma = globalThis as unknown as { prisma: any }

function createPrismaClient() {
  if (process.env.NODE_ENV === "production") {
    const client = new PrismaClient({
      accelerateUrl: process.env.DATABASE_URL!,
    })
    return client.$extends(withAccelerate()) as any
  }

  const adapter = new PrismaPg({
    connectionString: "postgres://postgres:postgres@localhost:51214/template1?sslmode=disable"
  })
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma