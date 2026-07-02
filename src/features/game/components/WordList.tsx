import { useEffect, useRef } from 'react'
import type { WordAttempt } from '../types/gameState.types'

interface WordListProps {
  readonly words: readonly WordAttempt[]
}

export function WordList({ words }: WordListProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = scrollRef.current
    if (!container || words.length === 0) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    container.scrollTo({
      top: container.scrollHeight,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }, [words.length])

  return (
    <div ref={scrollRef} className="h-20 w-full overflow-y-auto">
      {words.length === 0 ? (
        <p className="flex h-full items-center justify-center text-center text-sm text-ink-muted">
          No words found yet.
        </p>
      ) : (
        <ul className="flex flex-wrap justify-center gap-2 content-start">
          {words.map((attempt) => (
            <li
              key={attempt.word}
              className="animate-rise-in flex items-center gap-1.5 rounded-full border border-hex-border bg-hex-fill px-3 py-1.5 text-sm text-ink"
            >
              <span className="uppercase">{attempt.word}</span>
              <span className="font-semibold text-accent">+{attempt.points}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
