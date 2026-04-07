import { streamChatResponse as streamOpenRouter, type ChatMessage } from './openrouter'

export type StreamCallback = (text: string) => void

export function streamChatResponse(
  messages: ChatMessage[],
  onChunk: StreamCallback,
  onDone: () => void,
  onError: (error: string) => void
): AbortController {
  const provider = (import.meta.env.VITE_CHAT_PROVIDER || 'openrouter').toLowerCase()

  if (provider === 'openai') {
    return streamOpenAI(messages, onChunk, onDone, onError)
  }

  return streamOpenRouter(messages, onChunk, onDone, onError)
}

function streamOpenAI(
  messages: ChatMessage[],
  onChunk: StreamCallback,
  onDone: () => void,
  onError: (error: string) => void
): AbortController {
  const controller = new AbortController()
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY
  const model = import.meta.env.VITE_OPENAI_MODEL || 'gpt-3.5-turbo'

  if (!apiKey) {
    onError('Brak klucza OpenAI. Ustaw VITE_OPENAI_API_KEY w środowisku.')
    return controller
  }

  ;(async () => {
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ model, messages, stream: true }),
        signal: controller.signal,
      })

      if (res.status === 401) {
        onError('Nieautoryzowane. Sprawdź VITE_OPENAI_API_KEY.')
        return
      }

      if (res.status === 429) {
        onError('Przepraszamy, osiągnięto limit zapytań OpenAI. Spróbuj ponownie później.')
        return
      }

      if (!res.ok) {
        onError('Błąd podczas komunikacji z OpenAI. Spróbuj ponownie za chwilę.')
        return
      }

      if (!res.body) {
        onError('Brak odpowiedzi od usługi OpenAI.')
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
            const parsed = JSON.parse(data)
            const content = parsed.choices?.[0]?.delta?.content
            if (content) onChunk(content)
          } catch {
          }
        }
      }

      onDone()
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return
      onError('Wystąpił błąd podczas komunikacji z OpenAI. Spróbuj ponownie za chwilę.')
    }
  })()

  return controller
}
