import { NextResponse } from "next/server"
import { supabase } from "../../../../lib/supabase"

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    const { data: salon, error } = await supabase
      .from("salons")
      .select(`
        *,
        services (*),
        cards (*)
      `)
      .eq("id", id)
      .single()

    if (error) throw error

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
      { error: "Failed to fetch salon" },
      { status: 500 }
    )
  }
}
