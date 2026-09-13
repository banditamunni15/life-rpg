import { useEffect, useState } from "react";
import heroImage from "../assets/hero.png";
import Navbar from "./Navbar.jsx";
import CharacterCard from "./CharacterCard.jsx";
import QuestList from "./QuestList.jsx";
import Attributes from "./Attributes.jsx";
import StreakCard from "./StreakCard.jsx";
import RewardCard from "./RewardCard.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { getOrCreateUserState, saveUserState } from "../firebase/userData.js";
import {
  processQuestCompletion,
  getLevelProgress,
  getEvolutionStage,
  getCharacterBuild,
  calculateLevel,
} from "../utils/rpgEngine.js";

function describeLoadError(err) {
  const code = err?.code ?? "";
  if (code === "unavailable" || /offline/i.test(err?.message ?? "")) {
    return "Can't reach Firestore right now. This usually means the Firestore database hasn't been created yet in the Firebase console, or something on this network (firewall/VPN/extension) is blocking the connection.";
  }
  if (code === "permission-denied") {
    return "Firestore rejected the request (permission-denied). Check that firestore.rules has been deployed and matches your signed-in user.";
  }
  if (code === "not-found") {
    return "Firestore database not found for this project. Create a Cloud Firestore database in the Firebase console.";
  }
  return "Couldn't load your saved progress. Check your Firebase setup.";
}

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [userState, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadState() {
      setLoading(true);
      setError("");
      try {
        const state = await getOrCreateUserState(
          currentUser.uid,
          currentUser.displayName || "Player",
        );
        if (!cancelled) setUserState(state);
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError(describeLoadError(err));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadState();
    return () => {
      cancelled = true;
    };
  }, [currentUser, retryToken]);

  async function persist(nextState) {
    setUserState(nextState);
    try {
      await saveUserState(currentUser.uid, nextState);
    } catch (err) {
      console.error("Failed to save progress:", err);
    }
  }

  function handleToggleQuest(questId) {
    const quest = userState.quests.find((q) => q.id === questId);
    if (!quest) return;

    // Un-completing a quest just flips the flag back — it does not
    // claw back XP/attributes, to keep the reward logic simple for the MVP.
    if (quest.completed) {
      const updatedQuests = userState.quests.map((q) =>
        q.id === questId ? { ...q, completed: false } : q,
      );
      persist({ ...userState, quests: updatedQuests });
      return;
    }

    const result = processQuestCompletion({
      difficulty: quest.difficulty,
      category: quest.category,
      currentXP: userState.xp,
      attributes: userState.attributes,
      currentStreak: userState.streak,
      lastCompletedDate: userState.lastCompletedDate,
      currentCoins: userState.coins,
      currentLongestStreak: userState.longestStreak,
    });

    const updatedQuests = userState.quests.map((q) =>
      q.id === questId ? { ...q, completed: true } : q,
    );

    persist({
      ...userState,
      xp: result.totalXP,
      attributes: result.attributes,
      coins: result.totalCoins,
      streak: result.streak,
      lastCompletedDate: result.lastCompletedDate,
      longestStreak: result.longestStreak,
      questsCompletedTotal: (userState.questsCompletedTotal ?? 0) + 1,
      quests: updatedQuests,
    });
  }

  function handleAddQuest(newQuest) {
    persist({ ...userState, quests: [...userState.quests, newQuest] });
  }

  function handleDeleteQuest(questId) {
    persist({
      ...userState,
      quests: userState.quests.filter((q) => q.id !== questId),
    });
  }

  if (loading) {
    return <div className="auth-loading">Loading your character...</div>;
  }

  if (error) {
    return (
      <div className="auth-loading">
        <div className="load-error-box">
          <p>{error}</p>
          <div className="load-error-actions">
            <button
              className="primary-button"
              onClick={() => setRetryToken((t) => t + 1)}
            >
              Retry
            </button>
            <button className="cancel-button" onClick={logout}>
              Log out
            </button>
          </div>
        </div>
      </div>
    );
  }

  const level = calculateLevel(userState.xp);
  const levelProgress = getLevelProgress(userState.xp);
  const evolution = getEvolutionStage(level);
  const characterBuild = getCharacterBuild(userState.attributes);

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
              document
                .getElementById("dashboard")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span>🏠</span> Dashboard
          </button>

          <button
            className="nav-item"
            onClick={() =>
              document
                .getElementById("quests")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span>⚔️</span> Quests
          </button>

          <button
            className="nav-item"
            onClick={() =>
              document
                .getElementById("stats")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span>📊</span> Stats
          </button>

          <button
            className="nav-item"
            onClick={() =>
              document
                .getElementById("rewards")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span>🎁</span> Rewards
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="mini-streak">
            <span>🔥</span>
            <div>
              <strong>{userState.streak} DAY STREAK</strong>
              <small>Keep going!</small>
            </div>
          </div>

          <button className="settings" onClick={logout}>
            🚪 Log Out
          </button>
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

        <Navbar
          displayName={currentUser.displayName || userState.displayName}
          level={level}
          evolutionTitle={evolution.title}
        />

        <CharacterCard
          xp={userState.xp}
          levelProgress={levelProgress}
          evolution={evolution}
          characterBuild={characterBuild}
          streak={userState.streak}
          questsCompletedTotal={userState.questsCompletedTotal ?? 0}
          coins={userState.coins}
        />

        <div className="dashboard-grid">
          <div id="quests">
            <QuestList
              quests={userState.quests}
              onToggleQuest={handleToggleQuest}
              onAddQuest={handleAddQuest}
              onDeleteQuest={handleDeleteQuest}
            />
          </div>
          <div id="stats">
            <Attributes attributes={userState.attributes} />
          </div>
          <StreakCard streak={userState.streak} />
          <div id="rewards">
            <RewardCard coins={userState.coins} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
