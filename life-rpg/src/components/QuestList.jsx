import { useState } from "react";

function QuestList({ onQuestComplete }) {
  const [quests, setQuests] = useState([
    {
      title: "Study Computer Networks",
      xp: 40,
      time: "60 min",
      icon: "📚",
      completed: false,
    },
    {
      title: "Solve 3 DSA Problems",
      xp: 60,
      time: "45 min",
      icon: "⚔️",
      completed: false,
    },
    {
      title: "Build Hackathon Project",
      xp: 80,
      time: "90 min",
      icon: "🛠️",
      completed: false,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newQuest, setNewQuest] = useState({
    title: "",
    xp: 40,
    time: "30 min",
  });

  const toggleQuest = (index) => {
    const quest = quests[index];

    setQuests((oldQuests) =>
      oldQuests.map((quest, i) =>
        i === index
          ? { ...quest, completed: !quest.completed }
          : quest
      )
    );

    if (!quest.completed) {
      onQuestComplete(quest.xp);
    } else {
      onQuestComplete(-quest.xp);
    }
  };

  const addQuest = () => {
    if (!newQuest.title.trim()) return;

    setQuests([
      ...quests,
      {
        title: newQuest.title,
        xp: Number(newQuest.xp),
        time: newQuest.time,
        icon: "⭐",
        completed: false,
      },
    ]);

    setNewQuest({
      title: "",
      xp: 40,
      time: "30 min",
    });

    setShowForm(false);
  };

  const completedCount = quests.filter(
    (quest) => quest.completed
  ).length;

  return (
    <section className="panel quests-panel">
      <div className="panel-heading">
        <div>
          <p className="section-label">TODAY'S MISSIONS</p>
          <h2>Daily Quests</h2>
        </div>

        <span className="quest-count">
          {completedCount}/{quests.length} COMPLETE
        </span>
      </div>

      <div className="quest-board">
        {quests.map((quest, index) => (
          <div
            className={`quest ${quest.completed ? "completed" : ""}`}
            key={`${quest.title}-${index}`}
          >
            <button
              className="quest-check"
              onClick={() => toggleQuest(index)}
              aria-label={`Complete ${quest.title}`}
            >
              {quest.completed ? "✓" : ""}
            </button>

            <div className="quest-icon">
              {quest.icon}
            </div>

            <div className="quest-content">
              <div className="quest-title-row">
                <h3>{quest.title}</h3>

                <span className="quest-number">
                  0{index + 1}
                </span>
              </div>

              <div className="quest-meta">
                <span>⏱ {quest.time}</span>
                <span className="quest-dot">•</span>
                <span>
                  {quest.completed ? "Completed" : "In progress"}
                </span>
              </div>
            </div>

            <div className="quest-reward">
              <span>REWARD</span>
              <strong>+{quest.xp}</strong>
              <small>XP</small>
            </div>
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
              setNewQuest({
                ...newQuest,
                title: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="XP"
            value={newQuest.xp}
            onChange={(e) =>
              setNewQuest({
                ...newQuest,
                xp: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Time e.g. 30 min"
            value={newQuest.time}
            onChange={(e) =>
              setNewQuest({
                ...newQuest,
                time: e.target.value,
              })
            }
          />

          <div className="form-buttons">
            <button
              className="primary-button"
              onClick={addQuest}
            >
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
        <button
          className="primary-button"
          onClick={() => setShowForm(true)}
        >
          + Create New Quest
        </button>
      )}
    </section>
  );
}

export default QuestList;