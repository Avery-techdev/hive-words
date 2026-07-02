import { GameBoard } from '@/features/game'

function App() {
  return (
    <main className="flex min-h-full items-center justify-center bg-[#F0F0F0] p-4 sm:p-8">
      <div className="w-full max-w-md rounded-[28px] border border-line bg-[#FAFAFA] p-6 shadow-xl sm:max-w-lg sm:p-8 lg:max-w-2xl lg:p-10">
        <h1 className="text-center text-3xl font-bold text-ink">
          Hive
          <span className="animate-title-dot inline-block text-accent">·</span>
          Words
        </h1>
        <div className="mt-6">
          <GameBoard />
        </div>
      </div>
    </main>
  )
}

export default App
