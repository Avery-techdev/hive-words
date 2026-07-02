const HELP_SEEN_STORAGE_KEY = 'hive-words:help-seen'

export function hasSeenHelpOverlay(): boolean {
  try {
    return window.localStorage.getItem(HELP_SEEN_STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

export function markHelpOverlaySeen(): void {
  try {
    window.localStorage.setItem(HELP_SEEN_STORAGE_KEY, 'true')
  } catch {
    // localStorage unavailable (private mode/disabled) — overlay just reappears next visit
  }
}
