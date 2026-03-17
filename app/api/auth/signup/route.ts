import { NextResponse } from "next/server"
import { prisma } from "../../../../lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, password, role } = body

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
        role: role === "pro" ? "PRO" : "CLIENT",
      }
    })

    return NextResponse.json({
      message: "Account created successfully",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      }
    })

  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json(
      { error: "Failed to create account", details: String(error) },
      { status: 500 }
    )
  }
}