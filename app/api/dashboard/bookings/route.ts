import { NextResponse } from "next/server"
import { supabase } from "../../../../lib/supabase"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const salonId = searchParams.get("salonId")

    if (!salonId) {
      return NextResponse.json(
        { error: "Salon ID required" },
        { status: 400 }
      )
    }

    const { data: bookings, error } = await supabase
      .from("bookings")
      .select(`
        *,
        users (first_name, last_name, phone),
        services (name, price, duration)
      `)
      .eq("salon_id", salonId)
      .order("date", { ascending: true })

    if (error) throw error

    return NextResponse.json(bookings)
  } catch (error) {
    console.error("Bookings error:", error)
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { bookingId, status } = body

    const { data: booking, error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", bookingId)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(booking)
  } catch (error) {
    console.error("Update booking error:", error)
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    )
  }
}