function Navbar({ displayName, level, evolutionTitle }) {
  const initial = displayName?.trim()?.[0]?.toUpperCase() ?? "P";

  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">YOUR DAILY ADVENTURE</p>

        <h1>
          Welcome back, <span>{displayName || "Player"}</span> 👋
        </h1>

        <p className="subtitle">
          Your real life is the game. Make today count.
        </p>
      </div>

      <div className="profile">
        <div className="avatar">{initial}</div>

        <div>
          <strong>{(displayName || "Player").toUpperCase()}</strong>
          <small>
            Level {level} {evolutionTitle}
          </small>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
