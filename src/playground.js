// 交互代码单元：编辑器 + 运行按钮 + 深色终端输出
import * as ui from "./ui.js";
import { createEditor } from "./editor.js";
import { runPython, stopPython, whenReady } from "./runtime.js";
import * as errors from "./errors.js";

export function mountPlayground(container, { initial = "", height = "200px" } = {}) {
  const pg = ui.el("div", { class: "playground" });

  const toolbar = ui.el("div", { class: "pg-toolbar" });
  const runBtn = ui.el("button", { class: "btn btn-primary pg-run", text: "▶ 运行" });
  const stopBtn = ui.el("button", { class: "btn btn-ghost pg-stop", text: "停止" });
  const status = ui.el("span", { class: "pg-status" });
  toolbar.append(runBtn, stopBtn, status);

  const editorBox = ui.el("div", { class: "pg-editor" });
  editorBox.style.height = height;

  const term = ui.el("div", { class: "pg-terminal", "aria-live": "polite" });
  pg.append(toolbar, editorBox, term);
  container.appendChild(pg);

  let editor = null;
  let running = false;

  createEditor(editorBox, { initial })
    .then((ed) => { editor = ed; })
    .catch((e) => {
      editorBox.appendChild(ui.el("div", { class: "pg-editor-error", text: "编辑器加载失败：" + String(e) }));
      runBtn.disabled = true;
    });

  const clearTerm = () => { term.innerHTML = ""; };
  const writeLine = (kind, text) => {
    term.appendChild(ui.el("div", { class: "t-" + kind, text: text }));
    term.scrollTop = term.scrollHeight;
  };

  async function run() {
    if (running || !editor) return;
    running = true;
    runBtn.disabled = true;
    stopBtn.disabled = false;
    clearTerm();
    status.textContent = "加载 Python 环境…";
    const code = editor.getValue();
    try {
      await whenReady(); // 首次会下载 Python 运行时，需几秒
      status.textContent = "运行中…";
      const res = await runPython(code, {
        onOutput: (kind, line) => writeLine(kind, line),
      });
      if (res.error) {
        writeLine("err", res.error);
        const t = errors.translateError(res.error);
        writeLine("info", "💡 " + t.title + "：" + t.zh + " " + t.fix);
        status.textContent = "出错";
      } else if (!res.stdout && !res.stderr) {
        writeLine("info", "（程序运行结束，没有输出。试试用 print() 输出点什么。）");
        status.textContent = "完成";
      } else {
        status.textContent = "完成";
      }
    } catch (e) {
      writeLine("err", String(e));
      status.textContent = "出错";
    } finally {
      running = false;
      runBtn.disabled = false;
      stopBtn.disabled = true;
    }
  }

  runBtn.addEventListener("click", run);
  stopBtn.addEventListener("click", () => {
    stopPython();
    writeLine("info", "已停止");
    status.textContent = "已停止";
    running = false;
    runBtn.disabled = false;
    stopBtn.disabled = true;
  });
  stopBtn.disabled = true;

  return { getValue: () => editor?.getValue() ?? "", run };
}
