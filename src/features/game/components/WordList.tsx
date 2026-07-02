import type { WordAttempt } from '../types/gameState.types'

interface WordListProps {
  readonly words: readonly WordAttempt[]
}

export function WordList({ words }: WordListProps) {
  return (
    <div className="h-48 w-full overflow-y-auto">
      {words.length === 0 ? (
        <p className="flex h-full items-center justify-center text-center text-sm text-ink-muted">
          No words found yet.
        </p>
      ) : (
        <ul className="flex flex-wrap justify-center gap-2 content-start">
          {words.map((attempt) => (
            <li
              key={attempt.word}
              className="animate-rise-in flex items-center gap-1.5 rounded-full bg-paper px-3 py-1.5 text-sm shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
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
