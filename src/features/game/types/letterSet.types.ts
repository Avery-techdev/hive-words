export type Difficulty = 'easy' | 'medium' | 'hard'

export interface LetterSet {
  readonly id: string
  readonly centerLetter: string
  readonly outerLetters: readonly string[]
  readonly validWords: readonly string[]
  readonly difficulty: Difficulty
}
