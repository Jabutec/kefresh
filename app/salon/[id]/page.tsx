"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"

export default function SalonPage() {
  const params = useParams()
  const [salon, setSalon] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetch(`/api/salons/${params.id}`)
        .then(res => res.json())
        .then(data => {
          setSalon(data)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [params.id])

  if (loading) return (
    <main className="min-h-screen bg-[#fdf6f0] flex items-center justify-center">
      <p className="text-sm text-[#888780]">loading salon...</p>
    </main>
  )

  if (!salon || salon.error) return (
    <main className="min-h-screen bg-[#fdf6f0] flex items-center justify-center">
      <p className="text-sm text-[#888780]">salon not found</p>
    </main>
  )

  const hairTypes = salon.hair_types || []
  const services = salon.services || []

  return (
    <main className="min-h-screen bg-[#fdf6f0] pb-24">

      <div className="w-full h-64 bg-[#FEF2EF] relative">
        <div className="absolute top-4 left-4">
          <a href="/" className="bg-white rounded-full px-3 py-1 text-sm text-[#2c2c2a] shadow-sm">
            ← back
          </a>
        </div>
      </div>

      <div className="px-6 pt-5">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-semibold text-[#2c2c2a]">{salon.name}</h1>
            <p className="text-sm text-[#888780] mt-1">{salon.specialty} · {salon.location}</p>
          </div>
          <span className="bg-[#FEF2EF] text-[#E8472A] text-xs font-medium px-3 py-1 rounded-full">
            Open now
          </span>
        </div>

        {hairTypes.length > 0 && (
          <div className="flex gap-2 mt-4 flex-wrap">
            {hairTypes.map((type: string) => (
              <span key={type} className="px-3 py-1 rounded-full bg-white border border-[#e8e4df] text-xs text-[#5f5e5a]">
                {type}
              </span>
            ))}
          </div>
        )}

        <div className="border-t border-[#e8e4df] my-5" />

        <h2 className="text-sm font-medium text-[#2c2c2a] mb-3">services</h2>
        <div className="flex flex-col gap-3">
          {services.length === 0 ? (
            <p className="text-sm text-[#888780]">no services listed yet</p>
          ) : (
            services.map((service: any) => (
              <div key={service.id} className="flex justify-between items-center bg-white rounded-2xl px-4 py-3 border border-[#e8e4df]">
                <div>
                  <p className="text-sm text-[#2c2c2a]">{service.name}</p>
                  <p className="text-xs text-[#b4b2a9] mt-0.5">{service.duration} mins</p>
                </div>
                <p className="text-sm font-medium text-[#E8472A]">R{service.price}</p>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-[#e8e4df] my-5" />

        <h2 className="text-sm font-medium text-[#2c2c2a] mb-2">about</h2>
        <p className="text-sm text-[#888780] leading-relaxed">
          {salon.description || "No description available"}
        </p>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e8e4df] px-6 py-4">
        <a href={`/booking/${params.id}`} className="w-full bg-[#E8472A] text-white py-3 rounded-2xl text-sm font-medium hover:bg-[#D63D22] transition-colors block text-center">
          book now — secure with R100 deposit
        </a>
      </div>

    </main>
  )
}