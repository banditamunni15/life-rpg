function RewardCard() {
  return (
    <section className="panel reward-panel">
      <p className="section-label">NEXT REWARD</p>

      <div className="reward-content">
        <div className="reward-icon">🎮</div>

        <div>
          <h2>30 min Gaming</h2>
          <p>Cost: 500 Gold</p>
        </div>
      </div>

      <button className="reward-button">
        View Rewards →
      </button>
    </section>
  );
}

export default RewardCard;