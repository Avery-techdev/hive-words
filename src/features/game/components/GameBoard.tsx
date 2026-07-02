import { useState } from 'react'
import { letterSets } from '../data/letterSets.data'
import type { LetterSet } from '../types/letterSet.types'
import { useWordGame } from '../hooks/useWordGame'
import { MIN_VALID_WORDS_TO_SUBMIT } from '../constants'
import { hasSeenHelpOverlay, markHelpOverlaySeen } from '../services/helpOverlayPreference'
import { HexagonGrid } from './HexagonGrid'
import { WordInput } from './WordInput'
import { WordList } from './WordList'
import { GameStats } from './GameStats'
import { GameControls } from './GameControls'
import { HelpOverlay } from './HelpOverlay'
import { GameOverScreen } from './GameOverScreen'

function pickRandomLetterSet(): LetterSet {
  const index = Math.floor(Math.random() * letterSets.length)
  return letterSets[index]
}

export function GameBoard() {
  const [activeLetterSet, setActiveLetterSet] = useState<LetterSet>(pickRandomLetterSet)

  return (
    <GameSession
      key={activeLetterSet.id}
      letterSet={activeLetterSet}
      onPlayAgain={() => setActiveLetterSet(pickRandomLetterSet())}
    />
  )
}

interface GameSessionProps {
  readonly letterSet: LetterSet
  readonly onPlayAgain: () => void
}

function GameSession({ letterSet, onPlayAgain }: GameSessionProps) {
  const game = useWordGame(letterSet)
  const [isHelpOpen, setIsHelpOpen] = useState(() => !hasSeenHelpOverlay())
  const isBoardDisabled = game.phase === 'completed' || game.isValidating

  function closeHelp(): void {
    setIsHelpOpen(false)
    markHelpOverlaySeen()
  }

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="flex w-full items-start justify-between gap-4">
        <GameStats
          foundCount={game.validWords.length}
          totalScore={game.totalScore}
          totalPossible={game.totalPossibleWords}
        />
        <button
          type="button"
          onClick={() => setIsHelpOpen(true)}
          aria-label="How to play"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-sm font-semibold text-ink focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          ?
        </button>
      </div>

      <WordInput currentWord={game.currentWord} feedback={game.feedback} />

      <HexagonGrid
        letters={game.letters}
        onLetterClick={game.selectLetter}
        disabled={isBoardDisabled}
      />

      <GameControls
        canConfirm={game.currentWord.length > 0}
        canSubmit={game.canSubmit}
        validWordsCount={game.validWords.length}
        minWordsRequired={MIN_VALID_WORDS_TO_SUBMIT}
        disabled={isBoardDisabled}
        onClear={game.removeLastLetter}
        onShuffle={game.shuffleLetters}
        onConfirm={game.confirmWord}
        onSubmit={game.finishGame}
      />

      <WordList words={game.validWords} />

      <HelpOverlay isOpen={isHelpOpen} onClose={closeHelp} />

      {game.phase === 'completed' && (
        <GameOverScreen
          totalScore={game.totalScore}
          foundCount={game.validWords.length}
          totalPossible={game.totalPossibleWords}
          isAllWordsFound={game.isAllWordsFound}
          onPlayAgain={onPlayAgain}
        />
      )}
    </div>
  )
}
