function XPBar({ currentXP = 840, maxXP = 1000 }) {
  const percentage = Math.min((currentXP / maxXP) * 100, 100);

  return (
    <div className="w-full">
      <div className="mb-2 flex justify-between text-sm">
        <span className="text-slate-300">Experience</span>
        <span className="font-medium text-purple-300">
          {currentXP} / {maxXP} XP
        </span>
      </div>

      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-700">
        <div
          className="h-full rounded-full bg-purple-500 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default XPBar;