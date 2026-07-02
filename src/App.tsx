import { GameBoard } from '@/features/game'

function App() {
  return (
    <main className="min-h-full bg-canvas px-4 py-8">
      <div className="mx-auto flex max-w-md flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-ink">Hive·Words</h1>
        <GameBoard />
      </div>
    </main>
  )
}

export default App
