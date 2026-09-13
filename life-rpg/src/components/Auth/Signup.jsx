import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { friendlyAuthError } from "./Login.jsx";

function Signup({ onSwitchToLogin, onBackToHome }) {
  const { signup } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signup(email, password, displayName || "Player");
    } catch (err) {
      setError(friendlyAuthError(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-screen">
      {onBackToHome && (
        <button className="auth-back-link" onClick={onBackToHome} type="button">
          ← Back to home
        </button>
      )}

      <div className="auth-card">
        <div className="logo">
          <div className="logo-mark">⚔</div>
          <div>
            <h2>LIFE RPG</h2>
            <span>LEVEL UP YOUR LIFE</span>
          </div>
        </div>

        <h1>Create your character</h1>
        <p className="auth-subtitle">
          Your real life starts building your build today.
        </p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Character name
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Player One"
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              required
              minLength={6}
            />
          </label>

          <button
            type="submit"
            className="primary-button"
            disabled={submitting}
          >
            {submitting ? "Creating..." : "Start Adventure"}
          </button>
        </form>

        <p className="auth-switch">
          Already have a character?{" "}
          <button type="button" onClick={onSwitchToLogin}>
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signup;
