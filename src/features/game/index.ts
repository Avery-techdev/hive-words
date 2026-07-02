export type { LetterSet, Difficulty } from './types/letterSet.types'
export type {
  WordValidationStatus,
  WordValidationResult,
} from './types/dictionaryValidation.types'
export { letterSets } from './data/letterSets.data'
export { validateWord } from './services/dictionaryService'
export { MIN_WORD_LENGTH, MIN_VALID_WORDS_TO_SUBMIT } from './constants'
