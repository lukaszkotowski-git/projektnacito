import { useState, useRef, useEffect } from 'react'
import type { ChatMessage } from '../api/openrouter'
import { streamChatResponse } from '../api/chatProvider'
import { SYSTEM_PROMPT } from '../data/knowledgeBase'
import { pl } from '../i18n/pl'

// Remove ```html ... ``` fences that some providers wrap responses in.
function stripHtmlFences(text: string) {
  return text.replace(/```\s*html\s*\n([\s\S]*?)\n```/gi, (_m, p1) => p1)
}

type Message = { role: 'user' | 'assistant'; content: string }

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: pl.chat.welcome },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const firstRenderRef = useRef(true)
  const headerRef = useRef<HTMLHeadingElement | null>(null)

  useEffect(() => {
    return () => {
      abortRef.current?.abort()
    }
  }, [])

  useEffect(() => {
    const id = window.setTimeout(() => {
      const headerEl = headerRef.current
      if (!headerEl) return
      const nav = document.querySelector('nav')
      const navHeight = nav ? Math.ceil(nav.getBoundingClientRect().height) : 0
      const rect = headerEl.getBoundingClientRect()
      const absoluteTop = window.scrollY + rect.top
      const target = Math.max(absoluteTop - navHeight, 0)
      window.scrollTo({ top: target, left: 0, behavior: 'auto' })
    }, 60)
    return () => window.clearTimeout(id)
  }, [])

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleSend() {
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    const userMessage: Message = { role: 'user', content: trimmed }
    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setInput('')
    setIsLoading(true)
    setError(null)

    const apiMessages: ChatMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...nextMessages,
    ]

    setMessages(prev => [...prev, { role: 'assistant', content: '' }])

    abortRef.current = streamChatResponse(
      apiMessages,
      (chunk) => {
        setMessages(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = {
            role: 'assistant',
            content: updated[updated.length - 1].content + chunk,
          }
          return updated
        })
      },
      () => {
        setMessages(prev => {
          const updated = [...prev]
          const last = updated[updated.length - 1]
          if (last?.role === 'assistant') {
            const cleaned = stripHtmlFences(last.content)
            updated[updated.length - 1] = { role: 'assistant', content: cleaned }
          }
          return updated
        })
        setIsLoading(false)
      },
      (err) => {
        setError(err)
        setIsLoading(false)
        setMessages(prev => {
          const last = prev[prev.length - 1]
          if (last?.role === 'assistant' && last.content === '') {
            return prev.slice(0, -1)
          }
          return prev
        })
      }
    )
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 pt-24 flex flex-col" style={{ height: '100vh' }}>
      <h1 ref={headerRef} className="text-2xl font-serif text-[#8C7E6A] mb-4 shrink-0">{pl.chat.title}</h1>

      <div className="flex-1 overflow-y-auto flex flex-col gap-3 mb-4 pr-1">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={
                msg.role === 'user'
                  ? 'bg-[#8C7E6A] text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%] text-sm leading-relaxed'
                  : 'bg-white border border-[#E5DED4] text-[#33302E] rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] text-sm leading-relaxed'
              }
            >
              {msg.role === 'assistant' && msg.content === '' && isLoading ? (
                <span className="inline-flex gap-1 items-center py-1" aria-label={pl.chat.typing}>
                  <span className="w-2 h-2 bg-[#8C7E6A] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-[#8C7E6A] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-[#8C7E6A] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              ) : (
                msg.role === 'assistant' ? (
                  // assistant content may be HTML generated from markdownToHtml
                  <div dangerouslySetInnerHTML={{ __html: msg.content }} />
                ) : (
                  // user content is plain text
                  msg.content
                )
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="shrink-0">
        {error && (
          <p className="text-red-600 text-sm mb-2">{error}</p>
        )}
        <div className="flex gap-2">
          <textarea
            className="flex-1 border border-[#E5DED4] rounded-xl px-4 py-2 text-sm text-[#33302E] resize-none focus:outline-none focus:border-[#8C7E6A] bg-white"
            rows={2}
            placeholder={pl.chat.placeholder}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-[#8C7E6A] text-white rounded-xl text-sm font-medium disabled:opacity-50 hover:bg-[#7a6d5c] transition-colors shrink-0"
          >
            {pl.chat.send}
          </button>
        </div>
      </div>
    </div>
  )
}
