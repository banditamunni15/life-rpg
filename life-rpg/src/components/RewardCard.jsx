const REWARD_COST = 500;

function RewardCard({ coins = 0 }) {
  const canAfford = coins >= REWARD_COST;
  const remaining = Math.max(REWARD_COST - coins, 0);
  const progress = Math.min((coins / REWARD_COST) * 100, 100);

  return (
    <section className="panel reward-panel">
      <div className="reward-top">
        <p className="section-label">NEXT REWARD</p>
        <span className="reward-status">
          {canAfford ? "✓ UNLOCKED" : "🔒 LOCKED"}
        </span>
      </div>

      <div className="reward-content">
        <div className={`reward-icon ${canAfford ? "reward-icon-ready" : ""}`}>
          🎮
        </div>

        <div className="reward-info">
          <h2>30 min Gaming</h2>
          <p>Cost: {REWARD_COST} Gold</p>
        </div>
      </div>

      <div className="reward-progress">
        <div className="reward-progress-label">
          <span>Gold saved</span>
          <strong>
            {Math.min(coins, REWARD_COST)} / {REWARD_COST}
          </strong>
        </div>

        <div className="reward-bar">
          <div className="reward-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <button className="reward-button" disabled={!canAfford}>
        {canAfford ? "Redeem →" : `${remaining} gold to go`}
      </button>
    </section>
  );
}

export default RewardCard;
