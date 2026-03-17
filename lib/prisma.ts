import { PrismaClient } from "../app/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const connectionString = process.env.DIRECT_URL || 
  "postgres://postgres:postgres@localhost:51214/template1?sslmode=disable"

const adapter = new PrismaPg({ connectionString })

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma