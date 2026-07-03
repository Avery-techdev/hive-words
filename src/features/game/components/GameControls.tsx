interface GameControlsProps {
  readonly canConfirm: boolean
  readonly canSubmit: boolean
  readonly validWordsCount: number
  readonly minWordsRequired: number
  readonly disabled: boolean
  readonly isValidating: boolean
  readonly onClear: () => void
  readonly onShuffle: () => void
  readonly onConfirm: () => void
  readonly onSubmit: () => void
}

const SUBMIT_HINT_ID = 'submit-requirement-hint'

const SECONDARY_BUTTON_CLASS =
  'touch-manipulation min-w-23 rounded-full border border-hex-border bg-canvas px-4 py-2 text-center text-sm font-medium text-ink transition-colors hover:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-40'

const CONFIRM_BUTTON_CLASS =
  'touch-manipulation min-w-23 rounded-full border border-hex-border px-4 py-2 text-center text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2'

export function GameControls({
  canConfirm,
  canSubmit,
  validWordsCount,
  minWordsRequired,
  disabled,
  isValidating,
  onClear,
  onShuffle,
  onConfirm,
  onSubmit,
}: GameControlsProps) {
  const missingWords = Math.max(minWordsRequired - validWordsCount, 0)
  const isConfirmDisabled = disabled || !canConfirm
  return (
    <div className="flex flex-col items-center gap-3 lg:gap-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onClear}
          disabled={disabled}
          className={SECONDARY_BUTTON_CLASS}
        >
          Delete
        </button>
        <button
          type="button"
          onClick={onShuffle}
          disabled={disabled}
          aria-label="Shuffle letters"
          className={SECONDARY_BUTTON_CLASS}
        >
          Shuffle
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isConfirmDisabled}
          className={`${CONFIRM_BUTTON_CLASS} ${
            isConfirmDisabled
              ? 'bg-transparent text-hex-border'
              : 'bg-canvas text-ink hover:border-accent'
          }`}
        >
          {isValidating ? 'Checking…' : 'Confirm'}
        </button>
      </div>
      <button
        type="button"
        onClick={onSubmit}
        disabled={disabled || !canSubmit}
        aria-describedby={canSubmit ? undefined : SUBMIT_HINT_ID}
        className="touch-manipulation rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-paper transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-40"
      >
        Finish game
      </button>
      {!canSubmit && missingWords > 0 && (
        <p
          id={SUBMIT_HINT_ID}
          role="status"
          aria-live="polite"
          className="text-xs text-ink-muted"
        >
          {`Find ${missingWords} more valid word${missingWords === 1 ? '' : 's'} to finish the game.`}
        </p>
      )}
    </div>
  )
}
