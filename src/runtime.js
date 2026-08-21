// Python 运行时宿主：管理 Web Worker 生命周期，提供 runPython / stopPython / whenReady
let worker = null;
let readyPromise = null;
let runSeq = 0;
const pending = new Map(); // runId -> { resolve, timer, onOutput }

function ensureWorker() {
  if (worker) return;
  worker = new Worker(new URL("./pyworker.js", import.meta.url));
  readyPromise = new Promise((resolve, reject) => {
    worker.onmessage = (e) => {
      const m = e.data || {};
      if (m.type === "ready") resolve();
      else if (m.type === "initError") reject(new Error(m.error));
      else dispatch(m);
    };
    worker.onerror = (e) => {
      reject(new Error("Worker 错误：" + (e.message || e.filename || "未知")));
    };
  });
  worker.postMessage({ type: "init" });
}

function dispatch(m) {
  if (m.type === "stdout" || m.type === "stderr") {
    const p = pending.get(m.id);
    if (p && p.onOutput) p.onOutput(m.type === "stdout" ? "out" : "err", m.line);
    return;
  }
  if (m.type === "done" || m.type === "error") {
    const p = pending.get(m.id);
    if (!p) return;
    pending.delete(m.id);
    clearTimeout(p.timer);
    p.resolve({
      stdout: m.stdout ?? "",
      stderr: m.stderr ?? "",
      error: m.error ?? null,
      timedOut: false,
      testStdout: m.testStdout ?? "",
    });
  }
}

export function whenReady() {
  ensureWorker();
  return readyPromise;
}

export function runPython(code, { onOutput, testCode, timeoutMs = 10000 } = {}) {
  ensureWorker();
  return readyPromise.then(() => new Promise((resolve) => {
    const id = ++runSeq;
    const timer = setTimeout(() => {
      pending.delete(id);
      killWorker();
      resolve({ stdout: "", stderr: "", error: "运行超时（可能有死循环），已自动停止。", timedOut: true, testStdout: "" });
    }, timeoutMs);
    pending.set(id, { resolve, timer, onOutput });
    worker.postMessage({ type: "run", id, code, testCode: testCode || null });
  }));
}

export function stopPython() {
  killWorker();
}

function killWorker() {
  for (const p of pending.values()) {
    clearTimeout(p.timer);
    p.resolve({ stdout: "", stderr: "", error: "已停止", timedOut: true });
  }
  pending.clear();
  if (worker) {
    worker.terminate();
    worker = null;
    readyPromise = null;
  }
}
