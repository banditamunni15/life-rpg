<<<<<<< HEAD
function CharacterCard({ xp }) {
  const level = 8;
  const nextLevelXP = 1000;
  const progress = Math.min((xp / nextLevelXP) * 100, 100);
  const needed = Math.max(nextLevelXP - xp, 0);

  return (
    <section className="player-card">
      <div className="character-visual">
        <div className="character-glow"></div>

        <div className="character-badge">
          ⚔
        </div>

        <div className="character-text">
          <span className="character-status">ACTIVE ADVENTURE</span>
          <h2>Adventurer</h2>
          <p>Keep completing quests to unlock your next level.</p>
        </div>
      </div>

      <div className="character-progress">
        <div className="level-row">
          <div>
            <span className="level-label">CURRENT LEVEL</span>
            <strong>LVL {level}</strong>
          </div>

          <div className="xp-numbers">
            <strong>{xp} XP</strong>
            <span>/ {nextLevelXP} XP</span>
          </div>
        </div>

        <div className="xp-bar">
          <div
            className="xp-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="xp-footer">
          <span>{needed} XP needed for Level {level + 1}</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>

      <div className="player-stats">
        <div className="player-stat">
          <div className="stat-icon">🔥</div>
          <strong>7</strong>
          <small>STREAK</small>
        </div>

        <div className="player-stat">
          <div className="stat-icon">⚔️</div>
          <strong>24</strong>
          <small>QUESTS DONE</small>
        </div>

        <div className="player-stat">
          <div className="stat-icon">🪙</div>
          <strong>1,240</strong>
          <small>GOLD</small>
        </div>
      </div>
    </section>
=======
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
>>>>>>> origin/member4-ui
  );
}

export default CharacterCard;