"use client"

import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <main className="min-h-screen bg-[#fdf6f0] flex flex-col">

      {/* Navbar */}
      <nav className="bg-white border-b border-[#e8e4df] px-8 py-4 flex items-center justify-between">
        <a href="/" className="text-2xl font-semibold text-[#2c2c2a]">
          ke<span className="text-[#E8472A]">fresh</span>
        </a>
        <p className="text-sm text-[#888780]">
          no account yet?{" "}
          <a href="/signup" className="text-[#E8472A] hover:underline">sign up</a>
        </p>
      </nav>

      {/* Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">

        <div className="w-full max-w-sm">

          {/* Heading */}
          <h1 className="text-3xl font-semibold text-[#2c2c2a] text-center">
            welcome back
          </h1>
          <p className="text-[#888780] text-sm mt-2 text-center">
            log in to your ke<span className="text-[#E8472A]">fresh</span> account
          </p>

          {/* Fields */}
          <div className="flex flex-col gap-4 mt-10">

            <input
              type="email"
              placeholder="email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-[#e8e4df] bg-white text-sm text-[#2c2c2a] placeholder-[#b4b2a9] focus:outline-none focus:border-[#E8472A]"
            />

            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-[#e8e4df] bg-white text-sm text-[#2c2c2a] placeholder-[#b4b2a9] focus:outline-none focus:border-[#E8472A]"
            />

            <div className="flex justify-end">
              <a href="#" className="text-xs text-[#E8472A] hover:underline">
                forgot password?
              </a>
            </div>

            <button className="w-full bg-[#E8472A] text-white py-3 rounded-2xl text-sm font-medium hover:bg-[#D63D22] transition-colors">
              login
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 border-t border-[#e8e4df]" />
              <span className="text-xs text-[#b4b2a9]">or</span>
              <div className="flex-1 border-t border-[#e8e4df]" />
            </div>

            {/* Google login */}
            <button className="w-full bg-white border border-[#e8e4df] text-[#2c2c2a] py-3 rounded-2xl text-sm font-medium hover:border-[#E8472A] transition-colors flex items-center justify-center gap-2">
              <span>G</span>
              continue with google
            </button>

          </div>

          <p className="text-xs text-[#b4b2a9] text-center mt-6">
            by logging in you agree to KeFresh's terms and privacy policy
          </p>

        </div>
      </div>

    </main>
  )
}