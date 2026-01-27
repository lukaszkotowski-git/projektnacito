/**
 * RealizacjaDetail.tsx
 * 
 * Displays a detail view for a specific realization with an image grid and lightbox carousel.
 * Image paths are constructed dynamically based on the realization ID.
 */

import React, { useState, useEffect, useCallback, useRef } from 'react'

interface RealizacjaDetailProps {
  id: string
  onBack: () => void
}

export const RealizacjaDetail: React.FC<RealizacjaDetailProps> = ({ id, onBack }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Configuration for each realization
  const configs: Record<string, { title: string, count: number, extension: string }> = {
    realizacja1: { title: 'Realizacja 1', count: 6, extension: 'JPG' },
    realizacja2: { title: 'Realizacja 2', count: 7, extension: 'jpg' } // Mixed jpg/jpeg handled by try/catch or standardization not possible here so we use main ext
  }
  
  // Handle mixed extension for realizacja2 (r7.jpeg)
  const getImageSrc = (index: number) => {
    const config = configs[id]
    if (!config) return ''
    
    const num = index + 1
    // Special case for realizacja2/r7.jpeg
    if (id === 'realizacja2' && num === 7) {
      return `/realizacje/${id}/r${num}.jpeg`
    }
    return `/realizacje/${id}/r${num}.${config.extension}`
  }

  const config = configs[id]
  
  if (!config) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-600">Nie znaleziono realizacji</p>
        <button onClick={onBack} className="mt-4 px-6 py-2 bg-[#8C7E6A] text-white rounded">Wróć</button>
      </div>
    )
  }

  const images = Array.from({ length: config.count }).map((_, i) => ({
    src: getImageSrc(i),
    alt: `${config.title} - zdjęcie ${i + 1}`
  }))

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  // Touch handling refs for swipe gestures with animations
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const [dragX, setDragX] = useState<number>(0)
  const [isDragging, setIsDragging] = useState(false)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    setIsDragging(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const deltaX = e.touches[0].clientX - touchStartX.current
    const deltaY = e.touches[0].clientY - touchStartY.current

    // Activate horizontal dragging only when horizontal movement dominates
    if (!isDragging && Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 6) {
      setIsDragging(true)
    }

    if (isDragging) {
      e.preventDefault()
      setDragX(deltaX)
    }
  }

  const handleTouchEnd = () => {
    const threshold = 70 // px required to register a swipe
    if (!isDragging) {
      // reset
      setDragX(0)
      touchStartX.current = null
      touchStartY.current = null
      return
    }

    if (dragX > threshold) {
      // swipe right -> animate out then show prev
      const outX = window.innerWidth || 500
      setDragX(outX)
      setTimeout(() => {
        prevImage()
        setDragX(0)
      }, 160)
    } else if (dragX < -threshold) {
      const outX = -(window.innerWidth || 500)
      setDragX(outX)
      setTimeout(() => {
        nextImage()
        setDragX(0)
      }, 160)
    } else {
      // snap back
      setDragX(0)
    }

    setIsDragging(false)
    touchStartX.current = null
    touchStartY.current = null
  }
  
  const nextImage = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null))
  }, [lightboxIndex, images.length])

  const prevImage = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null))
  }, [lightboxIndex, images.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, nextImage, prevImage])

  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center text-[#8C7E6A] hover:text-[#6F6352] transition-colors"
        >
          <span className="mr-2">←</span> Wróć do listy
        </button>
        <h2 className="text-2xl font-serif text-[#8C7E6A]">{config.title}</h2>
        <div className="w-24"></div> {/* Spacer for centering */}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, idx) => (
          <div 
            key={idx}
            onClick={() => openLightbox(idx)}
            className="cursor-pointer aspect-[4/3] rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:brightness-95"
          >
            <img 
              src={img.src} 
              alt={img.alt} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm" onClick={closeLightbox}>
          {/* Close button */}
          <button 
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 z-50"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Buttons */}
          <button 
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-4 hidden md:block"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-4 hidden md:block"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Main Image */}
          <div 
            className="relative max-w-[90vw] max-h-[85vh] touch-pan-y"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ touchAction: 'pan-y' }}
          >
            <div
              className="w-full h-full flex items-center justify-center transition-transform duration-150"
              style={{ transform: `translateX(${dragX}px)` }}
            >
            <img 
              src={images[lightboxIndex].src} 
              alt={images[lightboxIndex].alt}
              className="max-w-full max-h-[85vh] object-contain rounded shadow-2xl"
            />
            <div className="absolute -bottom-8 left-0 right-0 text-center text-white/70 text-sm">
              Zdjęcie {lightboxIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
