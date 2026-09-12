import QuestCard from "./QuestCard";

function QuestBoard() {
  const quests = [
    {
      id: 1,
      icon: "🧠",
      title: "Study Computer Networks",
      attribute: "Intelligence",
      xp: 50,
    },
    {
      id: 2,
      icon: "⚔️",
      title: "Solve 2 DSA Problems",
      attribute: "Problem Solving",
      xp: 60,
    },
    {
      id: 3,
      icon: "💪",
      title: "Exercise for 30 Minutes",
      attribute: "Strength",
      xp: 40,
    },
    {
      id: 4,
      icon: "📚",
      title: "Read for 20 Minutes",
      attribute: "Wisdom",
      xp: 30,
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-950 p-6">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-widest text-purple-300">
          Daily Quests
        </p>

        <h2 className="mt-1 text-2xl font-bold text-white">
          ⚔️ Today's Quest Board
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Complete quests to grow your character.
        </p>
      </div>

      <div className="space-y-4">
        {quests.map((quest) => (
          <QuestCard
            key={quest.id}
            icon={quest.icon}
            title={quest.title}
            attribute={quest.attribute}
            xp={quest.xp}
          />
        ))}
      </div>
    </section>
  );
}

export default QuestBoard;