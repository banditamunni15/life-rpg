import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

function Login({ onSwitchToSignup, onBackToHome }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
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

        <h1>Welcome back, Adventurer</h1>
        <p className="auth-subtitle">
          Log in to continue your character build.
        </p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
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
              placeholder="••••••••"
              required
              minLength={6}
            />
          </label>

          <button
            type="submit"
            className="primary-button"
            disabled={submitting}
          >
            {submitting ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="auth-switch">
          New here?{" "}
          <button type="button" onClick={onSwitchToSignup}>
            Create a character
          </button>
        </p>
      </div>
    </div>
  );
}

export function friendlyAuthError(err) {
  const code = err?.code ?? "";
  if (
    code.includes("configuration-not-found") ||
    code.includes("invalid-api-key")
  ) {
    return "Firebase Authentication is not configured for this project. Refresh the Web app config in .env.local and enable Email/Password sign-in in Firebase Console.";
  }
  if (code.includes("operation-not-allowed")) {
    return "Email/password sign-in is disabled. Enable it in Firebase Console under Authentication > Sign-in method.";
  }
  if (code.includes("user-not-found") || code.includes("invalid-credential")) {
    return "No account found with that email and password.";
  }
  if (code.includes("wrong-password")) {
    return "Incorrect password.";
  }
  if (code.includes("email-already-in-use")) {
    return "An account with that email already exists.";
  }
  if (code.includes("weak-password")) {
    return "Password should be at least 6 characters.";
  }
  if (code.includes("invalid-email")) {
    return "That email address doesn't look right.";
  }
  return "Something went wrong. Please try again.";
}

export default Login;
