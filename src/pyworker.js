// 经典 Worker：importScripts 加载 Pyodide UMD，带 CDN 回退
const VERSION = "0.29.4";
const BASES = [
  `https://cdn.jsdelivr.net/pyodide/v${VERSION}/full/`,
  `https://gcore.jsdelivr.net/pyodide/v${VERSION}/full/`,
];

let BASE = null;
let loadError = null;
for (const b of BASES) {
  try {
    importScripts(b + "pyodide.js");
    BASE = b;
    break;
  } catch (e) {
    loadError = String(e);
  }
}

let pyodide = null;
let initPromise = null;

function ensureLoaded() {
  if (pyodide) return Promise.resolve(pyodide);
  if (!BASE) return Promise.reject(new Error(loadError || "Pyodide 脚本加载失败"));
  if (!initPromise) {
    initPromise = loadPyodide({ indexURL: BASE })
      .then((py) => { pyodide = py; return py; })
      .catch((e) => { loadError = String(e); throw e; });
  }
  return initPromise;
}

self.onmessage = async (e) => {
  const msg = e.data || {};

  if (msg.type === "init") {
    try {
      await ensureLoaded();
      self.postMessage({ type: "ready" });
    } catch (err) {
      self.postMessage({ type: "initError", error: "Python 环境加载失败：" + String(err) });
    }
    return;
  }

  if (msg.type === "run") {
    try {
      const py = await ensureLoaded();
      const globals = py.toPy({ __name__: "__main__" });
      try {
        const stdout = [];
        const stderr = [];
        py.setStdout({ batched: (s) => { stdout.push(s); self.postMessage({ type: "stdout", id: msg.id, line: s }); } });
        py.setStderr({ batched: (s) => { stderr.push(s); self.postMessage({ type: "stderr", id: msg.id, line: s }); } });

        let error = null;
        try {
          await py.runPythonAsync(msg.code, { globals });
        } catch (err) {
          error = String(err);
        }

        // 测试代码（与用户代码同命名空间，用于断言类测试）
        let testStdout = "";
        if (!error && msg.testCode) {
          const testOut = [];
          py.setStdout({ batched: (s) => { testOut.push(s); } });
          try {
            await py.runPythonAsync(msg.testCode, { globals });
          } catch (err) {
            error = "测试运行出错：" + String(err);
          }
          testStdout = testOut.join("\n");
        }

        self.postMessage({ type: "done", id: msg.id, stdout: stdout.join("\n"), stderr: stderr.join("\n"), error, testStdout });
      } finally {
        if (globals && typeof globals.destroy === "function") globals.destroy();
      }
    } catch (err) {
      self.postMessage({ type: "error", id: msg.id, error: "运行时初始化失败：" + String(err), stdout: "", stderr: "", testStdout: "" });
    }
  }
};
