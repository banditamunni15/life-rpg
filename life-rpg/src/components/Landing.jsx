import { useEffect, useRef, useState } from "react";
import heroImage from "../assets/hero.png";

const FEATURES = [
  {
    icon: "⚔️",
    title: "Daily Quests",
    text: "Turn your to-do list into missions. Study, code, train, read — every real task is a quest waiting to be completed.",
    accent: "#eaa044",
  },
  {
    icon: "📊",
    title: "Character Attributes",
    text: "Grow five core stats — Intelligence, Problem Solving, Strength, Wisdom & Discipline — every time you finish a quest.",
    accent: "#82a477",
  },
  {
    icon: "🔥",
    title: "Streaks & Growth",
    text: "Keep your streak alive and watch your consistency garden grow from a seedling into a fully grown tree.",
    accent: "#e2704f",
  },
  {
    icon: "🎁",
    title: "Real Rewards",
    text: "Earn gold for every quest and cash it in for rewards you actually chose — gaming time, a treat, a day off.",
    accent: "#d88b32",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Log a real quest",
    text: "Add something you're already doing — a workout, a study session, a chore — as a quest on your board.",
  },
  {
    num: "02",
    title: "Complete it, earn XP",
    text: "Check it off and watch your XP bar fill, your attributes climb, and your gold stack up in real time.",
  },
  {
    num: "03",
    title: "Level up your life",
    text: "Evolve your character, extend your streak, and unlock rewards — because your life is the game.",
  },
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function RevealSection({ as: Tag = "div", className = "", children, ...rest }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`${className} reveal ${visible ? "reveal-in" : ""}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function Landing({ onGoToLogin, onGoToSignup }) {
  const [xpDemo, setXpDemo] = useState(62);

  useEffect(() => {
    const id = setInterval(() => {
      setXpDemo((v) => (v >= 92 ? 40 : v + 4));
    }, 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="landing">
      <div className="landing-bg-glow landing-bg-glow-1" />
      <div className="landing-bg-glow landing-bg-glow-2" />

      <header className="landing-nav">
        <div className="logo">
          <div className="logo-mark">⚔</div>
          <div>
            <h2>LIFE RPG</h2>
            <span>LEVEL UP YOUR LIFE</span>
          </div>
        </div>

        <div className="landing-nav-actions">
          <button className="ghost-button" onClick={onGoToLogin}>
            Log In
          </button>
          <button className="primary-button landing-cta-small" onClick={onGoToSignup}>
            Sign Up Free
          </button>
        </div>
      </header>

      <main>
        <section className="landing-hero">
          <div className="landing-hero-copy">
            <span className="landing-pill">
              <span className="landing-pill-dot" /> NEW · GAMIFY YOUR REAL LIFE
            </span>

            <h1>
              Your life is the game.
              <br />
              <span className="landing-hero-highlight">Go level it up.</span>
            </h1>

            <p className="landing-hero-subtitle">
              Turn everyday tasks into quests, earn XP for the things you
              already have to do, grow your character's stats, and cash in
              real rewards. Life RPG makes progress feel like play.
            </p>

            <div className="landing-hero-actions">
              <button
                className="primary-button landing-cta-large"
                onClick={onGoToSignup}
              >
                🚀 Start Your Quest
              </button>
              <button
                className="ghost-button landing-cta-large"
                onClick={onGoToLogin}
              >
                Continue Adventure →
              </button>
            </div>

            <div className="landing-trust-row">
              <div className="landing-trust-item">
                <strong>5</strong>
                <span>Core Attributes</span>
              </div>
              <div className="landing-trust-item">
                <strong>∞</strong>
                <span>Daily Quests</span>
              </div>
              <div className="landing-trust-item">
                <strong>100%</strong>
                <span>Real Rewards</span>
              </div>
            </div>
          </div>

          <div className="landing-hero-visual">
            <div className="landing-orbit landing-orbit-1">🧠</div>
            <div className="landing-orbit landing-orbit-2">💪</div>
            <div className="landing-orbit landing-orbit-3">🎯</div>
            <div className="landing-orbit landing-orbit-4">📚</div>

            <div className="landing-hero-card">
              <img src={heroImage} alt="Adventure world" />

              <div className="landing-hero-card-overlay">
                <div className="landing-mini-row">
                  <span className="landing-mini-badge">LVL 7 · Specialist</span>
                  <span className="landing-mini-fire">🔥 12</span>
                </div>

                <div className="landing-mini-xp-label">
                  <span>Experience</span>
                  <strong>{xpDemo * 10} / 1000 XP</strong>
                </div>
                <div className="landing-mini-xp-bar">
                  <div
                    className="landing-mini-xp-fill"
                    style={{ width: `${xpDemo}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="landing-float-chip landing-float-chip-1">
              <span>⚔️</span> Quest Complete <b>+50 XP</b>
            </div>
            <div className="landing-float-chip landing-float-chip-2">
              <span>🪙</span> +25 Gold Earned
            </div>
          </div>
        </section>

        <RevealSection as="section" className="landing-features">
          <p className="section-label landing-center-label">HOW YOU LEVEL UP</p>
          <h2 className="landing-section-title">
            Everything you need to gamify your grind
          </h2>

          <div className="landing-feature-grid">
            {FEATURES.map((feature, index) => (
              <div
                className="landing-feature-card"
                key={feature.title}
                style={{
                  "--feature-accent": feature.accent,
                  animationDelay: `${index * 0.09}s`,
                }}
              >
                <div className="landing-feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection as="section" className="landing-steps">
          <p className="section-label landing-center-label">GETTING STARTED</p>
          <h2 className="landing-section-title">Three steps to your first level-up</h2>

          <div className="landing-steps-row">
            {STEPS.map((step, index) => (
              <div
                className="landing-step"
                key={step.num}
                style={{ animationDelay: `${index * 0.12}s` }}
              >
                <div className="landing-step-num">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                {index < STEPS.length - 1 && (
                  <div className="landing-step-connector" />
                )}
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection as="section" className="landing-final-cta">
          <div className="landing-final-cta-glow" />
          <span className="landing-final-cta-icon">🏆</span>
          <h2>Ready to become the main character?</h2>
          <p>
            Create your character in seconds. No credit card, no grind you
            didn't choose — just your real life, gamified.
          </p>
          <div className="landing-hero-actions landing-final-actions">
            <button
              className="primary-button landing-cta-large"
              onClick={onGoToSignup}
            >
              ⚔️ Create My Character
            </button>
            <button
              className="ghost-button landing-cta-large"
              onClick={onGoToLogin}
            >
              I already have an account
            </button>
          </div>
        </RevealSection>
      </main>

      <footer className="landing-footer">
        <div className="logo">
          <div className="logo-mark">⚔</div>
          <div>
            <h2>LIFE RPG</h2>
            <span>LEVEL UP YOUR LIFE</span>
          </div>
        </div>
        <p>Your real life is the game. Make today count.</p>
      </footer>
    </div>
  );
}

export default Landing;
