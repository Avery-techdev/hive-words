interface GameStatsProps {
  readonly foundCount: number
  readonly totalScore: number
  readonly totalPossible: number
}

interface StatItem {
  readonly label: string
  readonly value: number
}

export function GameStats({ foundCount, totalScore, totalPossible }: GameStatsProps) {
  const stats: readonly StatItem[] = [
    { label: 'Words found', value: foundCount },
    { label: 'Score', value: totalScore },
    { label: 'Possible words', value: totalPossible },
  ]

  return (
    <ul className="grid grid-cols-3 gap-4 text-center">
      {stats.map((stat) => (
        <li key={stat.label} className="flex flex-col gap-0.5">
          <span className="text-xs tracking-widest text-ink-muted uppercase">
            {stat.label}
          </span>
          <span className="text-xl font-semibold text-ink">{stat.value}</span>
        </li>
      ))}
    </ul>
  )
}
