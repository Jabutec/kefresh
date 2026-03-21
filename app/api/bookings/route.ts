import { NextResponse } from "next/server"
import { supabase } from "../../../lib/supabase"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const clientId = searchParams.get("clientId")

    let query = supabase
      .from("bookings")
      .select(`
        *,
        salons (name, location),
        services (name, price, duration)
      `)
      .order("created_at", { ascending: false })

    if (clientId) {
      query = query.eq("client_id", clientId)
    }

    const { data: bookings, error } = await query

    if (error) throw error

    return NextResponse.json(bookings)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
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

    const { data: booking, error } = await supabase
      .from("bookings")
      .insert([{
        client_id: clientId,
        salon_id: salonId,
        service_id: serviceId,
        date: new Date(date).toISOString(),
        status: "PENDING",
        deposit: 100,
      }])
      .select(`
        *,
        salons (name, location),
        services (name, price, duration)
      `)
      .single()

    if (error) throw error

    return NextResponse.json({
      message: "Booking created successfully",
      booking
    })

  } catch (error) {
    console.error("Booking error:", error)
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    )
  }
}