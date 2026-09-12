function QuestCard({
  icon = "🧠",
  title = "Study Computer Networks",
  attribute = "Intelligence",
  xp = 50,
  completed = false,
}) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-purple-400">
      
      <div className="flex items-start gap-4">
        {/* Quest Icon */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-2xl">
          {icon}
        </div>

        {/* Quest Information */}
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-white">
            {title}
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Builds:{" "}
            <span className="text-purple-300">
              {attribute}
            </span>
          </p>

          <p className="mt-2 font-medium text-yellow-300">
            +{xp} XP
          </p>
        </div>

        {/* Complete Button */}
        <button
          type="button"
          disabled={completed}
          className="shrink-0 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {completed ? "Completed" : "Complete"}
        </button>
      </div>
    </div>
  );
}

export default QuestCard;