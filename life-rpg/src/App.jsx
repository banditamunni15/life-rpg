import { useState } from "react";
import { useAuth } from "./context/AuthContext.jsx";
import Login from "./components/Auth/Login.jsx";
import Signup from "./components/Auth/Signup.jsx";
import Dashboard from "./components/Dashboard.jsx";
import "./App.css";

function App() {
  const { currentUser, authLoading, authError } = useAuth();
  const [authView, setAuthView] = useState("login");

  if (authLoading) {
    return <div className="auth-loading">Loading...</div>;
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
    return authView === "login" ? (
      <Login onSwitchToSignup={() => setAuthView("signup")} />
    ) : (
      <Signup onSwitchToLogin={() => setAuthView("login")} />
    );
  }

  return <Dashboard />;
}

export default App;
