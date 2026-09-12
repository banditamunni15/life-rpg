function StreakCard({ streak = 7 }) {
  return (
    <div className="rounded-2xl border border-orange-400/20 bg-slate-900 p-5 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-widest text-orange-300">
            Current Streak
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {streak} Days
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Keep completing your daily quests!
          </p>
        </div>

        <div className="text-5xl">🔥</div>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-2">
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={index}
            className="flex h-8 items-center justify-center rounded-md bg-orange-500/20 text-xs text-orange-300"
          >
            ✓
          </div>
        ))}
      </div>
    </div>
  );
}

export default StreakCard;