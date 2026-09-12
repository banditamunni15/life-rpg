import {
  ATTRIBUTES,
  CATEGORY_ATTRIBUTE_MAP,
  ATTRIBUTE_TITLES,
  XP_TABLE,
  EVOLUTION_STAGES,
  LEVEL_XP_BASE,
  LEVEL_XP_EXPONENT,
} from "./rpgConstants.js";

export function getXPForTask(difficulty) {
  return XP_TABLE[difficulty] ?? 0;
}

export function getAttributeGainForTask(category, xp) {
  const attribute = CATEGORY_ATTRIBUTE_MAP[category] ?? null;
  if (!attribute) {
    return { attribute: null, amount: 0 };
  }
  const amount = Math.floor(xp / 10);
  return { attribute, amount };
}

export function getXPRequiredForLevel(level) {
  return Math.floor(LEVEL_XP_BASE * Math.pow(level, LEVEL_XP_EXPONENT));
}

export function calculateLevel(totalXP) {
  const xp = Number.isFinite(totalXP) ? Math.max(0, totalXP) : 0;
  let level = 1;
  while (xp >= getXPRequiredForLevel(level + 1)) {
    level++;
  }
  return level;
}

export function getLevelProgress(totalXP) {
  const xp = Number.isFinite(totalXP) ? Math.max(0, totalXP) : 0;
  const level = calculateLevel(xp);

  const currentLevelXP = level === 1 ? 0 : getXPRequiredForLevel(level);
  const nextLevelXP = getXPRequiredForLevel(level + 1);

  const span = nextLevelXP - currentLevelXP;
  const progressRaw = span > 0 ? ((xp - currentLevelXP) / span) * 100 : 100;
  const progress = Math.min(100, Math.max(0, Math.round(progressRaw * 100) / 100));

  return { level, currentLevelXP, nextLevelXP, progress };
}

export function getRewardCoins(xp) {
  return Math.floor(xp / 5);
}

export function getEvolutionStage(level) {
  const found = EVOLUTION_STAGES.find((s) => level >= s.min && level <= s.max);
  const stageData = found ?? EVOLUTION_STAGES[0];
  return { title: stageData.title, stage: stageData.stage };
}

export function getCharacterBuild(attributes = {}) {
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

export function getDateOnlyString(date = new Date()) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getDaysDifference(dateStrA, dateStrB) {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const a = new Date(`${dateStrA}T00:00:00Z`);
  const b = new Date(`${dateStrB}T00:00:00Z`);
  return Math.round((b.getTime() - a.getTime()) / MS_PER_DAY);
}

export function updateStreak(lastCompletedDate, currentStreak) {
  const today = getDateOnlyString();

  if (!lastCompletedDate) {
    return { streak: 1, lastCompletedDate: today };
  }

  if (lastCompletedDate === today) {
    return { streak: currentStreak, lastCompletedDate: today };
  }

  const daysSinceLastCompletion = getDaysDifference(lastCompletedDate, today);

  if (daysSinceLastCompletion === 1) {
    return { streak: currentStreak + 1, lastCompletedDate: today };
  }

  return { streak: 1, lastCompletedDate: today };
}

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
  const safeCurrentXP = Number.isFinite(currentXP) ? currentXP : 0;
  const xpGained = getXPForTask(difficulty);
  const totalXP = safeCurrentXP + xpGained;

  const attributeGain = getAttributeGainForTask(category, xpGained);
  const updatedAttributes = { ...attributes };
  if (attributeGain.attribute) {
    updatedAttributes[attributeGain.attribute] =
      (updatedAttributes[attributeGain.attribute] ?? 0) + attributeGain.amount;
  }

  const coinsEarned = getRewardCoins(xpGained);
  const safeCurrentCoins = Number.isFinite(currentCoins) ? currentCoins : 0;
  const totalCoins = safeCurrentCoins + coinsEarned;

  const level = calculateLevel(totalXP);
  const levelProgress = getLevelProgress(totalXP);

  const safeCurrentStreak = Number.isFinite(currentStreak) ? currentStreak : 0;
  const streakResult = updateStreak(lastCompletedDate, safeCurrentStreak);
  const safeCurrentLongestStreak = Number.isFinite(currentLongestStreak)
    ? currentLongestStreak
    : 0;
  const longestStreak = Math.max(safeCurrentLongestStreak, streakResult.streak);

  const evolution = getEvolutionStage(level);
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
