"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { portfolioItems, portfolioStyles, type PortfolioItem, type StyleEntry } from "@/lib/portfolio"

export function TitleRoePortfolio() {
  const [items] = useState<PortfolioItem[]>(portfolioItems)
  const [styles] = useState<StyleEntry[]>(portfolioStyles)
  const [active, setActive] = useState("all")
  const [page, setPage] = useState(1)
  const [lightbox, setLightbox] = useState<PortfolioItem | null>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const perPage = 40

  const activeStyles = [{ style: "all", count: items.length }, ...styles]
  const filtered = active === "all" ? items : items.filter((item) => item.style === active)
  const totalPages = Math.ceil(filtered.length / perPage)
  const paged = filtered.slice((page - 1) * perPage, page * perPage)
  const heroItems = items.filter((item) => item.tag.includes("표지")).slice(0, 3)

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.92),_rgba(245,230,231,0.95)_42%,_rgba(244,234,228,1)_100%)] text-[#2c2c2c]">
      <nav className="border-b border-[#ead9cf]/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-[18px] md:px-12 lg:px-20">
          <div className="flex items-center gap-4">
            <a href="https://onroe.space/titleroe" className="font-skin-serif text-[24px] tracking-[0] text-[#2c2c2c] transition-colors hover:text-[#934b66]">
              <span className="hidden md:inline">← </span>
              TitleRoe
            </a>
            <span className="h-4 w-px bg-[#ead9cf]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#a48777]">Portfolio</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-[#6d5c58]">
            <a href="https://onroe.space/titleroe" className="rounded-full border border-[#d9b8a6] bg-[#f4e3df] px-4 py-2 text-[#8f695d] transition-colors hover:bg-[#ead2cc]">
              돌아가기
            </a>
          </div>
        </div>
      </nav>

      <section className="relative mx-auto max-w-5xl overflow-hidden px-6 pb-8 pt-0 md:px-12 lg:px-20">
        <div className="absolute -right-12 -top-24 -z-10 h-64 w-64 rounded-full bg-[#e9d4cf]/60 blur-3xl" />
        <div className="flex items-center justify-between gap-8">
          <div className="min-w-0 flex-1">
            <div className="mb-3 mt-[10px] flex items-center gap-4">
              <span className="translate-y-[5px] rounded-full border border-[#ead9cf] bg-[#f7ede7] px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#9b7b68]">
                AI Webnovel Cover
              </span>
            </div>
            <h1 className="font-skin-serif text-4xl leading-tight tracking-[0] text-[#2c2c2c] md:text-5xl">
              TITLE ROE
              <br />
              <span className="bg-gradient-to-r from-[#934b66] to-[#c7a98c] bg-clip-text text-transparent">PORTFOLIO</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#6d5c58]">
              웹소설 표지, 캐릭터 프로필, 장면 컷까지
              <br />
              장르와 톤에 맞춰 제작한 AI 비주얼 샘플입니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-6">
              <Stat num={String(styles.length)} label="Styles" />
              <Stat num={String(items.length)} label="Images" />
            </div>
          </div>

          <div className="hidden flex-shrink-0 select-none md:block">
            <div className="relative h-64 w-56">
              {heroItems.map((item, index) => (
                <Image
                  key={item.id}
                  src={item.src}
                  alt={item.alt}
                  width={360}
                  height={480}
                  priority={index === 0}
                  className={`absolute h-56 w-40 rounded-[24px] border border-white/80 object-cover shadow-[0_22px_50px_rgba(74,51,45,0.18)] ${
                    index === 0 ? "left-10 top-5 z-20 rotate-3" : index === 1 ? "left-0 top-10 z-10 -rotate-6 opacity-90" : "left-20 top-12 z-0 rotate-8 opacity-80"
                  }`}
                />
              ))}
              <div className="absolute bottom-2 left-1/2 h-10 w-32 -translate-x-1/2 rounded-full bg-[#934b66]/20 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      <div className="border-b border-[#ead9cf]/80 bg-[#fbf4f0]/92 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl px-6 md:px-12 lg:px-20">
          <div className="flex flex-wrap items-center gap-1 py-3">
            {activeStyles.map((entry) => {
              const isActive = active === entry.style
              const label = entry.style === "all" ? "ALL" : entry.style
              const count = entry.style === "all" ? items.length : entry.count

              return (
                <button
                  key={entry.style}
                  type="button"
                  onClick={() => {
                    setActive(entry.style)
                    setPage(1)
                  }}
                  className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition-all ${
                    isActive ? "border-[#d9b8a6] bg-[#f4e3df] text-[#8f695d]" : "border-[#ead9cf] bg-white text-[#7b675d] hover:bg-[#fbf4f0] hover:text-[#5d4c47]"
                  }`}
                >
                  {label}
                  <span className={`ml-1.5 text-[10px] ${isActive ? "opacity-60" : "opacity-40"}`}>{count}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <main ref={mainRef} className="mx-auto max-w-5xl px-6 py-10 md:px-12 lg:px-20">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {paged.map((item) => (
            <div key={item.id} className="group relative">
              <button
                type="button"
                onClick={() => setLightbox(item)}
                className="relative block w-full cursor-pointer overflow-hidden rounded-[24px] border border-[#ead9cf] bg-white/92 shadow-[0_16px_32px_rgba(124,98,81,0.08)] focus:outline-none"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={600}
                  height={800}
                  className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#4a332d]/80 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="mb-1 inline-block w-fit rounded-full bg-[#934b66] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white">{item.tag}</span>
                  <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/65">{item.detail}</p>
                  <p className="mt-0.5 text-xs font-semibold leading-tight text-white">{item.styleLabel}</p>
                </div>
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 ? <div className="py-32 text-center text-sm text-[#b7a59e]">No items</div> : null}

        {totalPages > 1 ? (
          <div className="mt-10 flex items-center justify-center gap-1">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => {
                setPage((value) => Math.max(1, value - 1))
                mainRef.current?.scrollIntoView({ behavior: "smooth" })
              }}
              className="rounded-full px-4 py-2 text-xs font-bold text-[#a28e86] transition-colors hover:text-[#5d4c47] disabled:opacity-30"
            >
              ← Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                onClick={() => {
                  setPage(pageNumber)
                  mainRef.current?.scrollIntoView({ behavior: "smooth" })
                }}
                className={`min-w-[36px] rounded-full border px-3 py-2 text-xs font-bold transition-all ${
                  pageNumber === page ? "border-[#d9b8a6] bg-[#f4e3df] text-[#8f695d]" : "border-[#ead9cf] bg-white text-[#7b675d] hover:bg-[#fbf4f0]"
                }`}
              >
                {pageNumber}
              </button>
            ))}
            <button
              type="button"
              disabled={page === totalPages}
              onClick={() => {
                setPage((value) => Math.min(totalPages, value + 1))
                mainRef.current?.scrollIntoView({ behavior: "smooth" })
              }}
              className="rounded-full px-4 py-2 text-xs font-bold text-[#a28e86] transition-colors hover:text-[#5d4c47] disabled:opacity-30"
            >
              Next →
            </button>
          </div>
        ) : null}
      </main>

      <footer className="border-t border-[#ead9cf]/80 px-6 py-10 text-center md:px-12 lg:px-20">
        <p className="text-xs text-[#a28e86]">© 2026 ONROE. All rights reserved.</p>
      </footer>

      {lightbox ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#4a332d]/68 p-4 backdrop-blur-sm" onClick={() => setLightbox(null)}>
          <button type="button" className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-sm font-bold text-[#6d5c58] shadow transition-colors hover:bg-white" onClick={() => setLightbox(null)}>
            ✕
          </button>
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-[28px] border border-[#ead9cf] bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <Image src={lightbox.src} alt={lightbox.alt} width={1200} height={1600} className="h-auto max-h-[80vh] w-full object-contain" />
            <div className="flex items-center gap-3 border-t border-[#efe2db] p-5">
              <span className="rounded-full bg-[#934b66] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">{lightbox.tag}</span>
              <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#a28e86]">{lightbox.detail}</span>
              <span className="truncate text-sm font-semibold text-[#5d4c47]">{lightbox.styleLabel}</span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function Stat({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-black text-[#2c2c2c]">{num}</span>
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a28e86]">{label}</span>
    </div>
  )
}
