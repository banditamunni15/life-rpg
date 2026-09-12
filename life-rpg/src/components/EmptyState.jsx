function EmptyState({
  title = "No quests yet",
  message = "Your daily quests will appear here.",
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-8 text-center">
      <div className="mb-3 text-4xl">⚔️</div>

      <h3 className="text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm text-slate-400">
        {message}
      </p>
    </div>
  );
}

export default EmptyState;