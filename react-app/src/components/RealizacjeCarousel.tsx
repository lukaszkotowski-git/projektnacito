import React, { useState, useCallback } from 'react'

/**
 * RealizacjeCarousel
 * - Gathers images from public/realizacje/realizacja1 and realizacja2
 * - Renders a simple responsive carousel with arrows, dots and a lightbox modal
 * - No external dependencies
 * Image sources (from repo):
 * - /realizacje/realizacja1/r1.JPG .. r6.JPG
 * - /realizacje/realizacja2/r1.jpg .. r7.jpeg
 */

const realizations = [
  ...Array.from({ length: 6 }).map((_, i) => ({ src: `/realizacje/realizacja1/r${i + 1}.JPG`, alt: `Realizacja 1 - zdjęcie ${i + 1}` })),
  ...Array.from({ length: 7 }).map((_, i) => {
    const idx = i + 1
    const ext = idx === 7 ? 'jpeg' : 'jpg'
    return { src: `/realizacje/realizacja2/r${idx}.${ext}`, alt: `Realizacja 2 - zdjęcie ${idx}` }
  })
]

export default function RealizacjeCarousel(): JSX.Element {
  const [index, setIndex] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const prev = useCallback(() => setIndex((i) => (i - 1 + realizations.length) % realizations.length), [])
  const next = useCallback(() => setIndex((i) => (i + 1) % realizations.length), [])

  return (
    <section className="pt-16 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-serif text-[#8C7E6A] mb-6">Nasze realizacje</h2>

        <div className="relative">
          {/* Slides - show 1 on mobile, 3 on desktop via CSS grid and translate */}
          <div className="flex items-center gap-4 overflow-hidden">
            <button aria-label="Previous" onClick={prev} className="p-2 rounded-full bg-white shadow-md hover:shadow-lg hidden md:inline">
              ‹
            </button>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {realizations.slice(index, index + 3).map((img, i) => (
                <div key={index + i} className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer" onClick={() => setLightboxIndex(index + i)}>
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>

            <button aria-label="Next" onClick={next} className="p-2 rounded-full bg-white shadow-md hover:shadow-lg hidden md:inline">
              ›
            </button>
          </div>

          {/* Dots */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {realizations.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} aria-label={`Go to slide ${i + 1}`} className={`w-2 h-2 rounded-full ${i === index ? 'bg-[#8C7E6A]' : 'bg-gray-300'}`}></button>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90" onClick={() => setLightboxIndex(null)}>
            <button className="absolute top-6 right-6 text-white text-3xl" onClick={() => setLightboxIndex(null)}>×</button>
            <button className="absolute left-6 text-white text-3xl" onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i! - 1 + realizations.length) % realizations.length) }}>‹</button>
            <img src={realizations[lightboxIndex].src} alt={realizations[lightboxIndex].alt} className="max-w-[90vw] max-h-[80vh] object-contain rounded shadow-lg" />
            <button className="absolute right-6 text-white text-3xl" onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i! + 1) % realizations.length) }}>›</button>
          </div>
        )}
      </div>
    </section>
  )
}
