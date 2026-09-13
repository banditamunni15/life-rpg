function CharacterCard({
  xp,
  levelProgress,
  evolution,
  characterBuild,
  streak,
  questsCompletedTotal,
  coins,
}) {
  const { level, currentLevelXP, nextLevelXP, progress } = levelProgress;
  const needed = Math.max(nextLevelXP - xp, 0);

  return (
    <section className="player-card">
      <div className="character-visual">
        <div className="character-glow"></div>

        <div className="character-badge">⚔</div>

        <div className="character-text">
          <span className="character-status">
            {evolution.title.toUpperCase()} · STAGE {evolution.stage}
          </span>
          <h2>{characterBuild.title}</h2>
          <p>
            {characterBuild.value > 0
              ? `Leading attribute: ${characterBuild.attribute} (${characterBuild.value})`
              : "Complete quests to start shaping your build."}
          </p>
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
          <div className="xp-fill" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="xp-footer">
          <span>
            {currentLevelXP >= nextLevelXP
              ? "Max level reached"
              : `${needed} XP needed for Level ${level + 1}`}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>

      <div className="player-stats">
        <div className="player-stat">
          <div className="stat-icon">🔥</div>
          <strong>{streak}</strong>
          <small>STREAK</small>
        </div>

        <div className="player-stat">
          <div className="stat-icon">⚔️</div>
          <strong>{questsCompletedTotal}</strong>
          <small>QUESTS DONE</small>
        </div>

        <div className="player-stat">
          <div className="stat-icon">🪙</div>
          <strong>{coins.toLocaleString()}</strong>
          <small>GOLD</small>
        </div>
      </div>
    </section>
  );
}

export default CharacterCard;
