import { useState } from 'react'
import type { LetterSet } from '../types/letterSet.types'
import type { WordAttempt, WordFeedback, GamePhase } from '../types/gameState.types'
import { validateWord } from '../services/dictionaryService'
import { MIN_WORD_LENGTH, MIN_VALID_WORDS_TO_SUBMIT } from '../constants'

interface UseWordGameResult {
  readonly letters: readonly string[]
  readonly currentWord: string
  readonly attempts: readonly WordAttempt[]
  readonly validWords: readonly WordAttempt[]
  readonly totalScore: number
  readonly totalPossibleWords: number
  readonly phase: GamePhase
  readonly isAllWordsFound: boolean
  readonly feedback: WordFeedback | null
  readonly canSubmit: boolean
  readonly isValidating: boolean
  readonly selectLetter: (letter: string) => void
  readonly removeLastLetter: () => void
  readonly shuffleLetters: () => void
  readonly confirmWord: () => Promise<void>
  readonly finishGame: () => void
}

function shuffleArray<T>(items: readonly T[]): T[] {
  const shuffled = [...items]
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function useWordGame(letterSet: LetterSet): UseWordGameResult {
  const [letters, setLetters] = useState<readonly string[]>(() =>
    shuffleArray([letterSet.centerLetter, ...letterSet.outerLetters]),
  )
  const [currentWord, setCurrentWord] = useState('')
  const [attempts, setAttempts] = useState<readonly WordAttempt[]>([])
  const [manuallyFinished, setManuallyFinished] = useState(false)
  const [feedback, setFeedback] = useState<WordFeedback | null>(null)
  const [isValidating, setIsValidating] = useState(false)

  const validWords = attempts.filter((attempt) => attempt.status === 'valid')
  const totalScore = validWords.reduce((sum, attempt) => sum + attempt.points, 0)
  const totalPossibleWords = letterSet.validWords.length
  const isAllWordsFound =
    totalPossibleWords > 0 && validWords.length >= totalPossibleWords
  const phase: GamePhase =
    manuallyFinished || isAllWordsFound ? 'completed' : 'playing'
  const canSubmit = validWords.length >= MIN_VALID_WORDS_TO_SUBMIT

  function selectLetter(letter: string): void {
    if (phase === 'completed' || isValidating) return
    setCurrentWord((prev) => prev + letter)
    setFeedback(null)
  }

  function removeLastLetter(): void {
    if (phase === 'completed' || isValidating) return
    setCurrentWord((prev) => prev.slice(0, -1))
  }

  function shuffleLetters(): void {
    if (phase === 'completed') return
    setLetters((prev) => shuffleArray(prev))
  }

  function finishGame(): void {
    if (!canSubmit) return
    setManuallyFinished(true)
  }

  async function confirmWord(): Promise<void> {
    if (phase === 'completed' || isValidating) return

    const word = currentWord.trim()
    if (word.length < MIN_WORD_LENGTH) {
      setFeedback({ type: 'too-short', word })
      setCurrentWord('')
      return
    }

    const normalized = word.toLowerCase()
    const alreadyAttempted = attempts.some(
      (attempt) => attempt.word.toLowerCase() === normalized,
    )
    if (alreadyAttempted) {
      setFeedback({ type: 'duplicate', word })
      setCurrentWord('')
      return
    }

    setIsValidating(true)
    const result = await validateWord(word)
    setIsValidating(false)

    setAttempts((prev) => [
      ...prev,
      { word, status: result.status, points: result.points },
    ])
    setFeedback({
      type: result.status === 'valid' ? 'success' : result.status,
      word,
    })
    setCurrentWord('')
  }

  return {
    letters,
    currentWord,
    attempts,
    validWords,
    totalScore,
    totalPossibleWords,
    phase,
    isAllWordsFound,
    feedback,
    canSubmit,
    isValidating,
    selectLetter,
    removeLastLetter,
    shuffleLetters,
    confirmWord,
    finishGame,
  }
}
