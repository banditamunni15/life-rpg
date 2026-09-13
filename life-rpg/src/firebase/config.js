// Firebase initialization.
// Reads config from Vite env vars so real keys never get committed to git.
// Copy .env.example to .env.local and fill in your Firebase project's values.
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const missingKeys = Object.entries(firebaseConfig)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingKeys.length > 0) {
  // eslint-disable-next-line no-console
  console.warn(
    `[firebase] Missing config values: ${missingKeys.join(
      ", ",
    )}. Did you create a .env.local from .env.example?`,
  );
}

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Firestore's default streaming (WebChannel/gRPC) connection gets silently
// blocked on some corporate networks, VPNs, sandboxed browsers, and by some
// extensions - which surfaces as a misleading "client is offline" error even
// though the network is fine. Auto-detecting long polling falls back to
// plain HTTP requests instead of a persistent stream, which works almost
// everywhere. It's slightly less efficient but far more reliable, so it's a
// good default for a hackathon build.
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
  useFetchStreams: false,
});
