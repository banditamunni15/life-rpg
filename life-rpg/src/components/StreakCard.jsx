function StreakCard({ streak = 7 }) {
<<<<<<< HEAD
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  const getGrowth = () => {
    if (streak >= 30) {
      return {
        icon: "🌲",
        title: "Fully Grown",
        message: "Your consistency has become a habit.",
      };
    }

    if (streak >= 14) {
      return {
        icon: "🌳",
        title: "Growing Strong",
        message: "Your momentum is becoming unstoppable.",
      };
    }

    if (streak >= 7) {
      return {
        icon: "🪴",
        title: "Growing",
        message: "Keep going — your progress is taking root.",
      };
    }

    return {
      icon: "🌱",
      title: "Just Started",
      message: "Complete today's quest and keep growing.",
    };
  };

  const growth = getGrowth();

  return (
    <section className="panel streak-panel">
      <div className="panel-heading">
        <div>
          <p className="section-label">CONSISTENCY</p>
          <h2>Streak</h2>
        </div>

        <span className="fire">🔥 {streak} DAYS</span>
      </div>

      <div className="streak-garden">
        <div className="garden-path"></div>

        {days.map((day, index) => {
          const completed = index < Math.min(streak, 6);

          return (
            <div
              className={`garden-day ${
                completed ? "completed" : "locked"
              }`}
              key={`${day}-${index}`}
            >
              <div className="plant">
                {completed ? (
                  <>
                    <span className="plant-emoji">🌿</span>
                  </>
                ) : (
                  <span className="lock">+</span>
                )}
              </div>

              <span className="garden-day-name">{day}</span>

              <small>
                {completed ? "Done" : "Next"}
              </small>
            </div>
          );
        })}
      </div>

      <div className="growth-progress">
        <div className="growth-stage">
          <span className="growth-big">{growth.icon}</span>

          <div>
            <strong>{growth.title}</strong>
            <p>{growth.message}</p>
          </div>
        </div>

        <div className="growth-meter">
          <div className="growth-meter-top">
            <span>Growth</span>
            <strong>
              {streak >= 30 ? "MAX" : `${streak} / 30`}
            </strong>
          </div>

          <div className="growth-track">
            <div
              className="growth-fill"
              style={{
                width: `${Math.min((streak / 30) * 100, 100)}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
=======
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
>>>>>>> origin/member4-ui
  );
}

export default StreakCard;