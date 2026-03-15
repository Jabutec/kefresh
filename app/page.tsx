export default function Home() {
  return (
    <main className="min-h-screen bg-[#fdf6f0] px-6 pt-6 pb-24">
      
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-semibold text-[#2c2c2a] tracking-tight">
          Ke<span className="text-[#d4537e]">Fresh</span>
        </h1>
        <p className="text-sm text-[#888780] mt-1">be sharp. book easy.</p>
      </div>

      {/* Search bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <input
          type="text"
          placeholder="search styles, salons, hair type..."
          className="w-full px-4 py-3 rounded-2xl border border-[#e8e4df] bg-white text-sm text-[#2c2c2a] placeholder-[#b4b2a9] focus:outline-none focus:border-[#d4537e]"
        />
      </div>

      {/* Trending tags */}
      <div className="max-w-2xl mx-auto mb-8 flex gap-2 flex-wrap">
        {["4C natural", "layered bob", "wolf cut", "locs", "braids", "K-inspired"].map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full bg-white border border-[#e8e4df] text-xs text-[#5f5e5a] cursor-pointer hover:border-[#d4537e] hover:text-[#d4537e] transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Pinterest-style grid */}
      <div className="max-w-2xl mx-auto columns-2 gap-4">
        
        {/* Card 1 */}
        <a href="/salon" className="break-inside-avoid mb-4 block">
  <div className="bg-white rounded-2xl overflow-hidden border border-[#e8e4df] hover:border-[#d4537e] transition-colors cursor-pointer">
    <div className="h-48 bg-[#f5c4d1]" />
    <div className="p-3">
      <p className="text-sm font-medium text-[#2c2c2a]">Zola's Natural Hair Studio</p>
      <p className="text-xs text-[#888780] mt-1">4C specialist · Sandton</p>
      <p className="text-xs text-[#d4537e] mt-2 font-medium">from R250</p>
    </div>
  </div>
</a>

        {/* Card 2 */}
        <a href="/salon" className="break-inside-avoid mb-4 block">
  <div className="bg-white rounded-2xl overflow-hidden border border-[#e8e4df] hover:border-[#d4537e] transition-colors cursor-pointer">
    <div className="h-48 bg-[#f5c4d1]" />
    <div className="p-3">
      <p className="text-sm font-medium text-[#2c2c2a]">Zola's Natural Hair Studio</p>
      <p className="text-xs text-[#888780] mt-1">4C specialist · Sandton</p>
      <p className="text-xs text-[#d4537e] mt-2 font-medium">from R250</p>
    </div>
  </div>
</a>

        {/* Card 3 */}
        <a href="/salon" className="break-inside-avoid mb-4 block">
  <div className="bg-white rounded-2xl overflow-hidden border border-[#e8e4df] hover:border-[#d4537e] transition-colors cursor-pointer">
    <div className="h-48 bg-[#f5c4d1]" />
    <div className="p-3">
      <p className="text-sm font-medium text-[#2c2c2a]">Zola's Natural Hair Studio</p>
      <p className="text-xs text-[#888780] mt-1">4C specialist · Sandton</p>
      <p className="text-xs text-[#d4537e] mt-2 font-medium">from R250</p>
    </div>
  </div>
</a>

        {/* Card 4 */}
        <a href="/salon" className="break-inside-avoid mb-4 block">
  <div className="bg-white rounded-2xl overflow-hidden border border-[#e8e4df] hover:border-[#d4537e] transition-colors cursor-pointer">
    <div className="h-48 bg-[#f5c4d1]" />
    <div className="p-3">
      <p className="text-sm font-medium text-[#2c2c2a]">Zola's Natural Hair Studio</p>
      <p className="text-xs text-[#888780] mt-1">4C specialist · Sandton</p>
      <p className="text-xs text-[#d4537e] mt-2 font-medium">from R250</p>
    </div>
  </div>
</a>

      </div>
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e8e4df] px-6 py-3 flex justify-around items-center">
        
        <button className="flex flex-col items-center gap-1">
          <span className="text-[#d4537e] text-xl">⌂</span>
          <span className="text-[#d4537e] text-xs font-medium">home</span>
        </button>

        <button className="flex flex-col items-center gap-1">
          <span className="text-[#b4b2a9] text-xl">⌕</span>
          <span className="text-[#b4b2a9] text-xs">explore</span>
        </button>

        <button className="flex flex-col items-center gap-1">
          <span className="text-[#b4b2a9] text-xl">◎</span>
          <span className="text-[#b4b2a9] text-xs">bookings</span>
        </button>

        <button className="flex flex-col items-center gap-1">
          <span className="text-[#b4b2a9] text-xl">◉</span>
          <span className="text-[#b4b2a9] text-xs">profile</span>
        </button>

      </div>
    </main>
  )
}
