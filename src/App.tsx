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
            className="animate-dust-rise absolute rounded-full bg-[#FFD580]"
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

        <p className="mt-8 text-center text-xs text-ink-muted">
          Built by Avery Hauschild —{' '}
          <a
            href="https://github.com/Avery-techdev/sky-catcher"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-hex-border underline-offset-2 transition-colors hover:text-accent"
          >
            GitHub
          </a>{' '}
          ·{' '}
          <a
            href="https://ah-development.de/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-hex-border underline-offset-2 transition-colors hover:text-accent"
          >
            ah-development.de
          </a>
        </p>
      </div>
    </main>
  )
}

export default App
