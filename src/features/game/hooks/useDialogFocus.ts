import { useEffect, useRef } from 'react'

interface UseDialogFocusOptions {
  readonly isOpen: boolean
  readonly onClose: () => void
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

export function useDialogFocus<T extends HTMLElement>({
  isOpen,
  onClose,
}: UseDialogFocusOptions) {
  const dialogRef = useRef<T | null>(null)

  useEffect(() => {
    if (!isOpen) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    const dialogElement = dialogRef.current

    function getFocusableElements(): HTMLElement[] {
      if (!dialogElement) return []
      return Array.from(
        dialogElement.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      )
    }

    const initiallyFocusable = getFocusableElements()
    ;(initiallyFocusable[0] ?? dialogElement)?.focus()

    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const elements = getFocusableElements()
      if (elements.length === 0) return

      const first = elements[0]
      const last = elements[elements.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previouslyFocused?.focus()
    }
  }, [isOpen, onClose])

  return dialogRef
}
