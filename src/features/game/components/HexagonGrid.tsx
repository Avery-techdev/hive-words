import { useEffect, useState } from 'react'

const OUTER_ANGLES_DEG = [-90, -30, 30, 90, 150, 210] as const

// Regular flat-top hexagon: width (point-to-point) : height (flat-to-flat) = 2 : sqrt(3).
const HEXAGON_ASPECT_RATIO = Math.sqrt(3) / 2

const HEXAGON_CLIP_PATH =
  '[clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)]'

const WIDTH_BY_TIER = { base: 80, sm: 96, lg: 112 } as const
type ViewportTier = keyof typeof WIDTH_BY_TIER

const SM_QUERY = '(min-width: 640px)'
const LG_QUERY = '(min-width: 1024px)'

interface HexagonGridProps {
  readonly letters: readonly string[]
  readonly onLetterClick: (letter: string) => void
  readonly disabled: boolean
}

function resolveTier(): ViewportTier {
  if (typeof window === 'undefined') return 'base'
  if (window.matchMedia(LG_QUERY).matches) return 'lg'
  if (window.matchMedia(SM_QUERY).matches) return 'sm'
  return 'base'
}

function useViewportTier(): ViewportTier {
  const [tier, setTier] = useState<ViewportTier>(resolveTier)

  useEffect(() => {
    const smQuery = window.matchMedia(SM_QUERY)
    const lgQuery = window.matchMedia(LG_QUERY)
    function handleChange(): void {
      setTier(resolveTier())
    }
    smQuery.addEventListener('change', handleChange)
    lgQuery.addEventListener('change', handleChange)
    return () => {
      smQuery.removeEventListener('change', handleChange)
      lgQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return tier
}

function outerHexagonOffset(angleDeg: number, radiusPx: number): { x: number; y: number } {
  const angleRad = (angleDeg * Math.PI) / 180
  return {
    x: radiusPx * Math.cos(angleRad),
    y: radiusPx * Math.sin(angleRad),
  }
}

export function HexagonGrid({ letters, onLetterClick, disabled }: HexagonGridProps) {
  const [centerLetter, ...outerLetters] = letters
  const tier = useViewportTier()

  const hexWidth = WIDTH_BY_TIER[tier]
  const hexHeight = hexWidth * HEXAGON_ASPECT_RATIO
  // Center-to-neighbor distance for edge-adjacent regular flat-top hexagons
  // equals the hexagon's flat-to-flat height.
  const radiusPx = hexHeight
  const hexStyle = { width: hexWidth, height: hexHeight }

  const outerOffsets = OUTER_ANGLES_DEG.map((angle) => outerHexagonOffset(angle, radiusPx))
  const gridWidth = Math.max(...outerOffsets.map((o) => Math.abs(o.x))) * 2 + hexWidth
  const gridHeight = Math.max(...outerOffsets.map((o) => Math.abs(o.y))) * 2 + hexHeight

  const outerWrapperInteractiveClass = disabled
    ? 'opacity-40'
    : 'hover:scale-105 active:scale-[0.96] hover:bg-accent hover:shadow-[0_0_8px_rgba(245,166,35,0.4)]'

  return (
    <div
      className="relative [filter:drop-shadow(0_8px_24px_rgba(0,0,0,0.6))]"
      style={{ width: gridWidth, height: gridHeight }}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => onLetterClick(centerLetter)}
        onTouchStart={() => undefined}
        style={hexStyle}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 touch-manipulation bg-[linear-gradient(var(--color-hex-center-start),var(--color-hex-center-end))] text-3xl font-bold text-[#1A0F00] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] transition-[scale] duration-200 ease-[ease] hover:enabled:scale-105 active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-40 ${HEXAGON_CLIP_PATH}`}
      >
        {centerLetter}
      </button>

      {outerLetters.map((letter, index) => {
        const { x, y } = outerOffsets[index]
        return (
          <div
            key={letter}
            style={{
              ...hexStyle,
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            }}
            className={`absolute top-1/2 left-1/2 bg-hex-border p-[2px] transition-[scale,background-color,box-shadow] duration-200 ease-[ease] ${outerWrapperInteractiveClass} ${HEXAGON_CLIP_PATH}`}
          >
            <button
              type="button"
              disabled={disabled}
              onClick={() => onLetterClick(letter)}
              onTouchStart={() => undefined}
              className={`h-full w-full touch-manipulation bg-[linear-gradient(var(--color-hex-fill),var(--color-hex-fill-dark))] text-2xl font-bold text-ink transition-colors duration-200 active:bg-accent active:text-paper focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${HEXAGON_CLIP_PATH}`}
            >
              {letter}
            </button>
          </div>
        )
      })}
    </div>
  )
}
