"use client"

import { useState, useEffect } from "react"

const categories = [
  { name: "locs", image: "https://images.unsplash.com/photo-1653263169788-9332cdbf07f5?w=400&q=80" },
  { name: "braids", image: "https://images.unsplash.com/photo-1709672262859-68cb9b39ae4f?w=400&q=80" },
  { name: "barber", image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80" },
  { name: "natural", image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&q=80" },
  { name: "nails", image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80" },
  { name: "weave", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80" },
]

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [salons, setSalons] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const stored = localStorage.getItem("kefresh_user")
    if (stored) setUser(JSON.parse(stored))
  }, [])

  useEffect(() => {
    fetch("/api/salons")
      .then(res => res.json())
      .then(data => setSalons(data))
  }, [])

  return (
    <main className="min-h-screen bg-[#fdf6f0]">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-[#e8e4df] px-8 py-4 flex items-center gap-6">
        <a href="/" className="text-2xl font-semibold text-[#2c2c2a] shrink-0">
          ke<span className="text-[#E8472A]">fresh</span>
        </a>

        <div className="flex-1 max-w-xl max-sm:hidden">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search styles, salons, hair type..."
            className="w-full px-4 py-2.5 rounded-2xl border border-[#e8e4df] bg-[#fdf6f0] text-sm text-[#2c2c2a] placeholder-[#b4b2a9] focus:outline-none focus:border-[#E8472A]"
          />
        </div>

        <div className="flex items-center gap-3 shrink-0 ml-auto">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#2c2c2a] font-medium">
                 {user.firstName} 
              </span>
              <button
                onClick={() => {
                  localStorage.removeItem("kefresh_user")
                  setUser(null)
                }}
                className="text-sm text-[#888780] hover:text-[#E8472A] transition-colors"
              >
                logout
              </button>
            </div>
            ) : (
            <>
              <a href="/login" className="text-sm text-[#5f5e5a] hover:text-[#E8472A] transition-colors px-4 py-2">
                login
              </a>
              <a href="/signup" className="text-sm bg-[#E8472A] text-white px-5 py-2.5 rounded-2xl hover:bg-[#D63D22] transition-colors">
                sign up
              </a>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <div className="px-8 pt-12 pb-8 max-w-7xl mx-auto max-sm:px-4 max-sm:pt-8">
        <h1 className="text-5xl font-semibold text-[#2c2c2a] leading-tight max-w-lg max-sm:text-3xl">
          discover beauty <span className="text-[#E8472A]">near you</span>
        </h1>
        <p className="text-[#888780] mt-3 text-sm md:text-lg">
          book the best salons, barbers and stylists in your city
        </p>
      </div>

      {/* Category cards */}
      <div className="px-8 pb-10 max-w-7xl mx-auto max-sm:px-4">
        <div className="grid grid-cols-6 gap-3 max-sm:grid-cols-3">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all ${
                selectedCategory === cat.name
                  ? "ring-2 ring-[#E8472A] ring-offset-2"
                  : "hover:scale-105"
              }`}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <span className="absolute bottom-2 left-0 right-0 text-center text-white text-sm font-medium">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Salon grid */}
      <div className="px-8 pb-16 max-w-7xl mx-auto max-sm:px-4">
        <h2 className="text-sm font-medium text-[#888780] mb-5 uppercase tracking-wide">
          top spots near you
        </h2>
        <div className="columns-4 gap-4 max-sm:columns-2">
          {salons.length === 0 ? (
            <p className="text-sm text-[#888780]">loading salons...</p>
          ) : (
            salons.map((salon) => (
              <a key={salon.id} href={`/salon/${salon.id}`} className="break-inside-avoid mb-4 block">
                <div className="bg-white rounded-2xl overflow-hidden border border-[#e8e4df] hover:border-[#E8472A] transition-colors cursor-pointer">
                  <div className="h-48 bg-[#FEF2EF]" />
                  <div className="p-3">
                    <p className="text-sm font-medium text-[#2c2c2a]">{salon.name}</p>
                    <p className="text-xs text-[#888780] mt-1">{salon.specialty} · {salon.location}</p>
                    <p className="text-xs text-[#E8472A] mt-2 font-medium">from R{salon.services[0]?.price ?? "—"}</p>
                  </div>
                </div>
              </a>
            ))
          )}
        </div>
      </div>

    </main>
  )
}