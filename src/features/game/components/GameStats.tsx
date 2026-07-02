interface GameStatsProps {
  readonly foundCount: number
  readonly totalScore: number
  readonly totalPossible: number
}

interface StatItem {
  readonly label: string
  readonly value: number
  readonly animateOnChange: boolean
}

export function GameStats({ foundCount, totalScore, totalPossible }: GameStatsProps) {
  const stats: readonly StatItem[] = [
    { label: 'Words found', value: foundCount, animateOnChange: true },
    { label: 'Score', value: totalScore, animateOnChange: true },
    { label: 'Possible words', value: totalPossible, animateOnChange: false },
  ]

  return (
    <ul className="grid grid-cols-3 gap-1 text-center">
      {stats.map((stat) => (
        <li key={stat.label} className="flex flex-col gap-0.5">
          <span className="flex min-h-8 items-center justify-center text-xs tracking-widest text-ink-muted uppercase">
            {stat.label}
          </span>
          <span
            key={stat.animateOnChange ? stat.value : undefined}
            className={`text-xl font-semibold text-text ${stat.animateOnChange ? 'animate-count-pop' : ''}`}
          >
            {stat.value}
          </span>
        </li>
      ))}
    </ul>
  )
}
