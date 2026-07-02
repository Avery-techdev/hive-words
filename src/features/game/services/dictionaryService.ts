import type { WordValidationResult } from '../types/dictionaryValidation.types'
import { MIN_WORD_LENGTH } from '../constants'

const DICTIONARY_API_BASE = 'https://api.dictionaryapi.dev/api/v2/entries/en'

interface DictionaryEntry {
  readonly word: string
}

function isDictionaryEntryList(data: unknown): data is DictionaryEntry[] {
  return (
    Array.isArray(data) &&
    data.length > 0 &&
    data.every(
      (entry) =>
        typeof entry === 'object' &&
        entry !== null &&
        typeof (entry as { word?: unknown }).word === 'string' &&
        (entry as { word: string }).word.trim().length > 0,
    )
  )
}

function calculatePoints(word: string): number {
  return word.length
}

export async function validateWord(word: string): Promise<WordValidationResult> {
  const normalized = word.trim().toLowerCase()

  if (normalized.length < MIN_WORD_LENGTH) {
    return { status: 'invalid', points: 0 }
  }

  let response: Response
  try {
    response = await fetch(
      `${DICTIONARY_API_BASE}/${encodeURIComponent(normalized)}`,
    )
  } catch {
    return { status: 'error', points: 0 }
  }

  if (response.status === 404) {
    return { status: 'invalid', points: 0 }
  }

  if (!response.ok) {
    return { status: 'error', points: 0 }
  }

  let data: unknown
  try {
    data = await response.json()
  } catch {
    return { status: 'error', points: 0 }
  }

  if (!isDictionaryEntryList(data)) {
    return { status: 'error', points: 0 }
  }

  return { status: 'valid', points: calculatePoints(normalized) }
}
