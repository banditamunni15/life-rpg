import { useState } from "react";
import heroImage from "./assets/hero.png";
import Navbar from "./components/Navbar";
import CharacterCard from "./components/CharacterCard";
import QuestList from "./components/QuestList";
import Attributes from "./components/Attributs";
import StreakCard from "./components/StreakCard";
import RewardCard from "./components/RewardCard";
import "./App.css";

function App() {
  const [xp, setXp] = useState(720);
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-mark">⚔</div>
          <div>
            <h2>LIFE RPG</h2>
            <span>LEVEL UP YOUR LIFE</span>
          </div>
        </div>

        <nav>
  <button
    className="nav-item active"
    onClick={() =>
      document.getElementById("dashboard")?.scrollIntoView({
        behavior: "smooth",
      })
    }
  >
    <span>🏠</span> Dashboard
  </button>

  <button
    className="nav-item"
    onClick={() =>
      document.getElementById("quests")?.scrollIntoView({
        behavior: "smooth",
      })
    }
  >
    <span>⚔️</span> Quests
  </button>

  <button
    className="nav-item"
    onClick={() =>
      document.getElementById("stats")?.scrollIntoView({
        behavior: "smooth",
      })
    }
  >
    <span>📊</span> Stats
  </button>

  <button
    className="nav-item"
    onClick={() =>
      document.getElementById("rewards")?.scrollIntoView({
        behavior: "smooth",
      })
    }
  >
    <span>🎁</span> Rewards
  </button>
</nav>
        <div className="sidebar-bottom">
          <div className="mini-streak">
            <span>🔥</span>
            <div>
              <strong>7 DAY STREAK</strong>
              <small>Keep going!</small>
            </div>
          </div>

          <button className="settings">⚙️ Settings</button>
        </div>
      </aside>

      <main className="main" id="dashboard">
        <div className="game-hero">
  <img src={heroImage} alt="Adventure world" />
  <div className="game-hero-overlay">
    <p>YOUR ADVENTURE AWAITS</p>
    <h2>Level Up Your Skills.</h2>
    <span>Complete quests. Earn XP. Become unstoppable.</span>
  </div>
</div>
        <Navbar />

        <CharacterCard xp={xp} />

        <div className="dashboard-grid">
          <div id="quests">
  <QuestList
    onQuestComplete={(amount) =>
      setXp((current) => current + amount)
    }
  />
</div>
        <div id="stats">
  <Attributes />
</div>
          <StreakCard />
          <div id="rewards">
  <RewardCard />
</div>
        </div>
      </main>
    </div>
  );
}

export default App;