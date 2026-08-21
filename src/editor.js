// 自包含代码编辑器：行号 + 等宽 + Tab 缩进，零外部依赖（可靠、无 CDN 依赖地狱）
import * as ui from "./ui.js";

export async function createEditor(container, { initial = "", onChange } = {}) {
  const wrap = ui.el("div", { class: "code-editor" });
  const gutter = ui.el("div", { class: "ce-gutter", "aria-hidden": "true" });
  const ta = ui.el("textarea", {
    class: "ce-input",
    spellcheck: "false",
    autocapitalize: "off",
    autocomplete: "off",
    autocorrect: "off",
    wrap: "off",
  });
  wrap.append(gutter, ta);
  container.appendChild(wrap);
  ta.value = initial;

  function syncGutter() {
    const n = ta.value.split("\n").length;
    const nums = [];
    for (let i = 1; i <= n; i++) nums.push(i);
    gutter.textContent = nums.join("\n");
  }
  function syncScroll() { gutter.scrollTop = ta.scrollTop; }

  ta.addEventListener("input", () => { syncGutter(); if (onChange) onChange(ta.value); });
  ta.addEventListener("scroll", syncScroll);
  ta.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const s = ta.selectionStart, en = ta.selectionEnd;
      ta.setRangeText("    ", s, en, "end");
      ta.dispatchEvent(new Event("input", { bubbles: true }));
    }
  });

  syncGutter();
  await Promise.resolve(); // 保持 async 接口，调用方可用 .then

  return {
    getValue: () => ta.value,
    setValue: (v) => { ta.value = v; syncGutter(); syncScroll(); },
    focus: () => ta.focus(),
    highlightLine: () => {}, // 预留：报错行高亮（后续里程碑）
    textarea: ta,
  };
}
