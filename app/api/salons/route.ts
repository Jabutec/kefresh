import { NextResponse } from "next/server"
import { supabase } from "../../../lib/supabase"

export async function GET() {
  try {
    const { data: salons, error } = await supabase
      .from("salons")
      .select(`
        *,
        services (*),
        cards (*)
      `)

    if (error) throw error

    return NextResponse.json(salons)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json(
      { error: "Failed to fetch salons" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { data: salon, error } = await supabase
      .from("salons")
      .insert([{
        name: body.name,
        location: body.location,
        specialty: body.specialty,
        hair_types: body.hairTypes,
        owner_id: body.ownerId,
      }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(salon)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json(
      { error: "Failed to create salon" },
      { status: 500 }
    )
  }
}
