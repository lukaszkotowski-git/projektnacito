/**
 * RealizacjeList.tsx
 * 
 * Displays a grid of realization cards.
 * Images are sourced from:
 * - /realizacje/realizacja1/r1.JPG (thumbnail for realization 1)
 * - /realizacje/realizacja2/r1.jpg (thumbnail for realization 2)
 */

import React from 'react'

interface RealizacjeListProps {
  onSelect: (id: string) => void
  onBack: () => void
}

export const RealizacjeList: React.FC<RealizacjeListProps> = ({ onSelect, onBack }) => {
  const realizations = [
    {
      id: 'realizacja1',
      title: 'Realizacja 1',
      thumbnail: '/realizacje/realizacja1/r1.JPG',
      description: 'Nowoczesne wnętrze z elementami drewna'
    },
    {
      id: 'realizacja2',
      title: 'Realizacja 2',
      thumbnail: '/realizacje/realizacja2/r1.jpg',
      description: 'Klasyczna elegancja i przestrzeń'
    }
  ]

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif text-[#8C7E6A] mb-4">Wybrane Realizacje</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Każde wnętrze to oddzielna historia, którą tworzymy wspólnie z naszymi klientami.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {realizations.map((item) => (
          <div 
            key={item.id}
            onClick={() => onSelect(item.id)}
            className="group cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="aspect-video overflow-hidden">
              <img 
                src={item.thumbnail} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-medium text-[#8C7E6A] mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.description}</p>
              <div className="mt-4 flex items-center text-[#8C7E6A] text-sm font-medium uppercase tracking-wider group-hover:text-[#6F6352]">
                Zobacz zdjęcia <span className="ml-2">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <button 
          onClick={onBack}
          className="px-8 py-3 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
        >
          Wróć do strony głównej
        </button>
      </div>
    </div>
  )
}
