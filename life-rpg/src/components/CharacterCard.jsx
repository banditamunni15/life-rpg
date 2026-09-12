function CharacterCard() {
  return (
    <div className="rounded-2xl border border-purple-400/30 bg-slate-900 p-6 shadow-lg">
      
      <div className="text-center">
        <p className="text-sm uppercase tracking-widest text-purple-300">
          My Character
        </p>

        <div className="mx-auto mt-4 flex h-24 w-24 items-center justify-center rounded-full bg-purple-500/20 text-5xl">
          🧙
        </div>

        <h2 className="mt-4 text-2xl font-bold text-white">
          The Scholar
        </h2>

        <p className="mt-1 text-purple-300">
          Level 7
        </p>
      </div>

      {/* XP */}
      <div className="mt-6">
        <div className="mb-2 flex justify-between text-sm text-slate-300">
          <span>Experience</span>
          <span>840 / 1000 XP</span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-700">
          <div
            className="h-full rounded-full bg-purple-500"
            style={{ width: "84%" }}
          />
        </div>
      </div>

      {/* Attributes */}
      <div className="mt-6 grid grid-cols-3 gap-3">

        <div className="rounded-xl bg-slate-800 p-3 text-center">
          <div className="text-2xl">🧠</div>
          <p className="mt-1 text-sm text-slate-400">
            Intelligence
          </p>
          <p className="text-xl font-bold text-white">
            85
          </p>
        </div>

        <div className="rounded-xl bg-slate-800 p-3 text-center">
          <div className="text-2xl">📚</div>
          <p className="mt-1 text-sm text-slate-400">
            Wisdom
          </p>
          <p className="text-xl font-bold text-white">
            70
          </p>
        </div>

        <div className="rounded-xl bg-slate-800 p-3 text-center">
          <div className="text-2xl">💪</div>
          <p className="mt-1 text-sm text-slate-400">
            Strength
          </p>
          <p className="text-xl font-bold text-white">
            30
          </p>
        </div>

      </div>
    </div>
  );
}

export default CharacterCard;