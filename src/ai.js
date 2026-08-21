// AI 助教：DeepSeek 浏览器直连（OpenAI 兼容接口），密钥存 localStorage 设置
import * as state from "./state.js";

const ENDPOINT = "https://api.deepseek.com/chat/completions";
const MODEL = "deepseek-chat"; // 若失效可改为 deepseek-v4-flash

const SYSTEM = "你是零基础 Python 学习的 AI 助教。用简体中文回答，保留英文术语（如 print、变量名）。引导学习者自己思考，不直接给完整答案：先指出问题所在，再给一个提示，最后问一个引导性问题。回答控制在 200 字以内。"

export async function askAssistant({ code, error, lessonTitle, prompt }) {
  const key = (state.getSettings().apiKey || "").trim();
  if (!key) {
    return { ok: false, error: "还没设置 API 密钥。点左侧「设置」填入你的 DeepSeek 密钥。" };
  }

  const user = [
    `我正在学：${lessonTitle || "Python 基础"}`,
    prompt ? `题目：${prompt}` : "",
    `我的代码：\n\`\`\`python\n${code}\n\`\`\``,
    error ? `运行报错：\n${error}` : "",
  ].filter(Boolean).join("\n\n");

  try {
    const resp = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + key,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: SYSTEM },
          { role: "user", content: user },
        ],
        max_tokens: 600,
        stream: false,
      }),
    });
    if (!resp.ok) {
      const txt = await resp.text().catch(() => "");
      return { ok: false, error: `请求失败（HTTP ${resp.status}）${txt.slice(0, 200)}` };
    }
    const data = await resp.json();
    const reply = data?.choices?.[0]?.message?.content || "";
    return reply ? { ok: true, reply } : { ok: false, error: "没有收到回复。" };
  } catch (e) {
    return { ok: false, error: "网络错误：" + String(e) };
  }
}
