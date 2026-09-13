const REWARD_COST = 500;

function RewardCard({ coins = 0 }) {
  const canAfford = coins >= REWARD_COST;
  const remaining = Math.max(REWARD_COST - coins, 0);

  return (
    <section className="panel reward-panel">
      <p className="section-label">NEXT REWARD</p>

      <div className="reward-content">
        <div className="reward-icon">🎮</div>

        <div>
          <h2>30 min Gaming</h2>
          <p>Cost: {REWARD_COST} Gold</p>
        </div>
      </div>

      <button className="reward-button" disabled={!canAfford}>
        {canAfford ? "Redeem →" : `${remaining} gold to go`}
      </button>
    </section>
  );
}

export default RewardCard;