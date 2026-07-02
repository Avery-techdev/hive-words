export type WordValidationStatus = 'valid' | 'invalid' | 'error'

export interface WordValidationResult {
  readonly status: WordValidationStatus
  readonly points: number
}
