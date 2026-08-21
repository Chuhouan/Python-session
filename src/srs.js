// SRS 间隔复习：SM-2 简化版，间隔 1 → 3 → 7 → 14 → 30 → 60 天
import * as state from "./state.js";

const INTERVALS = [1, 3, 7, 14, 30, 60];
const DAY = 86400000;

const skillMeta = new Map(); // skillId -> { label, lessonId, lessonTitle }

export function registerSkill(skillId, meta) {
  if (!skillMeta.has(skillId)) skillMeta.set(skillId, meta || {});
}

export function getSkillMeta(skillId) { return skillMeta.get(skillId); }

export function isScheduled(skillId) {
  return (state.reviewState(skillId).interval || 0) > 0;
}

export function isDue(skillId) {
  const s = state.reviewState(skillId);
  return s.interval > 0 && s.due <= Date.now();
}

// 答对：已排期则升级，否则首次排期
export function onCorrect(skills) {
  for (const sk of skills || []) {
    if (isScheduled(sk)) grade(sk, 4);
    else schedule(sk);
  }
}

// 答错：仅对已排期的技能降级（首学答错不影响排期）
export function onWrong(skills) {
  for (const sk of skills || []) {
    if (isScheduled(sk)) grade(sk, 0);
  }
}

function schedule(skillId) {
  const s = state.reviewState(skillId);
  s.interval = 1;
  s.ease = 2.5;
  s.lapses = 0;
  s.due = Date.now() + INTERVALS[0] * DAY;
  state.updateReview(skillId, s);
}

function grade(skillId, quality) {
  const s = state.reviewState(skillId);
  if (quality < 3) {
    s.interval = 1;
    s.lapses = (s.lapses || 0) + 1;
  } else {
    const idx = INTERVALS.indexOf(s.interval);
    const next = (idx < 0 || idx >= INTERVALS.length - 1) ? INTERVALS[INTERVALS.length - 1] : INTERVALS[idx + 1];
    s.interval = next;
    s.ease = Math.max(1.3, (s.ease || 2.5) + (quality >= 4 ? 0.1 : -0.15));
  }
  s.due = Date.now() + s.interval * DAY;
  s.history = (s.history || []).concat([{ at: Date.now(), quality, interval: s.interval }]);
  state.updateReview(skillId, s);
}

export function dueSkills() {
  const now = Date.now();
  return Object.keys(state.getState().reviews).filter((id) => {
    const s = state.getState().reviews[id];
    return s.interval > 0 && s.due <= now;
  });
}

export function reviewCount() { return dueSkills().length; }
