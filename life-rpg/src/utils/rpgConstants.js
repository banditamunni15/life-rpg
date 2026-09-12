// ============================================
// RPG CONSTANTS — all tunable game data lives here
// ============================================

// The 5 core attributes every character has
export const ATTRIBUTES = [
  "intelligence",
  "problemSolving",
  "strength",
  "wisdom",
  "discipline",
];

// Which quest category grows which attribute
export const CATEGORY_ATTRIBUTE_MAP = {
  study: "intelligence",
  coding: "problemSolving",
  exercise: "strength",
  reading: "wisdom",
  personal: "discipline",
};

// Human-friendly titles per attribute (used in character build)
export const ATTRIBUTE_TITLES = {
  intelligence: "The Scholar",
  problemSolving: "The Problem Solver",
  strength: "The Warrior",
  wisdom: "The Sage",
  discipline: "The Disciplined",
};

// XP awarded per task difficulty
export const XP_TABLE = {
  easy: 25,
  medium: 50,
  hard: 75,
  epic: 100,
};

// Character evolution stages based on level
export const EVOLUTION_STAGES = [
  { min: 1, max: 4, title: "Novice", stage: 1 },
  { min: 5, max: 9, title: "Apprentice", stage: 2 },
  { min: 10, max: 19, title: "Specialist", stage: 3 },
  { min: 20, max: Infinity, title: "Master", stage: 4 },
];

// Non-linear level curve config
export const LEVEL_XP_BASE = 100;
export const LEVEL_XP_EXPONENT = 1.5;
