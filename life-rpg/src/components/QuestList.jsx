import { useState } from "react";
import { CATEGORY_ATTRIBUTE_MAP, XP_TABLE } from "../utils/rpgConstants.js";

const CATEGORY_LABELS = {
  study: "📚 Study",
  coding: "💻 Coding",
  exercise: "💪 Exercise",
  reading: "📖 Reading",
  personal: "🧘 Personal",
};

const DIFFICULTY_LABELS = {
  easy: `Easy (+${XP_TABLE.easy} XP)`,
  medium: `Medium (+${XP_TABLE.medium} XP)`,
  hard: `Hard (+${XP_TABLE.hard} XP)`,
  epic: `Epic (+${XP_TABLE.epic} XP)`,
};

const CATEGORY_ICONS = {
  study: "📚",
  coding: "💻",
  exercise: "💪",
  reading: "📖",
  personal: "🧘",
};

function QuestList({ quests, onToggleQuest, onAddQuest, onDeleteQuest }) {
  const [showForm, setShowForm] = useState(false);
  const [newQuest, setNewQuest] = useState({
    title: "",
    category: "study",
    difficulty: "medium",
    time: "30 min",
  });

  const handleAdd = () => {
    if (!newQuest.title.trim()) return;

    onAddQuest({
      id: `quest-${Date.now()}`,
      title: newQuest.title,
      category: newQuest.category,
      difficulty: newQuest.difficulty,
      time: newQuest.time,
      icon: CATEGORY_ICONS[newQuest.category] ?? "⭐",
      completed: false,
    });

    setNewQuest({
      title: "",
      category: "study",
      difficulty: "medium",
      time: "30 min",
    });
    setShowForm(false);
  };

  const completedCount = quests.filter((quest) => quest.completed).length;

  return (
    <section className="panel quests-panel">
      <div className="panel-heading">
        <div>
          <p className="section-label">TODAY'S MISSIONS</p>
          <h2>Daily Quests</h2>
        </div>

        <div className="quest-progress-group">
          <div
            className="quest-ring"
            style={{
              "--pct": `${quests.length ? (completedCount / quests.length) * 100 : 0}%`,
            }}
          >
            <span>
              {quests.length
                ? Math.round((completedCount / quests.length) * 100)
                : 0}
              %
            </span>
          </div>

          <span className="quest-count">
            {completedCount}/{quests.length} COMPLETE
          </span>
        </div>
      </div>

      <div className="quest-board">
        {quests.map((quest, index) => (
          <div
            className={`quest ${quest.completed ? "completed" : ""}`}
            key={quest.id ?? `${quest.title}-${index}`}
          >
            <button
              className="quest-check"
              onClick={() => onToggleQuest(quest.id)}
              aria-label={`Complete ${quest.title}`}
            >
              {quest.completed ? "✓" : ""}
            </button>

            <div className="quest-icon">{quest.icon}</div>

            <div className="quest-content">
              <div className="quest-title-row">
                <h3>{quest.title}</h3>
                <span className="quest-number">0{index + 1}</span>
              </div>

              <div className="quest-meta">
                <span>⏱ {quest.time}</span>
                <span className="quest-dot">•</span>
                <span>{CATEGORY_LABELS[quest.category] ?? quest.category}</span>
                <span className="quest-dot">•</span>
                <span>{quest.completed ? "Completed" : "In progress"}</span>
              </div>
            </div>

            <div className="quest-reward">
              <span>REWARD</span>
              <strong>+{XP_TABLE[quest.difficulty] ?? 0}</strong>
              <small>XP</small>
            </div>

            {onDeleteQuest && (
              <button
                className="quest-delete"
                onClick={() => onDeleteQuest(quest.id)}
                aria-label={`Delete ${quest.title}`}
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      {showForm && (
        <div className="quest-form">
          <input
            type="text"
            placeholder="Quest name"
            value={newQuest.title}
            onChange={(e) =>
              setNewQuest({ ...newQuest, title: e.target.value })
            }
          />

          <select
            value={newQuest.category}
            onChange={(e) =>
              setNewQuest({ ...newQuest, category: e.target.value })
            }
          >
            {Object.keys(CATEGORY_ATTRIBUTE_MAP).map((category) => (
              <option key={category} value={category}>
                {CATEGORY_LABELS[category] ?? category}
              </option>
            ))}
          </select>

          <select
            value={newQuest.difficulty}
            onChange={(e) =>
              setNewQuest({ ...newQuest, difficulty: e.target.value })
            }
          >
            {Object.keys(XP_TABLE).map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {DIFFICULTY_LABELS[difficulty] ?? difficulty}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Time e.g. 30 min"
            value={newQuest.time}
            onChange={(e) => setNewQuest({ ...newQuest, time: e.target.value })}
          />

          <div className="form-buttons">
            <button className="primary-button" onClick={handleAdd}>
              Add Quest
            </button>
            <button
              className="cancel-button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {!showForm && (
        <button className="primary-button" onClick={() => setShowForm(true)}>
          + Create New Quest
        </button>
      )}
    </section>
  );
}

export default QuestList;
