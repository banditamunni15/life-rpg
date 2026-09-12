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
  );
}

export default CharacterCard;