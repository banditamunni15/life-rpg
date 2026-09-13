import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./config.js";
import { ATTRIBUTES } from "../utils/rpgConstants.js";

// One document per user at users/{uid}. Keeping everything in a single
// document (instead of subcollections) is intentionally simple for the
// MVP: one read on login, one write per quest action.

const DEFAULT_QUESTS = [
  {
    id: "seed-1",
    title: "Study Computer Networks",
    category: "study",
    difficulty: "medium",
    time: "60 min",
    icon: "📚",
    completed: false,
  },
  {
    id: "seed-2",
    title: "Solve 3 DSA Problems",
    category: "coding",
    difficulty: "medium",
    time: "45 min",
    icon: "⚔️",
    completed: false,
  },
  {
    id: "seed-3",
    title: "Build Hackathon Project",
    category: "coding",
    difficulty: "hard",
    time: "90 min",
    icon: "🛠️",
    completed: false,
  },
];

function emptyAttributes() {
  return ATTRIBUTES.reduce((acc, attr) => ({ ...acc, [attr]: 0 }), {});
}

export function defaultUserState(displayName = "Player") {
  return {
    displayName,
    xp: 0,
    coins: 0,
    streak: 0,
    longestStreak: 0,
    lastCompletedDate: null,
    questsCompletedTotal: 0,
    attributes: emptyAttributes(),
    quests: DEFAULT_QUESTS,
  };
}

/**
 * Fetches the user's saved state, creating a fresh default document the
 * first time they log in.
 */
export async function getOrCreateUserState(uid, displayName) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    return snap.data();
  }

  const initialState = defaultUserState(displayName);
  await setDoc(ref, { ...initialState, createdAt: serverTimestamp() });
  return initialState;
}

/**
 * Overwrites the user's saved state. Called after every quest
 * completion / creation so progress survives a refresh.
 */
export async function saveUserState(uid, state) {
  const ref = doc(db, "users", uid);
  await setDoc(
    ref,
    { ...state, updatedAt: serverTimestamp() },
    { merge: true }
  );
}
