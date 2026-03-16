"use client"

import { useState } from "react"

export default function SignupPage() {
  const [role, setRole] = useState<"client" | "pro" | null>(null)

  return (
    <main className="min-h-screen bg-[#fdf6f0] flex flex-col">

      {/* Navbar */}
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

        {/* Heading */}
        <h1 className="text-3xl font-semibold text-[#2c2c2a] text-center">
          join ke<span className="text-[#E8472A]">fresh</span>
        </h1>
        <p className="text-[#888780] text-sm mt-2 text-center">
          first, tell us who you are
        </p>

        {/* Role selector */}
        <div className="flex gap-4 mt-10 w-full max-w-lg">

          {/* Client card */}
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

          {/* Pro card */}
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

        {/* Form — appears after role selected */}
        {role && (
          <div className="w-full max-w-lg mt-8 flex flex-col gap-4">

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="first name"
                className="flex-1 px-4 py-3 rounded-2xl border border-[#e8e4df] bg-white text-sm text-[#2c2c2a] placeholder-[#b4b2a9] focus:outline-none focus:border-[#E8472A]"
              />
              <input
                type="text"
                placeholder="last name"
                className="flex-1 px-4 py-3 rounded-2xl border border-[#e8e4df] bg-white text-sm text-[#2c2c2a] placeholder-[#b4b2a9] focus:outline-none focus:border-[#E8472A]"
              />
            </div>

            <input
              type="email"
              placeholder="email address"
              className="w-full px-4 py-3 rounded-2xl border border-[#e8e4df] bg-white text-sm text-[#2c2c2a] placeholder-[#b4b2a9] focus:outline-none focus:border-[#E8472A]"
            />

            <input
              type="tel"
              placeholder="phone number"
              className="w-full px-4 py-3 rounded-2xl border border-[#e8e4df] bg-white text-sm text-[#2c2c2a] placeholder-[#b4b2a9] focus:outline-none focus:border-[#E8472A]"
            />

            <input
              type="password"
              placeholder="create a password"
              className="w-full px-4 py-3 rounded-2xl border border-[#e8e4df] bg-white text-sm text-[#2c2c2a] placeholder-[#b4b2a9] focus:outline-none focus:border-[#E8472A]"
            />

            {/* Pro extra field */}
            {role === "pro" && (
              <input
                type="text"
                placeholder="salon or business name"
                className="w-full px-4 py-3 rounded-2xl border border-[#e8e4df] bg-white text-sm text-[#2c2c2a] placeholder-[#b4b2a9] focus:outline-none focus:border-[#E8472A]"
              />
            )}

            <button className="w-full bg-[#E8472A] text-white py-3 rounded-2xl text-sm font-medium hover:bg-[#D63D22] transition-colors mt-2">
              {role === "client" ? "create my account" : "list my business"}
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