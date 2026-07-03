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
  const hasWord = currentWord.length > 0

  const feedbackClassName =
    feedback === null
      ? 'text-ink-muted'
      : feedback.type === 'success'
        ? 'animate-glow-pop text-accent'
        : 'animate-shake text-ink'

  return (
    <div className="flex min-h-16 flex-col items-center justify-center gap-1 text-center">
      <p
        className={
          hasWord
            ? `text-2xl font-semibold tracking-wide uppercase transition-colors duration-150 ${isError ? 'text-accent' : 'text-ink'}`
            : 'text-base font-normal text-ink-muted'
        }
      >
        {hasWord ? currentWord : 'Tap letters to spell a word'}
      </p>
      <p
        key={feedback ? `${feedback.type}-${feedback.word}` : 'no-feedback'}
        role="status"
        aria-live="polite"
        className={`min-h-6 text-base font-semibold ${feedbackClassName}`}
      >
        {feedback ? FEEDBACK_MESSAGES[feedback.type] : ''}
      </p>
    </div>
  )
}
