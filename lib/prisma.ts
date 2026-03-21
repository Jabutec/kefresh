import { PrismaClient } from "../app/generated/prisma/client"
import { withAccelerate } from "@prisma/extension-accelerate"

const globalForPrisma = globalThis as unknown as { prisma: any }

function createPrismaClient() {
  const client = new PrismaClient({
    accelerateUrl: process.env.DATABASE_URL!,
  })
  return client.$extends(withAccelerate()) as any
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()