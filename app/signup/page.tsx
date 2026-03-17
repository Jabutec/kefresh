"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter()
  const [role, setRole] = useState<"client" | "pro" | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    businessName: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          password: form.password,
          role: role,
        })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error)
        return
      }

      router.push("/login")

    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#fdf6f0] flex flex-col">

      <nav className="bg-white border-b border-[#e8e4df] px-8 py-4 flex items-center justify-between">
        <a href="/" className="text-2xl font-semibold text-[#2c2c2a]">
          ke<span className="text-[#E8472A]">fresh</span>
        </a>
        <p className="text-sm text-[#888780]">
          already have an account?{" "}
          <a href="/login" className="text-[#E8472A] hover:underline">login</a>
        </p>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">

        <h1 className="text-3xl font-semibold text-[#2c2c2a] text-center">
          join ke<span className="text-[#E8472A]">fresh</span>
        </h1>
        <p className="text-[#888780] text-sm mt-2 text-center">
          first, tell us who you are
        </p>

        <div className="flex gap-4 mt-10 w-full max-w-lg">
          <button
            onClick={() => setRole("client")}
            className={`flex-1 rounded-2xl border-2 px-6 py-8 flex flex-col items-center gap-3 transition-all cursor-pointer ${
              role === "client"
                ? "border-[#E8472A] bg-[#FEF2EF]"
                : "border-[#e8e4df] bg-white hover:border-[#E8472A]"
            }`}
          >
            <span className="text-4xl">💆🏾‍♀️</span>
            <p className="text-base font-semibold text-[#2c2c2a]">I'm a client</p>
            <p className="text-xs text-[#888780] text-center leading-relaxed">
              I want to discover and book beauty services near me
            </p>
          </button>

          <button
            onClick={() => setRole("pro")}
            className={`flex-1 rounded-2xl border-2 px-6 py-8 flex flex-col items-center gap-3 transition-all cursor-pointer ${
              role === "pro"
                ? "border-[#E8472A] bg-[#FEF2EF]"
                : "border-[#e8e4df] bg-white hover:border-[#E8472A]"
            }`}
          >
            <span className="text-4xl">✂️</span>
            <p className="text-base font-semibold text-[#2c2c2a]">I'm a pro</p>
            <p className="text-xs text-[#888780] text-center leading-relaxed">
              I'm a stylist, barber or salon owner who wants to grow my business
            </p>
          </button>
        </div>

        {role && (
          <div className="w-full max-w-lg mt-8 flex flex-col gap-4">

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-2xl">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <input
                type="text"
                name="firstName"
                placeholder="first name"
                value={form.firstName}
                onChange={handleChange}
                className="flex-1 px-4 py-3 rounded-2xl border border-[#e8e4df] bg-white text-sm text-[#2c2c2a] placeholder-[#b4b2a9] focus:outline-none focus:border-[#E8472A]"
              />
              <input
                type="text"
                name="lastName"
                placeholder="last name"
                value={form.lastName}
                onChange={handleChange}
                className="flex-1 px-4 py-3 rounded-2xl border border-[#e8e4df] bg-white text-sm text-[#2c2c2a] placeholder-[#b4b2a9] focus:outline-none focus:border-[#E8472A]"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="email address"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-[#e8e4df] bg-white text-sm text-[#2c2c2a] placeholder-[#b4b2a9] focus:outline-none focus:border-[#E8472A]"
            />

            <input
              type="tel"
              name="phone"
              placeholder="phone number"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-[#e8e4df] bg-white text-sm text-[#2c2c2a] placeholder-[#b4b2a9] focus:outline-none focus:border-[#E8472A]"
            />

            <input
              type="password"
              name="password"
              placeholder="create a password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-[#e8e4df] bg-white text-sm text-[#2c2c2a] placeholder-[#b4b2a9] focus:outline-none focus:border-[#E8472A]"
            />

            {role === "pro" && (
              <input
                type="text"
                name="businessName"
                placeholder="salon or business name"
                value={form.businessName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl border border-[#e8e4df] bg-white text-sm text-[#2c2c2a] placeholder-[#b4b2a9] focus:outline-none focus:border-[#E8472A]"
              />
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-[#E8472A] text-white py-3 rounded-2xl text-sm font-medium hover:bg-[#D63D22] transition-colors mt-2 disabled:opacity-50"
            >
              {loading ? "creating account..." : role === "client" ? "create my account" : "list my business"}
            </button>

            <p className="text-xs text-[#b4b2a9] text-center">
              by signing up you agree to KeFresh's terms and privacy policy
            </p>

          </div>
        )}

      </div>

    </main>
  )
}