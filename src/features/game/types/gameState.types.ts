import type { WordValidationStatus } from './dictionaryValidation.types'

export type GamePhase = 'playing' | 'completed'

export interface WordAttempt {
  readonly word: string
  readonly status: WordValidationStatus
  readonly points: number
}

export type WordFeedbackType =
  | 'success'
  | 'invalid'
  | 'error'
  | 'duplicate'
  | 'too-short'

export interface WordFeedback {
  readonly type: WordFeedbackType
  readonly word: string
}
