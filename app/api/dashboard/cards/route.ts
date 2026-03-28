import { NextResponse } from "next/server"
import { supabase } from "../../../../lib/supabase"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { imageUrl, style, category, salonId, price, duration } = body

    if (!imageUrl || !salonId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const { data: card, error } = await supabase
      .from("cards")
      .insert([{
        image_url: imageUrl,
        style,
        category,
        salon_id: salonId,
        price,
        duration,
      }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(card)
  } catch (error) {
    console.error("Error creating card:", error)
    return NextResponse.json(
      { error: "Failed to create card" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const cardId = searchParams.get("id")

    if (!cardId) {
      return NextResponse.json(
        { error: "Card ID required" },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from("cards")
      .delete()
      .eq("id", cardId)

    if (error) throw error

    return NextResponse.json({ message: "Card deleted" })
  } catch (error) {
    console.error("Error deleting card:", error)
    return NextResponse.json(
      { error: "Failed to delete card" },
      { status: 500 }
    )
  }
}