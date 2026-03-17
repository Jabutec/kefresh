import { NextResponse } from "next/server"
import { PrismaClient } from "../../generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({
  connectionString: "postgres://postgres:postgres@localhost:51214/template1?sslmode=disable"
})

const prisma = new PrismaClient({ adapter })

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const clientId = searchParams.get("clientId")

    const bookings = await prisma.booking.findMany({
      where: clientId ? { clientId } : {},
      include: {
        salon: {
          select: {
            name: true,
            location: true,
          }
        },
        service: {
          select: {
            name: true,
            price: true,
            duration: true,
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json(
      { error: "Failed to fetch bookings", details: String(error) },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { clientId, salonId, serviceId, date } = body

    if (!clientId || !salonId || !serviceId || !date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const booking = await prisma.booking.create({
      data: {
        clientId,
        salonId,
        serviceId,
        date: new Date(date),
        status: "PENDING",
        deposit: 100,
      },
      include: {
        salon: {
          select: {
            name: true,
            location: true,
          }
        },
        service: {
          select: {
            name: true,
            price: true,
            duration: true,
          }
        }
      }
    })

    return NextResponse.json({
      message: "Booking created successfully",
      booking
    })

  } catch (error) {
    console.error("Booking error:", error)
    return NextResponse.json(
      { error: "Failed to create booking", details: String(error) },
      { status: 500 }
    )
  }
}
