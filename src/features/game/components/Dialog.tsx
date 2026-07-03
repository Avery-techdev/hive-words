import type { ReactNode } from 'react'
import { useDialogFocus } from '../hooks/useDialogFocus'

interface DialogProps {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly labelledBy: string
  readonly contentClassName?: string
  readonly children: ReactNode
}

export function Dialog({ isOpen, onClose, labelledBy, contentClassName, children }: DialogProps) {
  const dialogRef = useDialogFocus<HTMLDivElement>({ isOpen, onClose })

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="touch-manipulation absolute inset-0 bg-black/60"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={`animate-dialog-in relative z-10 w-full max-w-sm rounded-2xl bg-paper p-6 ${contentClassName ?? ''}`}
      >
        {children}
      </div>
    </div>
  )
}
