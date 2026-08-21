// 练习组件：选择题 / 填空题 / 代码题。通过后记录状态、触发解锁，并按技能排期 SRS 复习
import * as ui from "./ui.js";
import * as state from "./state.js";
import * as srs from "./srs.js";
import { onExercisePassed, getLesson } from "./router.js";
import { runCodeExercise } from "./runner.js";
import { createEditor } from "./editor.js";
import * as errors from "./errors.js";
import * as ai from "./ai.js";

function skillIds(skills) { return (skills || []).map((s) => s.id); }

export function choiceExercise(container, spec) {
  const box = ui.el("div", { class: "ex" });
  container.appendChild(box);
  mountChoice(box, spec);
}

function mountChoice(box, spec, reviewing = false) {
  const { lessonId, exId, skills = [] } = spec;
  skills.forEach((s) => srs.registerSkill(s.id, { label: s.label, lessonId }));

  if (state.exercisePassed(lessonId, exId) && !reviewing) {
    const due = skills.some((s) => srs.isDue(s.id));
    box.innerHTML = "";
    box.appendChild(ui.el("div", { class: "ex-prompt", html: spec.prompt }));
    box.appendChild(ui.callout("ok", due ? "✓ 已通过 · 到期待复习" : "✓ 已通过", spec.explain));
    box.appendChild(ui.el("button", {
      class: "btn btn-ghost small",
      text: due ? "复习此题" : "重新作答",
      onClick: () => mountChoice(box, spec, true),
    }));
    return;
  }

  box.innerHTML = "";
  box.appendChild(ui.el("div", { class: "ex-prompt", html: spec.prompt }));
  const opts = ui.el("div", { class: "ex-options" });
  const feedback = ui.el("div", { class: "ex-feedback" });
  let done = false;

  spec.options.forEach((opt, i) => {
    const b = ui.el("button", { class: "ex-opt", html: opt.label });
    b.addEventListener("click", () => {
      if (done) return;
      if (opt.correct === true) {
        done = true;
        b.classList.add("correct");
        for (const ob of opts.children) ob.disabled = true;
        feedback.innerHTML = "";
        feedback.appendChild(ui.callout("ok", "✓ 正确", spec.explain));
        state.markExercisePassed(lessonId, exId);
        srs.onCorrect(skillIds(skills));
        if (reviewing) setTimeout(() => mountChoice(box, spec, false), 900);
        else onExercisePassed(lessonId);
      } else {
        b.classList.add("wrong");
        b.disabled = true;
        srs.onWrong(skillIds(skills));
        feedback.innerHTML = "";
        feedback.appendChild(ui.callout("err", "✗ 再想想", spec.feedbackPerOption?.[i] || ""));
      }
    });
    opts.appendChild(b);
  });
  box.appendChild(opts);
  box.appendChild(feedback);
}

export function fillExercise(container, spec) {
  const box = ui.el("div", { class: "ex" });
  container.appendChild(box);
  mountFill(box, spec);
}

function mountFill(box, spec, reviewing = false) {
  const { lessonId, exId, skills = [] } = spec;
  skills.forEach((s) => srs.registerSkill(s.id, { label: s.label, lessonId }));

  if (state.exercisePassed(lessonId, exId) && !reviewing) {
    const due = skills.some((s) => srs.isDue(s.id));
    box.innerHTML = "";
    box.appendChild(ui.el("div", { class: "ex-prompt", html: spec.prompt }));
    box.appendChild(ui.callout("ok", due ? "✓ 已通过 · 到期待复习" : "✓ 已通过", spec.explain));
    box.appendChild(ui.el("button", {
      class: "btn btn-ghost small",
      text: due ? "复习此题" : "重新作答",
      onClick: () => mountFill(box, spec, true),
    }));
    return;
  }

  box.innerHTML = "";
  box.appendChild(ui.el("div", { class: "ex-prompt", html: spec.prompt }));
  const input = ui.el("input", { class: "ex-input", placeholder: spec.placeholder || "输入答案", value: "" });
  const submit = ui.el("button", { class: "btn btn-primary", text: "提交" });
  const row = ui.el("div", { class: "ex-fill-row" });
  row.append(input, submit);
  box.appendChild(row);
  const feedback = ui.el("div", { class: "ex-feedback" });
  box.appendChild(feedback);

  const norm = (s) => String(s).trim().toLowerCase().replace(/\s+/g, " ");
  function check() {
    const v = input.value.trim();
    if (!v) return;
    const ok = spec.accept.some((a) => norm(a) === norm(v));
    feedback.innerHTML = "";
    if (ok) {
      feedback.appendChild(ui.callout("ok", "✓ 正确", spec.explain));
      input.disabled = true;
      submit.disabled = true;
      state.markExercisePassed(lessonId, exId);
      srs.onCorrect(skillIds(skills));
      if (reviewing) setTimeout(() => mountFill(box, spec, false), 900);
      else onExercisePassed(lessonId);
    } else {
      srs.onWrong(skillIds(skills));
      feedback.appendChild(ui.callout("err", "✗ 再试试", ""));
    }
  }

  submit.addEventListener("click", check);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") check(); });
}

export function codeExercise(container, spec) {
  const box = ui.el("div", { class: "ex" });
  container.appendChild(box);
  mountCode(box, spec);
}

function mountCode(box, spec, reviewing = false) {
  const { lessonId, exId, skills = [], starter = "", tests = [], expectOutput = null, explain, height = "150px" } = spec;
  skills.forEach((s) => srs.registerSkill(s.id, { label: s.label, lessonId }));

  if (state.exercisePassed(lessonId, exId) && !reviewing) {
    const due = skills.some((s) => srs.isDue(s.id));
    box.innerHTML = "";
    box.appendChild(ui.el("div", { class: "ex-prompt", html: spec.prompt }));
    box.appendChild(ui.callout("ok", due ? "✓ 已通过 · 到期待复习" : "✓ 已通过", explain));
    box.appendChild(ui.el("button", {
      class: "btn btn-ghost small",
      text: due ? "复习此题" : "重新作答",
      onClick: () => mountCode(box, spec, true),
    }));
    return;
  }

  box.innerHTML = "";
  box.appendChild(ui.el("div", { class: "ex-prompt", html: spec.prompt }));
  const editorBox = ui.el("div", { class: "ex-editor" });
  editorBox.style.height = height;
  box.appendChild(editorBox);

  const btnRow = ui.el("div", { class: "ex-actions" });
  const checkBtn = ui.el("button", { class: "btn btn-primary", text: "检查答案" });
  const aiBtn = ui.el("button", { class: "btn btn-ghost small", text: "问 AI 助教" });
  const status = ui.el("span", { class: "ex-status" });
  btnRow.append(checkBtn, aiBtn, status);
  box.appendChild(btnRow);

  const result = ui.el("div", { class: "ex-result" });
  box.appendChild(result);

  const aiPanel = ui.el("div", { class: "ex-ai" });
  box.appendChild(aiPanel);

  let editor = null;
  let lastError = null;
  createEditor(editorBox, { initial: starter }).then((ed) => { editor = ed; });

  checkBtn.addEventListener("click", async () => {
    if (!editor) return;
    checkBtn.disabled = true;
    status.textContent = "运行中…";
    result.innerHTML = "";
    const code = editor.getValue();
    const r = await runCodeExercise({ code, tests, expectOutput });
    checkBtn.disabled = false;
    status.textContent = "";

    if (r.error) {
      srs.onWrong(skillIds(skills));
      lastError = r.error;
      errors.renderError(result, r.error);
      return;
    }
    if (r.passed) {
      state.markExercisePassed(lessonId, exId);
      srs.onCorrect(skillIds(skills));
      result.appendChild(ui.callout("ok", "✓ 全部通过", explain));
      if (reviewing) setTimeout(() => mountCode(box, spec, false), 900);
      else onExercisePassed(lessonId);
    } else {
      srs.onWrong(skillIds(skills));
      const list = ui.el("div", { class: "ex-tests" });
      for (const t of r.results) {
        list.appendChild(ui.el("div", {
          class: "ex-test " + (t.passed ? "ok" : "fail"),
          text: (t.passed ? "✓ " : "✗ ") + t.name + (t.message ? "　" + t.message : ""),
        }));
      }
      result.appendChild(list);
      result.appendChild(ui.el("div", { class: "ex-hint", text: "还没通过——改一下代码，再点「检查答案」。" }));
    }
  });

  aiBtn.addEventListener("click", async () => {
    if (!editor) return;
    aiPanel.innerHTML = "";
    aiBtn.disabled = true;
    aiPanel.appendChild(ui.el("div", { class: "ex-ai-loading", text: "AI 助教正在思考…" }));
    const plainPrompt = String(spec.prompt).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    const res = await ai.askAssistant({
      code: editor.getValue(),
      error: lastError,
      lessonTitle: getLesson(lessonId)?.title || "",
      prompt: plainPrompt,
    });
    aiBtn.disabled = false;
    aiPanel.innerHTML = "";
    if (res.ok) {
      aiPanel.appendChild(ui.el("div", { class: "ex-ai-reply", text: res.reply }));
    } else {
      aiPanel.appendChild(ui.callout("warn", "AI 助教", res.error));
    }
  });
}
