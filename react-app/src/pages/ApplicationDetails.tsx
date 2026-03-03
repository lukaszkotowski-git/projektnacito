// React namespace import not required with new JSX transform; keep file minimal

function tryParseRooms(raw: unknown): Record<string, number> | null {
  if (!raw) return null
  if (typeof raw === 'object') return raw as Record<string, number>
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw)
    } catch (e) {
      return null
    }
  }
  return null
}

function formatDate(raw: unknown) {
  if (!raw) return '-'
  try {
    const d = new Date(String(raw))
    return isNaN(d.getTime()) ? String(raw) : d.toLocaleString()
  } catch (e) {
    return String(raw)
  }
}

export default function ApplicationDetails({ data }: { data: any }) {
  const id = data?.ID ?? data?.id ?? '-'
  const date = formatDate(data?.Data ?? data?.data)
  const packageName = data?.Pakiet ?? data?.pakiet ?? data?.Package ?? '-'
  const name = data?.['Imię i nazwisko'] ?? data?.name ?? data?.fullName ?? '-'
  const phone = data?.Telefon ?? data?.phone ?? '-'
  const email = data?.Email ?? data?.email ?? '-'
  const price = data?.['Cena netto (zł)'] ?? data?.price ?? '-'

  const roomsRaw = data?.Pokoje ?? data?.pokoje ?? data?.rooms
  const rooms = tryParseRooms(roomsRaw)

  return (
    <div className="text-sm text-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><strong>ID:</strong> {id}</div>
        <div><strong>Data zgłoszenia:</strong> {date}</div>
        <div><strong>Pakiet:</strong> {packageName}</div>
        <div><strong>Imię i nazwisko:</strong> {name}</div>
        <div><strong>Telefon:</strong> {phone}</div>
        <div><strong>Email:</strong> {email}</div>
        <div><strong>Cena netto (zł):</strong> {price}</div>
        {rooms ? (
          <div className="md:col-span-2">
            <strong>Pokoje:</strong>
            <ul className="list-disc list-inside ml-4">
              {Object.entries(rooms).map(([k, v]) => (
                <li key={k}>{k}: {v}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  )
}
