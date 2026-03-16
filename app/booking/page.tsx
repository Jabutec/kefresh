"use client"

import { useState } from "react"

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState("17")
  const [selectedTime, setSelectedTime] = useState("13:00")
  return (
    <main className="min-h-screen bg-[#fdf6f0] pb-32">

      {/* Header */}
      <div className="px-6 pt-6 pb-4 bg-white border-b border-[#e8e4df]">
        <a href="/salon" className="text-sm text-[#888780]">← back</a>
        <h1 className="text-lg font-semibold text-[#2c2c2a] mt-2">book your appointment</h1>
        <p className="text-sm text-[#888780]">Zola's Natural Hair Studio</p>
      </div>

      <div className="px-6 pt-6 flex flex-col gap-6">

        {/* Selected service */}
        <div>
          <h2 className="text-sm font-medium text-[#2c2c2a] mb-3">selected service</h2>
          <div className="bg-white rounded-2xl px-4 py-3 border border-[#E8472A]">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-[#2c2c2a] font-medium">Box braids</p>
                <p className="text-xs text-[#b4b2a9] mt-0.5">3 hrs</p>
              </div>
              <p className="text-sm font-medium text-[#E8472A]">R450</p>
            </div>
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
            ].map((d, i) => (
              <div
                key={d.date}
                onClick={() => setSelectedDate(d.date)}
className={`flex flex-col items-center px-4 py-3 rounded-2xl border cursor-pointer min-w-[60px] ${
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
            {["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"].map((time, i) => (
              <div
                key={time}
                onClick={() => setSelectedTime(time)}
className={`text-center py-3 rounded-2xl border text-sm cursor-pointer ${
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

        {/* Your details */}
        <div>
          <h2 className="text-sm font-medium text-[#2c2c2a] mb-3">your details</h2>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="full name"
              className="w-full px-4 py-3 rounded-2xl border border-[#e8e4df] bg-white text-sm text-[#2c2c2a] placeholder-[#b4b2a9] focus:outline-none focus:border-[#E8472A]"
            />
            <input
              type="tel"
              placeholder="phone number"
              className="w-full px-4 py-3 rounded-2xl border border-[#e8e4df] bg-white text-sm text-[#2c2c2a] placeholder-[#b4b2a9] focus:outline-none focus:border-[#E8472A]"
            />
          </div>
        </div>

        {/* Booking summary */}
        <div className="bg-white rounded-2xl border border-[#e8e4df] px-4 py-4">
          <h2 className="text-sm font-medium text-[#2c2c2a] mb-3">booking summary</h2>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#888780]">service</span>
              <span className="text-[#2c2c2a]">Box braids</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#888780]">date</span>
              <span className="text-[#2c2c2a]">Mon, {selectedDate} March</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#888780]">time</span>
              <span className="text-[#2c2c2a]">{selectedTime}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#888780]">salon</span>
              <span className="text-[#2c2c2a]">Zola's Natural Hair Studio</span>
            </div>
            <div className="border-t border-[#e8e4df] mt-2 pt-2 flex justify-between text-sm">
              <span className="text-[#888780]">deposit due now</span>
              <span className="text-[#E8472A] font-semibold">R100</span>
            </div>
          </div>
        </div>

      </div>

      {/* Pay deposit button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e8e4df] px-6 py-4">
        <a href="/confirmation" className="w-full bg-[#E8472A] text-white py-3 rounded-2xl text-sm font-medium hover:bg-[#D63D22] transition-colors block text-center">
  pay R100 deposit via yoco
</a>
        <p className="text-center text-xs text-[#b4b2a9] mt-2">remaining R350 paid at appointment</p>
      </div>

    </main>
  )
}