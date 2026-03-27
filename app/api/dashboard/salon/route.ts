import { NextResponse } from "next/server"
import { supabase } from "../../../../lib/supabase"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const ownerId = searchParams.get("ownerId")

    if (!ownerId) {
      return NextResponse.json(
        { error: "Owner ID required" },
        { status: 400 }
      )
    }

    const { data: salon, error } = await supabase
      .from("salons")
      .select(`
        *,
        services (*),
        cards (*)
      `)
      .eq("owner_id", ownerId)
      .single()

    if (error || !salon) {
      return NextResponse.json(null)
    }

    return NextResponse.json(salon)
  } catch (error) {
    console.error("Dashboard error:", error)
    return NextResponse.json(
      { error: "Failed to fetch salon" },
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
        description: body.description,
        location: body.location,
        specialty: body.specialty,
        hair_types: body.hairTypes,
        owner_id: body.ownerId,
      }])
      .select(`
        *,
        services (*),
        cards (*)
      `)
      .single()

    if (error) throw error

    return NextResponse.json(salon)
  } catch (error) {
    console.error("Error creating salon:", error)
    return NextResponse.json(
      { error: "Failed to create salon" },
      { status: 500 }
    )
  }
}