import { GameBoard } from '@/features/game'

interface DustParticle {
  readonly left: string
  readonly bottom: string
  readonly size: number
  readonly delay: string
  readonly duration: string
}

const DUST_PARTICLES: readonly DustParticle[] = [
  { left: '8%', bottom: '10%', size: 3, delay: '0s', duration: '11s' },
  { left: '18%', bottom: '60%', size: 2, delay: '2.5s', duration: '9s' },
  { left: '32%', bottom: '25%', size: 4, delay: '1s', duration: '13s' },
  { left: '48%', bottom: '70%', size: 2, delay: '4s', duration: '10s' },
  { left: '63%', bottom: '15%', size: 3, delay: '1.8s', duration: '12s' },
  { left: '77%', bottom: '55%', size: 2, delay: '3.2s', duration: '9.5s' },
  { left: '88%', bottom: '30%', size: 3, delay: '0.6s', duration: '11.5s' },
  { left: '55%', bottom: '5%', size: 2, delay: '5s', duration: '10.5s' },
]

function App() {
  return (
    <main className="relative flex min-h-full items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top,#241500_0%,#140A00_100%)] sm:p-4 lg:p-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {DUST_PARTICLES.map((particle, index) => (
          <span
            key={index}
            className="animate-dust-rise absolute rounded-full bg-text"
            style={{
              left: particle.left,
              bottom: particle.bottom,
              width: particle.size,
              height: particle.size,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </div>

      <div className="relative min-h-screen w-full bg-paper p-6 sm:min-h-0 sm:max-w-lg sm:rounded-[28px] sm:border sm:border-line sm:p-8 sm:shadow-xl lg:max-w-2xl lg:p-10">
        <h1 className="text-center text-3xl font-bold text-ink">
          Hive
          <span className="animate-title-dot inline-block text-accent">·</span>
          Words
        </h1>
        <div className="mt-6">
          <GameBoard />
        </div>

        <div className="mt-8 flex flex-col items-center gap-2 text-center text-xs text-ink-muted">
          <p>
            by{' '}
            <a
              href="https://ah-development.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-ink underline decoration-hex-border underline-offset-2 transition-colors hover:text-accent"
            >
              Avery Hauschild
            </a>
          </p>
          <a
            href="https://github.com/Avery-techdev/hive-words"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-accent"
          >
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            View source on GitHub
          </a>
        </div>
      </div>
    </main>
  )
}

export default App
