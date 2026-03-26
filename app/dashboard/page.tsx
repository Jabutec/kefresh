"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [salon, setSalon] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const stored = localStorage.getItem("kefresh_user")
    if (!stored) {
      router.push("/login")
      return
    }
    const parsedUser = JSON.parse(stored)
    if (parsedUser.role !== "PRO") {
      router.push("/")
      return
    }
    setUser(parsedUser)
    fetchSalon(parsedUser.id)
  }, [])

  const fetchSalon = async (ownerId: string) => {
    const res = await fetch(`/api/dashboard/salon?ownerId=${ownerId}`)
    const data = await res.json()
    setSalon(data)
    setLoading(false)
  }

  if (loading) return (
    <main className="min-h-screen bg-[#fdf6f0] flex items-center justify-center">
      <p className="text-sm text-[#888780]">loading dashboard...</p>
    </main>
  )

  return (
    <main className="min-h-screen bg-[#fdf6f0]">

      {/* Navbar */}
      <nav className="bg-white border-b border-[#e8e4df] px-8 py-4 flex items-center justify-between">
        <a href="/" className="text-2xl font-semibold text-[#2c2c2a]">
          ke<span className="text-[#E8472A]">fresh</span>
          <span className="text-xs text-[#888780] ml-2 font-normal">pro</span>
        </a>
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#2c2c2a] font-medium">{user?.firstName}</span>
          <button
            onClick={() => {
              localStorage.removeItem("kefresh_user")
              router.push("/")
            }}
            className="text-sm text-[#888780] hover:text-[#E8472A] transition-colors"
          >
            logout
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#2c2c2a]">
            {salon ? salon.name : "welcome to your dashboard"}
          </h1>
          <p className="text-sm text-[#888780] mt-1">
            {salon ? `${salon.location} · ${salon.specialty}` : "let's set up your salon profile"}
          </p>
        </div>

        {/* No salon yet */}
        {!salon && (
          <div className="bg-white rounded-2xl border border-[#e8e4df] p-8 text-center">
            <p className="text-2xl mb-4">✂️</p>
            <h2 className="text-lg font-semibold text-[#2c2c2a] mb-2">set up your salon</h2>
            <p className="text-sm text-[#888780] mb-6">
              create your salon profile to start appearing in the KeFresh feed
            </p>
            <button
              onClick={() => setActiveTab("setup")}
              className="bg-[#E8472A] text-white px-6 py-3 rounded-2xl text-sm font-medium hover:bg-[#D63D22] transition-colors"
            >
              create salon profile
            </button>
          </div>
        )}

        {/* Salon exists — show tabs */}
        {salon && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-2xl border border-[#e8e4df] p-5">
                <p className="text-xs text-[#888780] mb-1">total bookings</p>
                <p className="text-2xl font-semibold text-[#2c2c2a]">0</p>
              </div>
              <div className="bg-white rounded-2xl border border-[#e8e4df] p-5">
                <p className="text-xs text-[#888780] mb-1">services listed</p>
                <p className="text-2xl font-semibold text-[#2c2c2a]">{salon.services?.length || 0}</p>
              </div>
              <div className="bg-white rounded-2xl border border-[#e8e4df] p-5">
                <p className="text-xs text-[#888780] mb-1">portfolio cards</p>
                <p className="text-2xl font-semibold text-[#2c2c2a]">{salon.cards?.length || 0}</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              {["overview", "services", "portfolio", "bookings"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-2xl text-sm transition-colors ${
                    activeTab === tab
                      ? "bg-[#E8472A] text-white"
                      : "bg-white border border-[#e8e4df] text-[#5f5e5a]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Overview tab */}
            {activeTab === "overview" && (
              <div className="bg-white rounded-2xl border border-[#e8e4df] p-6">
                <h2 className="text-sm font-medium text-[#2c2c2a] mb-4">salon details</h2>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#888780]">name</span>
                    <span className="text-[#2c2c2a]">{salon.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#888780]">location</span>
                    <span className="text-[#2c2c2a]">{salon.location}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#888780]">specialty</span>
                    <span className="text-[#2c2c2a]">{salon.specialty}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#888780]">hair types</span>
                    <span className="text-[#2c2c2a]">{salon.hair_types?.join(", ")}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Services tab */}
            {activeTab === "services" && (
              <div className="bg-white rounded-2xl border border-[#e8e4df] p-6">
                <h2 className="text-sm font-medium text-[#2c2c2a] mb-4">your services</h2>
                <div className="flex flex-col gap-3">
                  {(salon.services || []).map((service: any) => (
                    <div key={service.id} className="flex justify-between items-center py-3 border-b border-[#e8e4df] last:border-0">
                      <div>
                        <p className="text-sm text-[#2c2c2a]">{service.name}</p>
                        <p className="text-xs text-[#888780]">{service.duration} mins</p>
                      </div>
                      <p className="text-sm font-medium text-[#E8472A]">R{service.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Portfolio tab */}
            {activeTab === "portfolio" && (
              <div className="bg-white rounded-2xl border border-[#e8e4df] p-6">
                <h2 className="text-sm font-medium text-[#2c2c2a] mb-4">your portfolio</h2>
                {salon.cards?.length === 0 ? (
                  <p className="text-sm text-[#888780]">no portfolio cards yet — add photos of your work</p>
                ) : (
                  <div className="grid grid-cols-3 gap-3">
                    {salon.cards.map((card: any) => (
                      <div key={card.id} className="bg-[#FEF2EF] rounded-2xl h-32 flex items-center justify-center">
                        <p className="text-xs text-[#888780]">{card.style}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Bookings tab */}
            {activeTab === "bookings" && (
              <div className="bg-white rounded-2xl border border-[#e8e4df] p-6">
                <h2 className="text-sm font-medium text-[#2c2c2a] mb-4">upcoming bookings</h2>
                <p className="text-sm text-[#888780]">no bookings yet — share your KeFresh profile to get started</p>
              </div>
            )}
          </>
        )}

      </div>
    </main>
  )
}