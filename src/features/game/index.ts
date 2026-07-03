export type { LetterSet } from './types/letterSet.types'
export type {
  WordValidationStatus,
  WordValidationResult,
} from './types/dictionaryValidation.types'
export type {
  GamePhase,
  WordAttempt,
  WordFeedbackType,
  WordFeedback,
} from './types/gameState.types'
export { letterSets } from './data/letterSets.data'
export { validateWord } from './services/dictionaryService'
export { MIN_WORD_LENGTH, MIN_VALID_WORDS_TO_SUBMIT } from './constants'
export { useWordGame } from './hooks/useWordGame'
export { GameBoard } from './components/GameBoard'
