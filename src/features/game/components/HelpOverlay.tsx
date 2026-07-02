import { useDialogFocus } from '../hooks/useDialogFocus'

interface HelpOverlayProps {
  readonly isOpen: boolean
  readonly onClose: () => void
}

export function HelpOverlay({ isOpen, onClose }: HelpOverlayProps) {
  const dialogRef = useDialogFocus<HTMLDivElement>({ isOpen, onClose })

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="touch-manipulation absolute inset-0 bg-ink/50"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-overlay-title"
        tabIndex={-1}
        className="animate-dialog-in relative z-10 w-full max-w-sm rounded-2xl bg-paper p-6"
      >
        <h2 id="help-overlay-title" className="text-lg font-semibold text-ink">
          How to play
        </h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-ink-muted">
          <li>Click the letters to spell an English word (min. 3 letters).</li>
          <li>Confirm the word to check it against the dictionary.</li>
          <li>Delete removes the last letter, Shuffle reorders all the letters.</li>
          <li>Find at least 2 valid words, then submit your solution.</li>
        </ol>
        <button
          type="button"
          onClick={onClose}
          className="touch-manipulation mt-6 w-full rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Got it
        </button>
      </div>
    </div>
  )
}
