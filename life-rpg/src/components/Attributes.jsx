import { ATTRIBUTES } from "../utils/rpgConstants.js";

const ATTRIBUTE_DISPLAY = {
  intelligence: { label: "Intelligence", icon: "🧠" },
  problemSolving: { label: "Problem Solving", icon: "⚔️" },
  strength: { label: "Strength", icon: "💪" },
  wisdom: { label: "Wisdom", icon: "📚" },
  discipline: { label: "Discipline", icon: "🎯" },
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
        {ATTRIBUTES.map((attr) => {
          const value = attributes[attr] ?? 0;
          const display = ATTRIBUTE_DISPLAY[attr];

          return (
            <div className="attribute" key={attr}>
              <span>{display.icon}</span>
              <div className="attribute-main">
                <div>
                  <strong>{display.label}</strong>
                  <b>{value}</b>
                </div>
                <div className="stat-bar">
                  <div style={{ width: `${getBarWidth(value, maxValue)}%` }}></div>
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
