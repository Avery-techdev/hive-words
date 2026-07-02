import { useDialogFocus } from '../hooks/useDialogFocus'

interface GameOverScreenProps {
  readonly totalScore: number
  readonly foundCount: number
  readonly totalPossible: number
  readonly isAllWordsFound: boolean
  readonly onPlayAgain: () => void
}

export function GameOverScreen({
  totalScore,
  foundCount,
  totalPossible,
  isAllWordsFound,
  onPlayAgain,
}: GameOverScreenProps) {
  const dialogRef = useDialogFocus<HTMLDivElement>({
    isOpen: true,
    onClose: onPlayAgain,
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onPlayAgain}
        className="touch-manipulation absolute inset-0 bg-black/60"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="game-over-title"
        tabIndex={-1}
        className="animate-dialog-in relative z-10 w-full max-w-sm rounded-2xl bg-paper p-6 text-center"
      >
        <h2 id="game-over-title" className="text-lg font-semibold text-ink">
          {isAllWordsFound ? 'All words found!' : 'Solution submitted'}
        </h2>
        <p className="mt-2 text-sm text-ink-muted">
          {isAllWordsFound
            ? 'You found every possible word in this set. Well played.'
            : 'Nice round — here is how you did.'}
        </p>

        <ul className="mt-6 grid grid-cols-2 gap-4">
          <li className="flex flex-col gap-0.5">
            <span className="text-xs tracking-widest text-ink-muted uppercase">
              Score
            </span>
            <span className="text-2xl font-semibold text-ink">{totalScore}</span>
          </li>
          <li className="flex flex-col gap-0.5">
            <span className="text-xs tracking-widest text-ink-muted uppercase">
              Words found
            </span>
            <span className="text-2xl font-semibold text-ink">
              {foundCount}/{totalPossible}
            </span>
          </li>
        </ul>

        <button
          type="button"
          onClick={onPlayAgain}
          className="touch-manipulation mt-6 w-full rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-paper focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Play again
        </button>
      </div>
    </div>
  )
}
