"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"

export default function BookingPage() {
  const params = useParams()
  const router = useRouter()
  const [salon, setSalon] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState("17")
  const [selectedTime, setSelectedTime] = useState("13:00")
  const [selectedService, setSelectedService] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetch(`/api/salons/${params.id}`)
        .then(res => res.json())
        .then(data => {
          setSalon(data)
          if (data.services?.length > 0) {
            setSelectedService(data.services[0])
          }
        })
    }
  }, [params.id])

  const handleBooking = async () => {
    const stored = localStorage.getItem("kefresh_user")
    if (!stored) {
      router.push("/login")
      return
    }

    const user = JSON.parse(stored)
    setLoading(true)

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: user.id,
          salonId: params.id,
          serviceId: selectedService.id,
          date: new Date(`2026-03-${selectedDate}T${selectedTime}:00`),
        })
      })

      const data = await res.json()

      if (res.ok) {
  router.push(`/confirmation?salon=${salon.name}&service=${selectedService.name}&date=March ${selectedDate}&time=${selectedTime}`)
}
    } catch (error) {
      console.error("Booking error:", error)
      alert("Booking failed: " + error)
    } finally {
      setLoading(false)
    }
  }

  if (!salon) return (
    <main className="min-h-screen bg-[#fdf6f0] flex items-center justify-center">
      <p className="text-sm text-[#888780]">loading...</p>
    </main>
  )

  return (
    <main className="min-h-screen bg-[#fdf6f0] pb-32">

      <div className="px-6 pt-6 pb-4 bg-white border-b border-[#e8e4df]">
        <a href={`/salon/${params.id}`} className="text-sm text-[#888780]">← back</a>
        <h1 className="text-lg font-semibold text-[#2c2c2a] mt-2">book your appointment</h1>
        <p className="text-sm text-[#888780]">{salon.name}</p>
      </div>

      <div className="px-6 pt-6 flex flex-col gap-6">

        {/* Select service */}
        <div>
          <h2 className="text-sm font-medium text-[#2c2c2a] mb-3">select service</h2>
          <div className="flex flex-col gap-2">
            {salon.services.map((service: any) => (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className={`flex justify-between items-center rounded-2xl px-4 py-3 border cursor-pointer transition-colors ${
                  selectedService?.id === service.id
                    ? "border-[#E8472A] bg-[#FEF2EF]"
                    : "bg-white border-[#e8e4df]"
                }`}
              >
                <div>
                  <p className="text-sm text-[#2c2c2a]">{service.name}</p>
                  <p className="text-xs text-[#b4b2a9] mt-0.5">{service.duration} mins</p>
                </div>
                <p className="text-sm font-medium text-[#E8472A]">R{service.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pick a date */}
        <div>
          <h2 className="text-sm font-medium text-[#2c2c2a] mb-3">pick a date</h2>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {[
              { day: "Mon", date: "17" },
              { day: "Tue", date: "18" },
              { day: "Wed", date: "19" },
              { day: "Thu", date: "20" },
              { day: "Fri", date: "21" },
              { day: "Sat", date: "22" },
            ].map((d) => (
              <div
                key={d.date}
                onClick={() => setSelectedDate(d.date)}
                className={`flex flex-col items-center px-4 py-3 rounded-2xl border cursor-pointer min-w-[60px] transition-colors ${
                  selectedDate === d.date
                    ? "bg-[#E8472A] border-[#E8472A] text-white"
                    : "bg-white border-[#e8e4df] text-[#2c2c2a]"
                }`}
              >
                <span className="text-xs">{d.day}</span>
                <span className="text-sm font-medium mt-1">{d.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pick a time */}
        <div>
          <h2 className="text-sm font-medium text-[#2c2c2a] mb-3">pick a time</h2>
          <div className="grid grid-cols-3 gap-2">
            {["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"].map((time) => (
              <div
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`text-center py-3 rounded-2xl border text-sm cursor-pointer transition-colors ${
                  selectedTime === time
                    ? "bg-[#E8472A] border-[#E8472A] text-white font-medium"
                    : "bg-white border-[#e8e4df] text-[#2c2c2a]"
                }`}
              >
                {time}
              </div>
            ))}
          </div>
        </div>

        {/* Booking summary */}
        <div className="bg-white rounded-2xl border border-[#e8e4df] px-4 py-4">
          <h2 className="text-sm font-medium text-[#2c2c2a] mb-3">booking summary</h2>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#888780]">service</span>
              <span className="text-[#2c2c2a]">{selectedService?.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#888780]">date</span>
              <span className="text-[#2c2c2a]">March {selectedDate}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#888780]">time</span>
              <span className="text-[#2c2c2a]">{selectedTime}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#888780]">salon</span>
              <span className="text-[#2c2c2a]">{salon.name}</span>
            </div>
            <div className="border-t border-[#e8e4df] mt-2 pt-2 flex justify-between text-sm">
              <span className="text-[#888780]">deposit due now</span>
              <span className="text-[#E8472A] font-semibold">R100</span>
            </div>
          </div>
        </div>

      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e8e4df] px-6 py-4">
        <button
          onClick={handleBooking}
          disabled={loading}
          className="w-full bg-[#E8472A] text-white py-3 rounded-2xl text-sm font-medium hover:bg-[#D63D22] transition-colors disabled:opacity-50"
        >
          {loading ? "booking..." : "pay R100 deposit via yoco"}
        </button>
        <p className="text-center text-xs text-[#b4b2a9] mt-2">
          remaining R{selectedService ? selectedService.price - 100 : "—"} paid at appointment
        </p>
      </div>

    </main>
  )
}