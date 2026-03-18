import { NextResponse } from "next/server"
import { prisma } from "../../../../lib/prisma"

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    console.log("Fetching salon with id:", id)

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