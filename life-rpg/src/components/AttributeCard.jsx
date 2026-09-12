function AttributeCard({
  icon = "🧠",
  name = "Intelligence",
  value = 85,
  maxValue = 100,
}) {
  const percentage = Math.min((value / maxValue) * 100, 100);

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-purple-400">
      <div className="flex items-center gap-3">
        <div className="text-3xl">{icon}</div>

        <div>
          <p className="text-sm text-slate-400">{name}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-700">
        <div
          className="h-full rounded-full bg-purple-500 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default AttributeCard;