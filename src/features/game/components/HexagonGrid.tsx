const OUTER_ANGLES_DEG = [-90, -30, 30, 90, 150, 210] as const
const OUTER_RADIUS_PX = 92

const HEXAGON_CLIP_PATH =
  '[clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)]'

interface HexagonGridProps {
  readonly letters: readonly string[]
  readonly onLetterClick: (letter: string) => void
  readonly disabled: boolean
}

function outerHexagonOffset(angleDeg: number): { x: number; y: number } {
  const angleRad = (angleDeg * Math.PI) / 180
  return {
    x: OUTER_RADIUS_PX * Math.cos(angleRad),
    y: OUTER_RADIUS_PX * Math.sin(angleRad),
  }
}

export function HexagonGrid({ letters, onLetterClick, disabled }: HexagonGridProps) {
  const [centerLetter, ...outerLetters] = letters

  return (
    <div className="relative h-[280px] w-[280px] sm:h-[320px] sm:w-[320px]">
      <button
        type="button"
        disabled={disabled}
        onClick={() => onLetterClick(centerLetter)}
        className={`absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 bg-accent text-xl font-semibold text-paper transition-transform active:scale-95 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-40 sm:h-24 sm:w-24 ${HEXAGON_CLIP_PATH}`}
      >
        {centerLetter}
      </button>

      {outerLetters.map((letter, index) => {
        const angle = OUTER_ANGLES_DEG[index % OUTER_ANGLES_DEG.length]
        const { x, y } = outerHexagonOffset(angle)
        return (
          <div
            key={letter}
            style={{
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            }}
            className={`absolute top-1/2 left-1/2 h-20 w-20 bg-line p-0.5 transition-transform sm:h-24 sm:w-24 ${HEXAGON_CLIP_PATH}`}
          >
            <button
              type="button"
              disabled={disabled}
              onClick={() => onLetterClick(letter)}
              className={`h-full w-full bg-paper text-xl font-semibold text-ink transition-transform active:scale-95 active:bg-accent active:text-paper focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-40 ${HEXAGON_CLIP_PATH}`}
            >
              {letter}
            </button>
          </div>
        )
      })}
    </div>
  )
}
