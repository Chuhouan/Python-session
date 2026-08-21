// 路由与解锁：课程注册表 + 模块目录 + 单一 canOpen 门禁 + 导航
import * as state from "./state.js";
import * as ui from "./ui.js";
import * as srs from "./srs.js";

const lessons = new Map();   // id -> lesson 对象
const modules = [];          // [{ id, title, titleEn, lessons: [id...] }]
let currentId = null;
let onChange = null;

export function registerLesson(lesson) {
  lessons.set(lesson.id, lesson);
}

export function registerModule(mod) {
  modules.push(mod);
}

export function getModules() { return modules; }
export function getLesson(id) { return lessons.get(id); }
export function getCurrent() { return currentId; }
export function setOnChange(fn) { onChange = fn; }

// 单一门禁：所有入口（侧栏/上一节/下一节/深链）都走这里
export function canOpen(id) {
  const l = lessons.get(id);
  if (!l) return false;
  return (l.requires || []).every((r) => state.isPassed(r));
}

export function go(id) {
  const l = lessons.get(id);
  if (!l) return;
  if (!canOpen(id)) {
    ui.toast("这一节还没解锁，先通过前面几节。", "warn");
    return;
  }
  currentId = id;
  state.markSeen(id);
  render();
  if (onChange) onChange(id);
}

export function refresh() { render(); }

// 某道练习通过后调用：若本节所有练习都通过，则本节通过并解锁下一节
export function onExercisePassed(lessonId) {
  const l = lessons.get(lessonId);
  if (!l) return;
  const exIds = l.exercises || [];
  const allPassed = exIds.length > 0 && exIds.every((exId) => state.exercisePassed(lessonId, exId));
  if (allPassed && !state.isPassed(lessonId)) {
    state.setPassed(lessonId, true);
    ui.toast("本节练习全部通过，完成！", "ok");
    render();
  }
}

export function init() {
  const ids = orderedIds();
  const first = ids.find((id) => canOpen(id)) || ids[0];
  if (first) {
    currentId = first;
    state.markSeen(first);
  }
  render();
  wireSidebar();
}

function wireSidebar() {
  const reviewBtn = document.getElementById("btn-review");
  if (reviewBtn) reviewBtn.addEventListener("click", showReviewModal);
  const settingsBtn = document.getElementById("btn-settings");
  if (settingsBtn) settingsBtn.addEventListener("click", showSettingsModal);
  const exportBtn = document.getElementById("btn-export");
  if (exportBtn) exportBtn.addEventListener("click", doExport);
  const importBtn = document.getElementById("btn-import");
  if (importBtn) importBtn.addEventListener("click", doImport);
}

function showSettingsModal() {
  const box = ui.openModal();
  box.appendChild(ui.el("h3", { class: "modal-title", text: "设置" }));
  box.appendChild(ui.el("p", { class: "modal-text", text: "AI 助教需要 DeepSeek API 密钥。密钥只存在你浏览器的本地存储里，不会上传到任何服务器。" }));
  box.appendChild(ui.el("label", { class: "modal-label", text: "DeepSeek API 密钥" }));
  const input = ui.el("input", { class: "ex-input", type: "password", placeholder: "sk-...", value: state.getSettings().apiKey || "" });
  const row = ui.el("div", { class: "modal-actions" });
  const cancel = ui.el("button", { class: "btn btn-ghost", text: "取消" });
  const save = ui.el("button", { class: "btn btn-primary", text: "保存" });
  row.append(cancel, save);
  box.append(input, row);
  save.addEventListener("click", () => {
    state.setSetting("apiKey", input.value.trim());
    document.querySelector(".modal-overlay")?.remove();
    ui.toast("已保存设置", "ok");
  });
  cancel.addEventListener("click", () => document.querySelector(".modal-overlay")?.remove());
}

function doExport() {
  const blob = new Blob([state.exportData()], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "python-course-progress.json";
  a.click();
  URL.revokeObjectURL(url);
  ui.toast("进度已导出", "ok");
}

function doImport() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/json,.json";
  input.addEventListener("change", () => {
    const file = input.files && input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        state.importData(String(reader.result));
        ui.toast("进度已导入", "ok");
        render();
      } catch (e) {
        ui.toast("导入失败：" + e.message, "err");
      }
    };
    reader.readAsText(file);
  });
  input.click();
}

function showReviewModal() {
  const due = srs.dueSkills();
  const box = ui.openModal();
  box.appendChild(ui.el("h3", { class: "modal-title", text: "待复习" }));
  if (!due.length) {
    box.appendChild(ui.el("p", { class: "modal-text", text: "现在没有到期的知识点，干得漂亮！" }));
    return;
  }
  box.appendChild(ui.el("p", { class: "modal-text", text: "下面这些知识点到期了，点「去复习」到对应小节重新作答。" }));
  const list = ui.el("div", { class: "review-list" });
  for (const id of due) {
    const meta = srs.getSkillMeta(id) || {};
    const row = ui.el("div", { class: "review-item" });
    row.appendChild(ui.el("div", { class: "review-item-label", text: meta.label || id }));
    if (meta.lessonId && lessons.get(meta.lessonId)) {
      row.appendChild(ui.el("button", {
        class: "btn btn-ghost small",
        text: "去复习",
        onClick: () => { document.querySelector(".modal-overlay")?.remove(); go(meta.lessonId); },
      }));
    }
    list.appendChild(row);
  }
  box.appendChild(list);
}

function orderedIds() {
  const ids = [];
  for (const m of modules) for (const id of m.lessons) ids.push(id);
  return ids;
}

function statusOf(id) {
  if (id === currentId) return "current";
  if (state.isPassed(id)) return "done";
  if (!canOpen(id)) return "locked";
  return "avail";
}

function render() {
  renderSidebar();
  renderContent();
}

function renderSidebar() {
  const tree = document.getElementById("mod-tree");
  ui.clear(tree);
  for (const m of modules) {
    const group = ui.el("div", { class: "mod-group" });
    group.appendChild(ui.el("div", { class: "mod-title" }, [
      ui.el("span", { class: "mod-title-cn", text: m.title }),
      m.titleEn ? ui.el("span", { class: "mod-title-en", text: m.titleEn }) : null,
    ]));
    for (const id of m.lessons) {
      const lesson = lessons.get(id);
      if (!lesson) continue;
      const status = statusOf(id);
      const item = ui.el("button", {
        class: "mod-item " + status,
        onClick: () => go(id),
      }, [
        ui.el("span", { class: "mod-item-dot" }),
        ui.el("span", { class: "mod-item-label", text: lesson.title }),
        status === "done" ? ui.el("span", { class: "mod-item-ok", text: "✓" }) : null,
        status === "locked" ? ui.el("span", { class: "mod-item-lock", text: "🔒" }) : null,
      ]);
      group.appendChild(item);
    }
    tree.appendChild(group);
  }
  updateProgress();
}

function updateProgress() {
  const ids = orderedIds();
  const total = ids.length || 1;
  const passed = ids.filter((id) => state.isPassed(id)).length;
  const pct = Math.round((passed / total) * 100);

  const pctEl = document.getElementById("prog-pct");
  const barEl = document.getElementById("prog-bar");
  const metaEl = document.getElementById("prog-meta");
  const rcEl = document.getElementById("review-count");
  if (pctEl) pctEl.textContent = pct + "%";
  if (barEl) barEl.style.width = pct + "%";
  if (metaEl) metaEl.textContent = `已通过 ${passed} / ${total} 节`;
  if (rcEl) rcEl.textContent = srs.reviewCount();
}

function renderContent() {
  const c = document.getElementById("content");
  ui.clear(c);
  const l = lessons.get(currentId);
  if (!l) return;

  const header = ui.el("header", { class: "lesson-header" });
  if (l.subtitle) header.appendChild(ui.el("div", { class: "lesson-kicker", text: l.subtitle }));
  const h1 = ui.el("h1", { class: "lesson-title" }, [ui.el("span", { text: l.title })]);
  if (l.titleEn) h1.appendChild(ui.el("span", { class: "lesson-title-en", text: l.titleEn }));
  header.appendChild(h1);

  if (l.objectives && l.objectives.length) {
    const ob = ui.el("div", { class: "objectives" });
    ob.appendChild(ui.el("div", { class: "objectives-label", text: "本节目标 · What you'll learn" }));
    const ul = ui.el("ul", { class: "objectives-list" });
    for (const o of l.objectives) ul.appendChild(ui.el("li", { text: "· " + o.label }));
    ob.appendChild(ul);
    header.appendChild(ob);
  }
  c.appendChild(header);

  const body = ui.el("div", { class: "lesson-body" });
  c.appendChild(body);
  try {
    l.render(body);
  } catch (e) {
    body.appendChild(ui.callout("err", "本节渲染出错", String(e)));
    console.error(e);
  }

  c.appendChild(buildNav());
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function buildNav() {
  const ids = orderedIds();
  const i = ids.indexOf(currentId);
  const prevId = i > 0 ? ids[i - 1] : null;
  const nextId = i >= 0 && i < ids.length - 1 ? ids[i + 1] : null;

  const nav = ui.el("nav", { class: "lesson-nav" });
  nav.appendChild(prevId
    ? ui.el("button", { class: "btn btn-ghost", onClick: () => go(prevId), text: "← 上一节" })
    : ui.el("span"));
  nav.appendChild(nextId
    ? ui.el("button", {
        class: "btn " + (canOpen(nextId) ? "btn-primary" : "btn-ghost"),
        onClick: () => go(nextId),
        text: "下一节 →",
      })
    : ui.el("span", { class: "lesson-nav-end", text: "这是最后一节" }));
  return nav;
}
