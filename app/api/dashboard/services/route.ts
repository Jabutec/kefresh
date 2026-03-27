import { NextResponse } from "next/server"
import { supabase } from "../../../../lib/supabase"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, price, duration, salonId } = body

    if (!name || !price || !duration || !salonId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const { data: service, error } = await supabase
      .from("services")
      .insert([{
        name,
        price: parseInt(price),
        duration: parseInt(duration),
        salon_id: salonId,
      }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(service)
  } catch (error) {
    console.error("Error creating service:", error)
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const serviceId = searchParams.get("id")

    if (!serviceId) {
      return NextResponse.json(
        { error: "Service ID required" },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from("services")
      .delete()
      .eq("id", serviceId)

    if (error) throw error

    return NextResponse.json({ message: "Service deleted" })
  } catch (error) {
    console.error("Error deleting service:", error)
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    )
  }
}