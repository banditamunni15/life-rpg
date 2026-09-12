// ============================================
// RPG ENGINE — pure JS game logic
// Framework independent. No React. No Firebase.
// ============================================

import {
  ATTRIBUTES,
  CATEGORY_ATTRIBUTE_MAP,
  ATTRIBUTE_TITLES,
  XP_TABLE,
  EVOLUTION_STAGES,
  LEVEL_XP_BASE,
  LEVEL_XP_EXPONENT,
} from "./rpgConstants.js";

// --------------------------------------------
// 1. XP SYSTEM
// --------------------------------------------

/**
 * Returns XP reward for a given task difficulty.
 * @param {"easy"|"medium"|"hard"|"epic"} difficulty
 * @returns {number} XP amount
 */
export function getXPForTask(difficulty) {
  return XP_TABLE[difficulty] ?? 0;
}

// --------------------------------------------
// 2. ATTRIBUTE GAIN
// --------------------------------------------

/**
 * Given a quest category and the XP earned, figures out
 * which attribute grows and by how much.
 * amount = floor(xp / 10)
 *
 * For an unrecognized category, no attribute can grow, so this
 * returns { attribute: null, amount: 0 } rather than a nonzero
 * amount attached to a null attribute.
 *
 * @param {string} category - e.g. "study", "coding"
 * @param {number} xp
 * @returns {{ attribute: string|null, amount: number }}
 */
export function getAttributeGainForTask(category, xp) {
  const attribute = CATEGORY_ATTRIBUTE_MAP[category] ?? null;
  if (!attribute) {
    return { attribute: null, amount: 0 };
  }
  const amount = Math.floor(xp / 10);
  return { attribute, amount };
}

// --------------------------------------------
// 3. LEVEL SYSTEM (non-linear)
// --------------------------------------------

/**
 * Cumulative total XP required to REACH a given level.
 * Formula: 100 * level^1.5
 * @param {number} level
 * @returns {number}
 */
export function getXPRequiredForLevel(level) {
  return Math.floor(LEVEL_XP_BASE * Math.pow(level, LEVEL_XP_EXPONENT));
}

/**
 * Determines current level from total accumulated XP.
 * Level 1 is the baseline (starts at 0 XP).
 * From level 2 onward, thresholds follow getXPRequiredForLevel().
 * @param {number} totalXP
 * @returns {number} current level
 */
export function calculateLevel(totalXP) {
  // Guard against NaN/undefined/negative XP (e.g. corrupted Firestore data) —
  // Math.max(0, NaN) is NaN, not 0, so this needs an explicit check.
  const xp = Number.isFinite(totalXP) ? Math.max(0, totalXP) : 0;
  let level = 1;
  while (xp >= getXPRequiredForLevel(level + 1)) {
    level++;
  }
  return level;
}

/**
 * Full progress breakdown for the current level.
 * @param {number} totalXP
 * @returns {{ level: number, currentLevelXP: number, nextLevelXP: number, progress: number }}
 */
export function getLevelProgress(totalXP) {
  // Same NaN/negative guard as calculateLevel — keeps this safe to call
  // even with bad/missing data from Firestore.
  const xp = Number.isFinite(totalXP) ? Math.max(0, totalXP) : 0;
  const level = calculateLevel(xp);

  // Level 1's floor is 0 XP (baseline), everything after uses the formula
  const currentLevelXP = level === 1 ? 0 : getXPRequiredForLevel(level);
  const nextLevelXP = getXPRequiredForLevel(level + 1);

  const span = nextLevelXP - currentLevelXP;
  // span should always be > 0 for these XP ranges, but guard anyway so a
  // division-by-zero can never produce NaN/Infinity for the UI.
  const progressRaw = span > 0 ? ((xp - currentLevelXP) / span) * 100 : 100;
  const progress = Math.min(100, Math.max(0, Math.round(progressRaw * 100) / 100));

  // progress is a PERCENTAGE (0-100), not a 0-1 fraction — matches the
  // rest of the engine's convention (e.g. UI progress bars expecting %).
  return { level, currentLevelXP, nextLevelXP, progress };
}

// --------------------------------------------
// 4. REWARDS / CURRENCY
// --------------------------------------------

/**
 * Converts XP into coin reward.
 * 25 XP -> 5 coins, 50 -> 10, 75 -> 15, 100 -> 20 (xp / 5)
 * @param {number} xp
 * @returns {number} coins
 */
export function getRewardCoins(xp) {
  return Math.floor(xp / 5);
}

// --------------------------------------------
// 5. CHARACTER EVOLUTION
// --------------------------------------------

/**
 * Maps a level to an evolution stage/title.
 * @param {number} level
 * @returns {{ title: string, stage: number }}
 */
export function getEvolutionStage(level) {
  const found = EVOLUTION_STAGES.find((s) => level >= s.min && level <= s.max);
  const stageData = found ?? EVOLUTION_STAGES[0];
  return { title: stageData.title, stage: stageData.stage };
}

// --------------------------------------------
// 6. CHARACTER BUILD
// --------------------------------------------

/**
 * Finds the dominant attribute and returns a "build title".
 * @param {Object} attributes - e.g. { intelligence: 40, problemSolving: 65, ... }
 * @returns {{ attribute: string, value: number, title: string }}
 */
export function getCharacterBuild(attributes = {}) {
  // Ties go to whichever attribute appears first in ATTRIBUTES — this
  // makes the result fully deterministic (no random/ambiguous winner).
  let topAttribute = ATTRIBUTES[0];
  let topValue = attributes[topAttribute] ?? 0;

  for (const attr of ATTRIBUTES) {
    const value = attributes[attr] ?? 0;
    if (value > topValue) {
      topValue = value;
      topAttribute = attr;
    }
  }

  return {
    attribute: topAttribute,
    value: topValue,
    title: ATTRIBUTE_TITLES[topAttribute],
  };
}

// --------------------------------------------
// 7. STREAK SYSTEM
// --------------------------------------------

/**
 * Converts a Date (or date string) into a plain "YYYY-MM-DD" string.
 * Using a date-ONLY string (no time) avoids timezone/hour-of-day bugs
 * when comparing "today" vs "yesterday".
 * @param {Date|string} [date] - defaults to right now
 * @returns {string} e.g. "2026-09-12"
 */
export function getDateOnlyString(date = new Date()) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Number of whole days between two "YYYY-MM-DD" date strings.
 * Result is positive if dateStrB is after dateStrA.
 * @param {string} dateStrA
 * @param {string} dateStrB
 * @returns {number} days difference
 */
export function getDaysDifference(dateStrA, dateStrB) {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Parse as UTC midnight so DST shifts can't throw off the day count.
  const a = new Date(`${dateStrA}T00:00:00Z`);
  const b = new Date(`${dateStrB}T00:00:00Z`);
  return Math.round((b.getTime() - a.getTime()) / MS_PER_DAY);
}

/**
 * Updates the daily quest-completion streak.
 *
 * Rules:
 *  - No previous completion (lastCompletedDate is null/undefined) -> streak becomes 1
 *  - Last completion was today -> streak stays the same (no double-counting)
 *  - Last completion was exactly 1 day ago -> streak increases by 1
 *  - Last completion was more than 1 day ago -> streak resets to 1
 *
 * @param {string|null} lastCompletedDate - "YYYY-MM-DD" string, or null if never completed
 * @param {number} currentStreak
 * @returns {{ streak: number, lastCompletedDate: string }}
 */
export function updateStreak(lastCompletedDate, currentStreak) {
  const today = getDateOnlyString();

  // Never completed anything before
  if (!lastCompletedDate) {
    return { streak: 1, lastCompletedDate: today };
  }

  // Already completed a quest today -> streak does not increase again
  if (lastCompletedDate === today) {
    return { streak: currentStreak, lastCompletedDate: today };
  }

  const daysSinceLastCompletion = getDaysDifference(lastCompletedDate, today);

  if (daysSinceLastCompletion === 1) {
    // Completed yesterday -> streak continues
    return { streak: currentStreak + 1, lastCompletedDate: today };
  }

  // More than 1 day gap (or a weird negative/clock-skew case) -> reset
  return { streak: 1, lastCompletedDate: today };
}

// --------------------------------------------
// 8. MAIN QUEST COMPLETION FUNCTION
// --------------------------------------------

/**
 * The single entry point that ties the whole engine together.
 * Pure function — does NOT touch Firebase or any storage.
 * Takes the user's current RPG state + the completed task's info,
 * and returns the fully recalculated new state.
 *
 * IMPORTANT — duplicate completions: this function is pure and stateless,
 * so calling it twice for the same task will happily award XP/coins twice.
 * Preventing that is the caller's (Member 1's) job, NOT this engine's —
 * check the task's own `completed` flag (as already stored/synced via
 * Firebase) before calling this function, e.g.:
 *
 *   if (task.completed) return; // already completed — do nothing
 *   const result = processQuestCompletion({ ... });
 *
 * @param {Object} input
 * @param {"easy"|"medium"|"hard"|"epic"} input.difficulty
 * @param {"study"|"coding"|"exercise"|"reading"|"personal"} input.category
 * @param {number} input.currentXP - user's total XP BEFORE this quest
 * @param {Object} input.attributes - user's current attribute values, e.g. { intelligence: 40, ... }
 * @param {number} input.currentStreak - streak count BEFORE this quest
 * @param {string|null} input.lastCompletedDate - "YYYY-MM-DD" of the last completed quest, or null
 * @param {number} input.currentCoins - user's total coins BEFORE this quest
 * @param {number} input.currentLongestStreak - user's best-ever streak BEFORE this quest
 * @returns {Object} full updated RPG state (see fields below)
 */
export function processQuestCompletion({
  difficulty,
  category,
  currentXP,
  attributes,
  currentStreak,
  lastCompletedDate,
  currentCoins,
  currentLongestStreak,
}) {
  // 1 & 2. XP gained + new total XP
  // Number.isFinite guard covers null/undefined/NaN currentXP (e.g. a
  // brand-new user doc, or corrupted Firestore data) — falls back to 0
  // instead of letting NaN leak into totalXP and downstream calculations.
  const safeCurrentXP = Number.isFinite(currentXP) ? currentXP : 0;
  const xpGained = getXPForTask(difficulty);
  const totalXP = safeCurrentXP + xpGained;

  // 3 & 4. Attribute gain + updated attributes object (new object, no mutation)
  const attributeGain = getAttributeGainForTask(category, xpGained);
  const updatedAttributes = { ...attributes };
  if (attributeGain.attribute) {
    updatedAttributes[attributeGain.attribute] =
      (updatedAttributes[attributeGain.attribute] ?? 0) + attributeGain.amount;
  }

  // 5. Coins earned for this quest + new total coins
  // Number.isFinite guard covers null/undefined/NaN currentCoins (e.g. a
  // brand-new user doc) — falls back to 0 instead of leaking NaN.
  const coinsEarned = getRewardCoins(xpGained);
  const safeCurrentCoins = Number.isFinite(currentCoins) ? currentCoins : 0;
  const totalCoins = safeCurrentCoins + coinsEarned;

  // 6 & 7. New level + level progress (based on new total XP)
  const level = calculateLevel(totalXP);
  const levelProgress = getLevelProgress(totalXP);

  // 8. Updated streak + best-ever (longest) streak
  const safeCurrentStreak = Number.isFinite(currentStreak) ? currentStreak : 0;
  const streakResult = updateStreak(lastCompletedDate, safeCurrentStreak);
  const safeCurrentLongestStreak = Number.isFinite(currentLongestStreak)
    ? currentLongestStreak
    : 0;
  const longestStreak = Math.max(safeCurrentLongestStreak, streakResult.streak);

  // 9. Evolution stage (based on new level)
  const evolution = getEvolutionStage(level);

  // 10. Character build (based on updated attributes)
  const characterBuild = getCharacterBuild(updatedAttributes);

  return {
    xpGained,
    totalXP,
    attributeGain,
    attributes: updatedAttributes,
    coinsEarned,
    totalCoins,
    level,
    levelProgress,
    streak: streakResult.streak,
    lastCompletedDate: streakResult.lastCompletedDate,
    longestStreak,
    evolution,
    characterBuild,
  };
}
