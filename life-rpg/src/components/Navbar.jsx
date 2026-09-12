function Navbar() {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">YOUR DAILY ADVENTURE</p>

        <h1>
          Welcome back, <span>Player</span> 👋
        </h1>

        <p className="subtitle">
          Your real life is the game. Make today count.
        </p>
      </div>

      <div className="profile">
        <div className="avatar">P</div>

        <div>
          <strong>PLAYER ONE</strong>
          <small>Level 8 Adventurer</small>
        </div>
      </div>
    </header>
  );
}

export default Navbar;