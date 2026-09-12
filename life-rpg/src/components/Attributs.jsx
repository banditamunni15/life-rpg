function Attributes() {
  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="section-label">CHARACTER BUILD</p>
          <h2>Attributes</h2>
        </div>
      </div>

      <div className="attributes">
        <div className="attribute">
          <span>🧠</span>
          <div className="attribute-main">
            <div>
              <strong>Intellect</strong>
              <b>72</b>
            </div>
            <div className="stat-bar">
              <div style={{ width: "72%" }}></div>
            </div>
          </div>
        </div>

        <div className="attribute">
          <span>💪</span>
          <div className="attribute-main">
            <div>
              <strong>Strength</strong>
              <b>58</b>
            </div>
            <div className="stat-bar">
              <div style={{ width: "58%" }}></div>
            </div>
          </div>
        </div>

        <div className="attribute">
          <span>❤️</span>
          <div className="attribute-main">
            <div>
              <strong>Vitality</strong>
              <b>64</b>
            </div>
            <div className="stat-bar">
              <div style={{ width: "64%" }}></div>
            </div>
          </div>
        </div>

        <div className="attribute">
          <span>🎯</span>
          <div className="attribute-main">
            <div>
              <strong>Discipline</strong>
              <b>81</b>
            </div>
            <div className="stat-bar">
              <div style={{ width: "81%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Attributes;