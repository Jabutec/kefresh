export default function SalonPage() {
  return (
    <main className="min-h-screen bg-[#fdf6f0] pb-24">

      {/* Hero image */}
      <div className="w-full h-64 bg-[#f5c4d1] relative">
        <div className="absolute top-4 left-4">
          <a href="/" className="bg-white rounded-full px-3 py-1 text-sm text-[#2c2c2a] shadow-sm">
            ← back
          </a>
        </div>
      </div>

      {/* Salon info */}
      <div className="px-6 pt-5">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-semibold text-[#2c2c2a]">
              Zola's Natural Hair Studio
            </h1>
            <p className="text-sm text-[#888780] mt-1">4C specialist · Sandton</p>
          </div>
          <span className="bg-[#FEF2EF] text-[#E8472A] text-xs font-medium px-3 py-1 rounded-full">
            Open now
          </span>
        </div>

        {/* Tags */}
        <div className="flex gap-2 mt-4 flex-wrap">
          {["4C natural", "protective styles", "locs", "braids"].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-white border border-[#e8e4df] text-xs text-[#5f5e5a]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-[#e8e4df] my-5" />

        {/* Services */}
        <h2 className="text-sm font-medium text-[#2c2c2a] mb-3">services</h2>

        <div className="flex flex-col gap-3">
          {[
            { name: "Natural hair consultation", duration: "30 min", price: "R150" },
            { name: "Wash & style", duration: "1 hr", price: "R250" },
            { name: "Box braids", duration: "3 hrs", price: "R450" },
            { name: "Loc retwist", duration: "2 hrs", price: "R350" },
          ].map((service) => (
            <div
              key={service.name}
              className="flex justify-between items-center bg-white rounded-2xl px-4 py-3 border border-[#e8e4df]"
            >
              <div>
                <p className="text-sm text-[#2c2c2a]">{service.name}</p>
                <p className="text-xs text-[#b4b2a9] mt-0.5">{service.duration}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-[#E8472A]">{service.price}</p>
              </div>
            </div>
          ))}
        </div>
d
        {/* Divider */}
        <div className="border-t border-[#e8e4df] my-5" />

        {/* About */}
        <h2 className="text-sm font-medium text-[#2c2c2a] mb-2">about</h2>
        <p className="text-sm text-[#888780] leading-relaxed">
          Zola's is a Sandton-based natural hair studio specialising in 4C hair care, 
          protective styles and loc journeys. Walk-ins welcome on weekdays.
        </p>
      </div>

      {/* Book Now button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e8e4df] px-6 py-4">
        <a href="/booking" className="w-full bg-[#E8472A] text-white py-3 rounded-2xl text-sm font-medium hover:bg-[#D63D22] transition-colors block text-center">
  book now — secure with R100 deposit
</a>
      </div>

    </main>
  )
}
