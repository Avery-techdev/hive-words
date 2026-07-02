import type { WordAttempt } from '../types/gameState.types'

interface WordListProps {
  readonly words: readonly WordAttempt[]
}

export function WordList({ words }: WordListProps) {
  if (words.length === 0) {
    return <p className="text-center text-sm text-ink-muted">No words found yet.</p>
  }

  return (
    <ul className="flex max-h-48 flex-col gap-1 overflow-y-auto">
      {words.map((attempt) => (
        <li
          key={attempt.word}
          className="flex items-center justify-between border-b border-line px-1 py-1.5 text-sm"
        >
          <span className="uppercase">{attempt.word}</span>
          <span className="font-semibold text-accent">+{attempt.points}</span>
        </li>
      ))}
    </ul>
  )
}
