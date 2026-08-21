// 进度状态仓库：单一数据源 + localStorage 持久化 + 导出/导入
const KEY = "python_course_v1";

function defaultState() {
  return {
    version: 1,
    lessons: {},   // id -> { seen, passed, attempts, lastPassAt }
    reviews: {},   // skillId -> { due, interval, ease, lapses, history }
    settings: { apiKey: "", name: "" },
  };
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...defaultState(),
        ...parsed,
        settings: { ...defaultState().settings, ...(parsed.settings || {}) },
      };
    }
  } catch (e) {
    console.warn("进度读取失败，使用默认状态", e);
  }
  return defaultState();
}

const state = load();

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("进度保存失败", e);
  }
}

export function getState() { return state; }

export function lessonState(id) {
  if (!state.lessons[id]) {
    state.lessons[id] = { seen: false, passed: false, attempts: 0, lastPassAt: null };
  }
  return state.lessons[id];
}

export function isSeen(id) { return !!state.lessons[id]?.seen; }
export function isPassed(id) { return !!state.lessons[id]?.passed; }

export function markSeen(id) {
  const ls = lessonState(id);
  if (!ls.seen) { ls.seen = true; save(); }
}

export function setPassed(id, passed) {
  const ls = lessonState(id);
  if (ls.passed !== passed) {
    ls.passed = passed;
    if (passed) ls.lastPassAt = Date.now();
    save();
  }
}

export function addAttempt(id) {
  const ls = lessonState(id);
  ls.attempts += 1;
  save();
}

export function exercisePassed(lessonId, exId) {
  return !!state.lessons[lessonId]?.exercises?.[exId];
}

export function markExercisePassed(lessonId, exId) {
  const ls = lessonState(lessonId);
  if (!ls.exercises) ls.exercises = {};
  if (!ls.exercises[exId]) {
    ls.exercises[exId] = true;
    save();
  }
}

export function reviewState(skillId) {
  if (!state.reviews[skillId]) {
    state.reviews[skillId] = { due: 0, interval: 0, ease: 2.5, lapses: 0, history: [] };
  }
  return state.reviews[skillId];
}

export function updateReview(skillId, patch) {
  Object.assign(reviewState(skillId), patch);
  save();
}

export function getSettings() { return state.settings; }

export function setSetting(key, value) {
  state.settings[key] = value;
  save();
}

export function exportData() { return JSON.stringify(state, null, 2); }

export function importData(jsonText) {
  const parsed = JSON.parse(jsonText);
  if (!parsed || typeof parsed !== "object") throw new Error("导入内容格式不对");
  Object.assign(state, defaultState(), parsed);
  state.settings = { ...defaultState().settings, ...(parsed.settings || {}) };
  save();
}
