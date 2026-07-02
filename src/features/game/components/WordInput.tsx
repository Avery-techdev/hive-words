import type { WordFeedback } from '../types/gameState.types'

const FEEDBACK_MESSAGES: Record<WordFeedback['type'], string> = {
  success: 'Nice, valid word!',
  invalid: 'Not a word we know.',
  error: "Couldn't check that word, try again.",
  duplicate: 'Already found that one.',
  'too-short': 'Words need at least 3 letters.',
}

interface WordInputProps {
  readonly currentWord: string
  readonly feedback: WordFeedback | null
}

export function WordInput({ currentWord, feedback }: WordInputProps) {
  const isError = feedback !== null && feedback.type !== 'success'

  return (
    <div className="flex min-h-16 flex-col items-center justify-center gap-1 text-center">
      <p
        className={`text-2xl font-semibold tracking-wide uppercase ${isError ? 'text-accent' : 'text-ink'}`}
      >
        {currentWord.length > 0 ? currentWord : ' '}
      </p>
      <p role="status" aria-live="polite" className="min-h-5 text-sm text-ink-muted">
        {feedback ? FEEDBACK_MESSAGES[feedback.type] : ''}
      </p>
    </div>
  )
}
