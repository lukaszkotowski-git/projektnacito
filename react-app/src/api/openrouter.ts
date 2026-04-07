export type ChatMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

type OpenRouterRequest = {
  model: string
  messages: ChatMessage[]
  stream: boolean
}

type OpenRouterStreamChunk = {
  choices: Array<{
    delta: {
      content?: string
    }
  }>
}

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'
const MODEL = 'minimax/minimax-m2.5:free'

export function streamChatResponse(
  messages: ChatMessage[],
  onChunk: (text: string) => void,
  onDone: () => void,
  onError: (error: string) => void
): AbortController {
  const controller = new AbortController()
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY

  if (!apiKey) {
    onError('Brak klucza API. Usługa czatu jest tymczasowo niedostępna.')
    return controller
  }

  const body: OpenRouterRequest = {
    model: MODEL,
    messages,
    stream: true,
  }

    ; (async () => {
      try {
        const res = await fetch(OPENROUTER_API_URL, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.origin,
            'X-OpenRouter-Title': 'Projekt na Cito Chat',
          },
          body: JSON.stringify(body),
          signal: controller.signal,
        })

        if (res.status === 429) {
          onError('Przepraszamy, osiągnięto dzienny limit zapytań. Prosimy o kontakt telefoniczny: Klaudia +48 698 354 726, Angelika +48 697 909 309.')
          return
        }

        if (!res.ok) {
          onError('Wystąpił błąd podczas komunikacji z asystentem. Spróbuj ponownie za chwilę.')
          return
        }

        if (!res.body) {
          onError('Wystąpił błąd podczas komunikacji z asystentem. Spróbuj ponownie za chwilę.')
          return
        }

        const reader = res.body.getReader()
        const decoder = new TextDecoder()

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue
            const data = line.slice(6).trim()
            if (data === '[DONE]') {
              onDone()
              return
            }
            try {
              const parsed = JSON.parse(data) as OpenRouterStreamChunk
              const content = parsed.choices?.[0]?.delta?.content
              if (content) {
                onChunk(content)
              }
            } catch {
            }
          }
        }

        onDone()
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return
        onError('Wystąpił błąd podczas komunikacji z asystentem. Spróbuj ponownie za chwilę.')
      }
    })()

  return controller
}
