import { ATTRIBUTES } from "../utils/rpgConstants.js";

const ATTRIBUTE_DISPLAY = {
  intelligence: {
    label: "Intelligence",
    icon: "🧠",
    bg: "linear-gradient(135deg, #cfe4ff, #a9c9f5)",
    accent: "#2454b8",
    accentDark: "#132c56",
  },
  problemSolving: {
    label: "Problem Solving",
    icon: "⚔️",
    bg: "linear-gradient(135deg, #ffdcb0, #f7c281)",
    accent: "#b8631f",
    accentDark: "#4a2607",
  },
  strength: {
    label: "Strength",
    icon: "💪",
    bg: "linear-gradient(135deg, #ffc9c9, #f5a3a3)",
    accent: "#b8291f",
    accentDark: "#4a0f0a",
  },
  wisdom: {
    label: "Wisdom",
    icon: "📚",
    bg: "linear-gradient(135deg, #ddc9ff, #c4a4f2)",
    accent: "#6224b8",
    accentDark: "#2a0f52",
  },
  discipline: {
    label: "Discipline",
    icon: "🎯",
    bg: "linear-gradient(135deg, #c3f0d8, #9adcb8)",
    accent: "#1f8a4c",
    accentDark: "#0c3a20",
  },
};

// Attributes are uncapped, so bar width is scaled against a soft ceiling
// that grows with the highest current value, keeping bars meaningful
// whether a player is at 10 or 300.
function getBarWidth(value, maxValue) {
  const ceiling = Math.max(maxValue, 50);
  return Math.min(100, Math.round((value / ceiling) * 100));
}

function Attributes({ attributes }) {
  const maxValue = Math.max(...ATTRIBUTES.map((attr) => attributes[attr] ?? 0), 1);

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="section-label">CHARACTER BUILD</p>
          <h2>Attributes</h2>
        </div>
      </div>

      <div className="attributes">
        {ATTRIBUTES.map((attr, index) => {
          const value = attributes[attr] ?? 0;
          const display = ATTRIBUTE_DISPLAY[attr];
          const width = getBarWidth(value, maxValue);

          return (
            <div
              className="attribute"
              key={attr}
              style={{
                "--attr-bg": display.bg,
                "--attr-accent": display.accent,
                "--attr-accent-dark": display.accentDark,
                animationDelay: `${index * 0.08}s`,
              }}
            >
              <span>{display.icon}</span>
              <div className="attribute-main">
                <div>
                  <strong>{display.label}</strong>
                  <b>{value}</b>
                </div>
                <div className="stat-bar">
                  <div style={{ width: `${width}%` }}></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Attributes;
