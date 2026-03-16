"use client"

import { useState } from "react"

const categories = [
  { name: "locs", image: "https://images.unsplash.com/photo-1653263169788-9332cdbf07f5?w=400&q=80" },
  { name: "braids", image: "https://images.unsplash.com/photo-1709672262859-68cb9b39ae4f?w=400&q=80" },
  { name: "barber", image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80" },
  { name: "natural", image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&q=80" },
  { name: "nails", image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80" },
  { name: "weave", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80" },
]

const salons = [
  { name: "Zola's Natural Hair Studio", specialty: "4C specialist", location: "Sandton", price: "from R250", color: "bg-[#f5c4d1]", height: "h-48" },
  { name: "Locs & Love by Thandi", specialty: "Locs specialist", location: "Soweto", price: "from R180", color: "bg-[#9fe1cb]", height: "h-64" },
  { name: "Cuts & Culture Barbershop", specialty: "Wolf cut", location: "Braamfontein", price: "from R120", color: "bg-[#fac775]", height: "h-56" },
  { name: "The Glam Room", specialty: "Braids", location: "Rosebank", price: "from R300", color: "bg-[#afa9ec]", height: "h-40" },
  { name: "Nails by Nomsa", specialty: "Nail art", location: "Midrand", price: "from R150", color: "bg-[#f5c4d1]", height: "h-52" },
  { name: "Sharp Cuts", specialty: "Barber", location: "Alex", price: "from R80", color: "bg-[#fac775]", height: "h-44" },
]

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <main className="min-h-screen bg-[#fdf6f0]">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-[#e8e4df] px-8 py-4 flex items-center gap-6">
        <a href="/" className="text-2xl font-semibold text-[#2c2c2a] shrink-0">
          ke<span className="text-[#E8472A]">fresh</span>
        </a>

        <div className="flex-1 max-w-xl">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search styles, salons, hair type..."
            className="w-full px-4 py-2.5 rounded-2xl border border-[#e8e4df] bg-[#fdf6f0] text-sm text-[#2c2c2a] placeholder-[#b4b2a9] focus:outline-none focus:border-[#E8472A]"
          />
        </div>

        <div className="flex items-center gap-3 shrink-0 ml-auto">
          <a href="/login" className="text-sm text-[#5f5e5a] hover:text-[#E8472A] transition-colors px-4 py-2">
            login
          </a>
          <a href="/signup" className="text-sm bg-[#E8472A] text-white px-5 py-2.5 rounded-2xl hover:bg-[#D63D22] transition-colors">
            sign up
          </a>
        </div>
      </nav>

      {/* Hero */}
      <div className="px-8 pt-12 pb-8 max-w-7xl mx-auto">
        <h1 className="text-5xl font-semibold text-[#2c2c2a] leading-tight max-w-lg">
          discover beauty <span className="text-[#E8472A]">near you</span>
        </h1>
        <p className="text-[#888780] mt-3 text-lg">
          book the best salons, barbers and stylists in your city
        </p>
      </div>

      {/* Category cards */}
      <div className="px-8 pb-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-6 gap-4">
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
      <div className="px-8 pb-16 max-w-7xl mx-auto">
        <h2 className="text-sm font-medium text-[#888780] mb-5 uppercase tracking-wide">
          top spots near you
        </h2>
        <div className="columns-4 gap-4">
          {salons.map((salon) => (
            <a key={salon.name} href="/salon" className="break-inside-avoid mb-4 block">
              <div className="bg-white rounded-2xl overflow-hidden border border-[#e8e4df] hover:border-[#E8472A] transition-colors cursor-pointer">
                <div className={`${salon.color} ${salon.height}`} />
                <div className="p-3">
                  <p className="text-sm font-medium text-[#2c2c2a]">{salon.name}</p>
                  <p className="text-xs text-[#888780] mt-1">{salon.specialty} · {salon.location}</p>
                  <p className="text-xs text-[#E8472A] mt-2 font-medium">{salon.price}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

    </main>
  )
}