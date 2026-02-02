import React, { useCallback, useEffect, useRef, useState } from 'react'

/**
 * RealizacjeCarousel
 * - Responsive carousel showing images from public/realizacje
 * - 1 slide on mobile, 2 on tablet, 3 on desktop
 * - Infinite loop implemented by duplicating slides (head/tail clones)
 * - Smooth CSS transitions, autoplay with pause on hover/focus
 * - Lightbox modal locks body scroll while open
 */

const originals = [
  ...Array.from({ length: 6 }).map((_, i) => ({ src: `/realizacje/realizacja1/r${i + 1}.JPG`, alt: `Realizacja 1 - zdjęcie ${i + 1}` })),
  ...Array.from({ length: 7 }).map((_, i) => {
    const idx = i + 1
    const ext = idx === 7 ? 'jpeg' : 'jpg'
    return { src: `/realizacje/realizacja2/r${idx}.${ext}`, alt: `Realizacja 2 - zdjęcie ${idx}` }
  })
]

// Build slides as clones: [orig, orig, orig] -> start in the middle copy
const slides = [...originals, ...originals, ...originals]

export default function RealizacjeCarousel(): JSX.Element {
  const total = originals.length
  const middle = total // start index at beginning of middle copy

  const [index, setIndex] = useState(middle)
  const [visible, setVisible] = useState(3)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [paused, setPaused] = useState(false)

  const trackRef = useRef<HTMLDivElement | null>(null)
  const autoplayRef = useRef<number | null>(null)

  // Responsive visible count
  useEffect(() => {
    function update() {
      const w = window.innerWidth
      if (w >= 1024) setVisible(3)
      else if (w >= 640) setVisible(2)
      else setVisible(1)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Translate calculation (percentage per slide)
  const slidePercent = 100 / visible

  // Move to next/prev
  const next = useCallback(() => {
    setIndex((i) => i + 1)
  }, [])
  const prev = useCallback(() => {
    setIndex((i) => i - 1)
  }, [])

  // Autoplay
  useEffect(() => {
    if (paused || lightboxIndex !== null) return
    autoplayRef.current = window.setInterval(() => {
      setIndex((i) => i + 1)
    }, 4000)
    return () => { if (autoplayRef.current) window.clearInterval(autoplayRef.current) }
  }, [paused, lightboxIndex])

  // Pause on hover/focus
  const handleMouseEnter = () => setPaused(true)
  const handleMouseLeave = () => setPaused(false)

  // When transition ends, if we've moved into the cloned area, jump to middle copy without animation
  const handleTransitionEnd = () => {
    setIsTransitioning(true)
    if (index >= total * 2) {
      // jumped past the end -> reset to middle
      setIsTransitioning(false)
      setIndex(total)
    }
    if (index < total) {
      // jumped before the start -> reset to middle + offset
      setIsTransitioning(false)
      setIndex(total + (index % total))
    }
  }

  // Keep body overflow:hidden when lightbox open
  useEffect(() => {
    const prev = document.body.style.overflow
    if (lightboxIndex !== null) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = prev
    return () => { document.body.style.overflow = prev }
  }, [lightboxIndex])

  // Keyboard navigation when carousel focused
  const containerRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { next(); }
      if (e.key === 'ArrowLeft') { prev(); }
      if ((e.key === 'Enter' || e.key === ' ') && document.activeElement && el.contains(document.activeElement)) {
        // open lightbox on focused slide
        const idx = Number((document.activeElement as HTMLElement).dataset['slideIndex'])
        if (!Number.isNaN(idx)) setLightboxIndex(((index - total) + idx + total) % total)
      }
    }
    el.addEventListener('keydown', onKey)
    return () => el.removeEventListener('keydown', onKey)
  }, [index, next, prev, total])

  // Ensure transition flag re-enabled after manual jump
  useEffect(() => {
    if (!isTransitioning) {
      // after setting index without transition, re-enable next tick
      requestAnimationFrame(() => requestAnimationFrame(() => setIsTransitioning(true)))
    }
  }, [isTransitioning])

  // compute transform
  const translatePercent = -index * slidePercent

  // helpers to open lightbox with correct normalized index
  const openLightboxAt = (globalIndex: number) => {
    // normalize to originals
    const normalized = ((globalIndex % total) + total) % total
    setLightboxIndex(normalized)
  }

  return (
    <section className="pt-16 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-serif text-[#8C7E6A] mb-6">Nasze realizacje</h2>

        <div
          ref={containerRef}
          tabIndex={0}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleMouseEnter}
          onBlur={handleMouseLeave}
          className="relative"
          aria-roledescription="carousel"
        >
          <div className="flex items-center gap-4 overflow-hidden">
            <button aria-label="Previous" onClick={prev} className="p-2 rounded-full bg-white shadow-md hover:shadow-lg hidden md:inline z-10">
              ‹
            </button>

            <div className="flex-1 overflow-hidden">
              <div
                ref={trackRef}
                onTransitionEnd={handleTransitionEnd}
                style={{
                  display: 'flex',
                  width: `${(slides.length * 100) / visible}%`,
                  transform: `translateX(${translatePercent}%)`,
                  transition: isTransitioning ? 'transform 420ms ease' : 'none'
                }}
              >
                {slides.map((img, i) => (
                  <div
                    key={i}
                    data-slide-index={i}
                    style={{ width: `${100 / slides.length}%` }}
                    className="px-2"
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      data-slide-index={(i - index + total) % total}
                      onClick={() => openLightboxAt(i)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openLightboxAt(i) }}
                      className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
                    >
                      <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button aria-label="Next" onClick={next} className="p-2 rounded-full bg-white shadow-md hover:shadow-lg hidden md:inline z-10">
              ›
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            {originals.map((_, i) => (
              <button key={i} onClick={() => setIndex(total + i)} aria-label={`Go to slide ${i + 1}`} className={`w-2 h-2 rounded-full ${((index - total) % total + total) % total === i ? 'bg-[#8C7E6A]' : 'bg-gray-300'}`}></button>
            ))}
          </div>

          {/* Lightbox */}
          {lightboxIndex !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90" onClick={() => setLightboxIndex(null)}>
              <button className="absolute top-6 right-6 text-white text-3xl" onClick={() => setLightboxIndex(null)}>×</button>
              <button className="absolute left-6 text-white text-3xl" onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i! - 1 + total) % total) }}>‹</button>
              <img src={originals[lightboxIndex].src} alt={originals[lightboxIndex].alt} className="max-w-[90vw] max-h-[80vh] object-contain rounded shadow-lg" />
              <button className="absolute right-6 text-white text-3xl" onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i! + 1) % total) }}>›</button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
