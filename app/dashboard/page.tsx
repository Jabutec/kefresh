"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [salon, setSalon] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [saving, setSaving] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [addingService, setAddingService] = useState(false)

  const [form, setForm] = useState({
    name: "",
    description: "",
    location: "",
    specialty: "",
    hairTypes: "",
  })

  const [serviceForm, setServiceForm] = useState({
    name: "",
    price: "",
    duration: "",
  })

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

  const handleCreateSalon = async () => {
    setSaving(true)
    try {
      const res = await fetch("/api/dashboard/salon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          location: form.location,
          specialty: form.specialty,
          hairTypes: form.hairTypes.split(",").map((t: string) => t.trim()),
          ownerId: user.id,
        })
      })
      const data = await res.json()
      if (res.ok) {
        setSalon(data)
        setActiveTab("overview")
      }
    } catch (error) {
      console.error("Error creating salon:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleAddService = async () => {
    setAddingService(true)
    try {
      const res = await fetch("/api/dashboard/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: serviceForm.name,
          price: serviceForm.price,
          duration: serviceForm.duration,
          salonId: salon.id,
        })
      })
      const data = await res.json()
      if (res.ok) {
        setSalon({ ...salon, services: [...(salon.services || []), data] })
        setServiceForm({ name: "", price: "", duration: "" })
        setShowServiceForm(false)
      }
    } catch (error) {
      console.error("Error adding service:", error)
    } finally {
      setAddingService(false)
    }
  }

  const handleDeleteService = async (serviceId: string) => {
    const res = await fetch(`/api/dashboard/services?id=${serviceId}`, {
      method: "DELETE"
    })
    if (res.ok) {
      setSalon({
        ...salon,
        services: salon.services.filter((s: any) => s.id !== serviceId)
      })
    }
  }

  if (loading) return (
    <main className="min-h-screen bg-[#fdf6f0] flex items-center justify-center">
      <p className="text-sm text-[#888780]">loading dashboard...</p>
    </main>
  )

  return (
    <main className="min-h-screen bg-[#fdf6f0]">

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

        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#2c2c2a]">
            {salon ? salon.name : "welcome to your dashboard"}
          </h1>
          <p className="text-sm text-[#888780] mt-1">
            {salon ? `${salon.location} · ${salon.specialty}` : "let's set up your salon profile"}
          </p>
        </div>

        {!salon && (
          <div className="bg-white rounded-2xl border border-[#e8e4df] p-8">
            {activeTab !== "setup" ? (
              <div className="text-center">
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
            ) : (
              <div className="flex flex-col gap-4 max-w-lg">
                <h2 className="text-lg font-semibold text-[#2c2c2a]">create your salon profile</h2>
                <input
                  type="text"
                  placeholder="salon name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-[#e8e4df] bg-[#fdf6f0] text-sm text-[#2c2c2a] placeholder-[#b4b2a9] focus:outline-none focus:border-[#E8472A]"
                />
                <input
                  type="text"
                  placeholder="location (e.g. Sandton, Johannesburg)"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-[#e8e4df] bg-[#fdf6f0] text-sm text-[#2c2c2a] placeholder-[#b4b2a9] focus:outline-none focus:border-[#E8472A]"
                />
                <input
                  type="text"
                  placeholder="specialty (e.g. 4C natural hair, Barber)"
                  value={form.specialty}
                  onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-[#e8e4df] bg-[#fdf6f0] text-sm text-[#2c2c2a] placeholder-[#b4b2a9] focus:outline-none focus:border-[#E8472A]"
                />
                <input
                  type="text"
                  placeholder="hair types (comma separated e.g. 4C, locs, braids)"
                  value={form.hairTypes}
                  onChange={(e) => setForm({ ...form, hairTypes: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-[#e8e4df] bg-[#fdf6f0] text-sm text-[#2c2c2a] placeholder-[#b4b2a9] focus:outline-none focus:border-[#E8472A]"
                />
                <textarea
                  placeholder="describe your salon..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-[#e8e4df] bg-[#fdf6f0] text-sm text-[#2c2c2a] placeholder-[#b4b2a9] focus:outline-none focus:border-[#E8472A] h-24 resize-none"
                />
                <button
                  onClick={handleCreateSalon}
                  disabled={saving}
                  className="w-full bg-[#E8472A] text-white py-3 rounded-2xl text-sm font-medium hover:bg-[#D63D22] transition-colors disabled:opacity-50"
                >
                  {saving ? "creating..." : "create salon profile"}
                </button>
              </div>
            )}
          </div>
        )}

        {salon && (
          <>
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

            {activeTab === "services" && (
              <div className="bg-white rounded-2xl border border-[#e8e4df] p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-sm font-medium text-[#2c2c2a]">your services</h2>
                  <button
                    onClick={() => setShowServiceForm(!showServiceForm)}
                    className="text-sm bg-[#E8472A] text-white px-4 py-2 rounded-2xl hover:bg-[#D63D22] transition-colors"
                  >
                    + add service
                  </button>
                </div>

                {showServiceForm && (
                  <div className="flex flex-col gap-3 mb-6 p-4 bg-[#fdf6f0] rounded-2xl">
                    <input
                      type="text"
                      placeholder="service name (e.g. Box braids)"
                      value={serviceForm.name}
                      onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-[#e8e4df] bg-white text-sm text-[#2c2c2a] placeholder-[#b4b2a9] focus:outline-none focus:border-[#E8472A]"
                    />
                    <div className="flex gap-3">
                      <input
                        type="number"
                        placeholder="price (R)"
                        value={serviceForm.price}
                        onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                        className="flex-1 px-4 py-3 rounded-2xl border border-[#e8e4df] bg-white text-sm text-[#2c2c2a] placeholder-[#b4b2a9] focus:outline-none focus:border-[#E8472A]"
                      />
                      <input
                        type="number"
                        placeholder="duration (mins)"
                        value={serviceForm.duration}
                        onChange={(e) => setServiceForm({ ...serviceForm, duration: e.target.value })}
                        className="flex-1 px-4 py-3 rounded-2xl border border-[#e8e4df] bg-white text-sm text-[#2c2c2a] placeholder-[#b4b2a9] focus:outline-none focus:border-[#E8472A]"
                      />
                    </div>
                    <button
                      onClick={handleAddService}
                      disabled={addingService}
                      className="w-full bg-[#E8472A] text-white py-3 rounded-2xl text-sm font-medium hover:bg-[#D63D22] transition-colors disabled:opacity-50"
                    >
                      {addingService ? "adding..." : "add service"}
                    </button>
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  {(salon.services || []).length === 0 ? (
                    <p className="text-sm text-[#888780]">no services yet — add your first service</p>
                  ) : (
                    (salon.services || []).map((service: any) => (
                      <div key={service.id} className="flex justify-between items-center py-3 border-b border-[#e8e4df] last:border-0">
                        <div>
                          <p className="text-sm text-[#2c2c2a]">{service.name}</p>
                          <p className="text-xs text-[#888780]">{service.duration} mins</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="text-sm font-medium text-[#E8472A]">R{service.price}</p>
                          <button
                            onClick={() => handleDeleteService(service.id)}
                            className="text-xs text-[#888780] hover:text-red-500 transition-colors"
                          >
                            remove
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

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