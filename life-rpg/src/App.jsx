import { useState } from "react";
import { useAuth } from "./context/AuthContext.jsx";
import Landing from "./components/Landing.jsx";
import Login from "./components/Auth/Login.jsx";
import Signup from "./components/Auth/Signup.jsx";
import Dashboard from "./components/Dashboard.jsx";
import "./App.css";

function App() {
  const { currentUser, authLoading, authError } = useAuth();
  const [authView, setAuthView] = useState("landing");

  if (authLoading) {
    return (
      <div className="auth-loading">
        <div className="loading-spinner" />
        Loading...
      </div>
    );
  }

  if (authError) {
    return (
      <div className="auth-loading">
        <h1>Firebase authentication is unavailable</h1>
        <p>
          Replace the Firebase Web app values in <code>.env.local</code>, then
          restart the Vite server. In Firebase Console, also enable
          Email/Password under Authentication &gt; Sign-in method.
        </p>
        <p className="auth-error">{authError.message}</p>
      </div>
    );
  }

  if (!currentUser) {
    if (authView === "login") {
      return (
        <Login
          onSwitchToSignup={() => setAuthView("signup")}
          onBackToHome={() => setAuthView("landing")}
        />
      );
    }

    if (authView === "signup") {
      return (
        <Signup
          onSwitchToLogin={() => setAuthView("login")}
          onBackToHome={() => setAuthView("landing")}
        />
      );
    }

    return (
      <Landing
        onGoToLogin={() => setAuthView("login")}
        onGoToSignup={() => setAuthView("signup")}
      />
    );
  }

  return <Dashboard />;
}

export default App;
