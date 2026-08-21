// 代码题判分：构建测试 harness，运行后解析结果；支持断言测试与 stdout 比对
import { runPython } from "./runtime.js";

const MARKER = "__PYCOURSE_RESULT__";

function buildHarness(tests) {
  const L = ["import json as _json", "_r = []"];
  for (const t of tests) {
    const name = JSON.stringify(t.name || "测试");
    L.push("try:");
    L.push(`    assert (${t.expr}), ${name}`);
    L.push(`    _r.append({"name": ${name}, "passed": True})`);
    L.push("except Exception as _e:");
    L.push(`    _r.append({"name": ${name}, "passed": False, "message": str(_e)})`);
  }
  L.push(`print("${MARKER}" + _json.dumps(_r, ensure_ascii=False))`);
  return L.join("\n");
}

function parseTestStdout(s) {
  const i = s.lastIndexOf(MARKER);
  if (i < 0) return null;
  try {
    return JSON.parse(s.slice(i + MARKER.length).trim());
  } catch (e) {
    return null;
  }
}

// tests: [{ name, expr }]（Python 布尔表达式，须为真）
// expectOutput: 期望的 stdout（trim 后精确匹配），可选
export async function runCodeExercise({ code, tests = [], expectOutput = null }) {
  const testCode = tests.length ? buildHarness(tests) : null;
  const res = await runPython(code, { testCode });

  if (res.error) {
    return { passed: false, error: res.error, results: [], stdout: res.stdout || "" };
  }

  const results = [];
  if (tests.length) {
    const parsed = parseTestStdout(res.testStdout || "");
    if (parsed && Array.isArray(parsed)) {
      results.push(...parsed);
    } else {
      results.push({ name: "测试", passed: false, message: "测试结果解析失败" });
    }
  }
  if (expectOutput !== null && expectOutput !== undefined) {
    const actual = (res.stdout || "").trim();
    const exp = String(expectOutput).trim();
    results.push({
      name: "输出",
      passed: actual === exp,
      message: actual === exp ? "" : `期望输出 ${JSON.stringify(exp)}，实际输出 ${JSON.stringify(actual)}`,
    });
  }

  const passed = results.length > 0 && results.every((r) => r.passed);
  return { passed, error: null, results, stdout: res.stdout || "" };
}
