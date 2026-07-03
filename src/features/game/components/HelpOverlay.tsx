import { Dialog } from './Dialog'

interface HelpOverlayProps {
  readonly isOpen: boolean
  readonly onClose: () => void
}

export function HelpOverlay({ isOpen, onClose }: HelpOverlayProps) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} labelledBy="help-overlay-title">
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
    </Dialog>
  )
}
