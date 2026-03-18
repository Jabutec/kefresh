"use client"

import { useState, useEffect } from "react"

export default function ConfirmationPage() {
  const [saved, setSaved] = useState(false)
  const [bookingDetails, setBookingDetails] = useState<any>(null)

useEffect(() => {
  const params = new URLSearchParams(window.location.search)
  setBookingDetails({
    salon: params.get("salon"),
    service: params.get("service"),
    date: params.get("date"),
    time: params.get("time"),
  })
}, [])

  return (
    <main className="min-h-screen bg-[#fdf6f0] flex flex-col items-center justify-center px-6">

      <div className="w-24 h-24 rounded-full bg-[#FEF2EF] flex items-center justify-center mb-6">
        <span className="text-4xl text-[#E8472A]">✓</span>
      </div>

      <h1 className="text-2xl font-semibold text-[#2c2c2a] text-center">you're booked!</h1>
      <p className="text-sm text-[#888780] text-center mt-2">your appointment is confirmed</p>

      <div className="w-full max-w-sm bg-white rounded-2xl border border-[#e8e4df] px-5 py-5 mt-8 flex flex-col gap-3">
        <div className="flex justify-between text-sm">
          <span className="text-[#888780]">salon</span>
          <span className="text-[#2c2c2a] font-medium">{bookingDetails?.salon}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#888780]">service</span>
          <span className="text-[#2c2c2a]">{bookingDetails?.service}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#888780]">date</span>
          <span className="text-[#2c2c2a]">{bookingDetails?.date}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#888780]">time</span>
          <span className="text-[#2c2c2a]">{bookingDetails?.time}</span>
        </div>
      </div>

      <div className="w-full max-w-sm bg-[#FEF2EF] rounded-2xl px-5 py-4 mt-4">
        <p className="text-xs text-[#E8472A] font-medium mb-1">reminder sent to your phone</p>
        <p className="text-xs text-[#888780]">you'll receive an SMS 24hrs before your appointment</p>
      </div>

      <button
        onClick={() => setSaved(true)}
        className={`w-full max-w-sm mt-4 py-3 rounded-2xl text-sm font-medium border transition-colors ${
          saved
            ? "bg-[#FEF2EF] border-[#E8472A] text-[#E8472A]"
            : "bg-white border-[#e8e4df] text-[#2c2c2a]"
        }`}
      >
        {saved ? "✓ saved to calendar" : "save to calendar"}
      </button>

      <a href="/" className="w-full max-w-sm mt-3 py-3 rounded-2xl text-sm font-medium bg-[#E8472A] text-white text-center block hover:bg-[#D63D22] transition-colors">
        discover more salons
      </a>

    </main>
  )
}