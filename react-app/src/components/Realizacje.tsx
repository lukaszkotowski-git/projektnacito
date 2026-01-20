import { useAppContext } from '../context/AppContext'

export function Realizacje(): JSX.Element {
  const { setCurrentView } = useAppContext()

  const placeholders = Array.from({ length: 8 }).map((_, i) => `https://placehold.co/600x400?text=Realizacja+${i+1}`)

  return (
    <main className="pt-32 pb-24">
      <section className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-serif mb-8 text-center text-[#8C7E6A]">Realizacje</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {placeholders.map((src, idx) => (
            <div key={idx} className="rounded-lg overflow-hidden shadow-lg">
              <img src={src} alt={`Realizacja ${idx+1}`} className="w-full h-56 object-cover" />
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <button onClick={() => setCurrentView('main')} className="px-6 py-2 bg-[#8C7E6A] text-white rounded-md">Wróć</button>
        </div>
      </section>
    </main>
  )
}
