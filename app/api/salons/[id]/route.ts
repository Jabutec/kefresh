import { NextResponse } from "next/server"
import { PrismaClient } from "../../../generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({
  connectionString: "postgres://postgres:postgres@localhost:51214/template1?sslmode=disable"
})

const prisma = new PrismaClient({ adapter })

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    const salon = await prisma.salon.findUnique({
      where: { id },
      include: {
        services: true,
        cards: true,
        owner: {
          select: {
            firstName: true,
            lastName: true,
          }
        }
      }
    })

    if (!salon) {
      return NextResponse.json(
        { error: "Salon not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(salon)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json(
      { error: "Failed to fetch salon", details: String(error) },
      { status: 500 }
    )
  }
}
