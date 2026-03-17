import { NextResponse } from "next/server"
import { PrismaClient } from "../../generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({
  connectionString: "postgres://postgres:postgres@localhost:51214/template1?sslmode=disable"
})

const prisma = new PrismaClient({ adapter })

export async function GET() {
  try {
    const salons = await prisma.salon.findMany({
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
    return NextResponse.json(salons)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json(
      { error: "Failed to fetch salons", details: String(error) },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const salon = await prisma.salon.create({
      data: {
        name: body.name,
        location: body.location,
        specialty: body.specialty,
        hairTypes: body.hairTypes,
        ownerId: body.ownerId,
      }
    })
    return NextResponse.json(salon)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json(
      { error: "Failed to create salon", details: String(error) },
      { status: 500 }
    )
  }
}