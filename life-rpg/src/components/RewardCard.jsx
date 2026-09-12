function RewardCard({ coins = 250 }) {
  return (
    <div className="rounded-2xl border border-yellow-400/20 bg-slate-900 p-5 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-widest text-yellow-300">
            Rewards
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {coins} Coins
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Earn rewards by completing quests.
          </p>
        </div>

        <div className="text-5xl">🪙</div>
      </div>

      <button
        type="button"
        className="mt-5 w-full rounded-lg bg-yellow-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-yellow-400"
      >
        View Rewards
      </button>
    </div>
  );
}

export default RewardCard;