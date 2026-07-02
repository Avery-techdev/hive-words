interface GameControlsProps {
  readonly canConfirm: boolean
  readonly canSubmit: boolean
  readonly validWordsCount: number
  readonly minWordsRequired: number
  readonly disabled: boolean
  readonly onClear: () => void
  readonly onShuffle: () => void
  readonly onConfirm: () => void
  readonly onSubmit: () => void
}

const SUBMIT_HINT_ID = 'submit-requirement-hint'

export function GameControls({
  canConfirm,
  canSubmit,
  validWordsCount,
  minWordsRequired,
  disabled,
  onClear,
  onShuffle,
  onConfirm,
  onSubmit,
}: GameControlsProps) {
  const missingWords = Math.max(minWordsRequired - validWordsCount, 0)
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onClear}
          disabled={disabled}
          className="rounded-full border border-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-40"
        >
          Delete
        </button>
        <button
          type="button"
          onClick={onShuffle}
          disabled={disabled}
          aria-label="Shuffle letters"
          className="rounded-full border border-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-40"
        >
          Shuffle
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={disabled || !canConfirm}
          className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition-opacity focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-40"
        >
          Confirm
        </button>
      </div>
      <button
        type="button"
        onClick={onSubmit}
        disabled={disabled || !canSubmit}
        aria-describedby={canSubmit ? undefined : SUBMIT_HINT_ID}
        className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-paper transition-opacity focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-40"
      >
        Submit solution
      </button>
      <p id={SUBMIT_HINT_ID} role="status" aria-live="polite" className="min-h-4 text-xs text-ink-muted">
        {!canSubmit && missingWords > 0
          ? `Find ${missingWords} more valid word${missingWords === 1 ? '' : 's'} to submit.`
          : ''}
      </p>
    </div>
  )
}
