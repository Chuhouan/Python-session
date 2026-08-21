// 新手友好报错翻译：把 Python Traceback 翻译成中英对照的「是什么 / 怎么改」
import * as ui from "./ui.js";

const RULES = [
  {
    re: /NameError: name '(.+?)' is not defined/,
    title: "NameError · 名字错误",
    zh: (m) => `你用到了还没定义的变量或名字「${m[1]}」。`,
    fix: "检查是否拼写错了，或者是否在给它赋值之前就用了它。",
  },
  {
    re: /SyntaxError: (.+)/,
    title: "SyntaxError · 语法错误",
    zh: (m) => `Python 读不懂你这行代码。${m[1]}`,
    fix: "常见原因：字符串少了引号、if / for / def 结尾少了冒号、括号没配对。",
  },
  {
    re: /IndentationError: (.+)/,
    title: "IndentationError · 缩进错误",
    zh: (m) => `行首缩进（空格）不对。${m[1]}`,
    fix: "Python 靠缩进区分代码块：同一块的代码要对齐，子块统一缩进 4 个空格。",
  },
  {
    re: /TypeError: (.+)/,
    title: "TypeError · 类型错误",
    zh: (m) => `类型用错了。${m[1]}`,
    fix: "最常见：把字符串和数字直接相加，或把数字当成函数调用。检查两边的类型。",
  },
  {
    re: /ValueError: (.+)/,
    title: "ValueError · 值错误",
    zh: (m) => `值的类型对，但内容不对。${m[1]}`,
    fix: '例如 int("abc")——"abc" 不是数字，没法转成整数。',
  },
  {
    re: /ZeroDivisionError/,
    title: "ZeroDivisionError · 除以零",
    zh: () => "你让程序除以了 0。",
    fix: "数学上不能除以 0。检查除数有没有可能为 0。",
  },
  {
    re: /IndexError: (.+)/,
    title: "IndexError · 下标越界",
    zh: (m) => `索引（下标）超出了范围。${m[1]}`,
    fix: "列表和字符串的索引从 0 开始，最后一个的索引是「长度 - 1」。",
  },
  {
    re: /KeyError: (.+)/,
    title: "KeyError · 键不存在",
    zh: (m) => `字典里没有这个键 ${m[1]}。`,
    fix: "检查键名是否拼写正确、是否真的存在。",
  },
  {
    re: /AttributeError: (.+)/,
    title: "AttributeError · 属性错误",
    zh: (m) => `这个对象没有你调用的方法或属性。${m[1]}`,
    fix: "常见是方法名拼错，比如 str.uppercase 应为 str.upper。",
  },
  {
    re: /EOFError/,
    title: "EOFError · 输入结束",
    zh: () => "input() 在等输入时，输入已经用完了。",
    fix: "浏览器环境里 input() 较难用，练习里优先用变量和 print。",
  },
];

export function translateError(errStr) {
  const s = String(errStr || "");
  const lines = s.trim().split("\n").filter((l) => l.trim());
  const last = lines[lines.length - 1] || s;
  for (const r of RULES) {
    const m = last.match(r.re);
    if (m) return { title: r.title, zh: r.zh(m), fix: r.fix, original: last };
  }
  return {
    title: last.split(":")[0] || "错误",
    zh: "程序运行时报错了。",
    fix: "看最后一行英文，它说明了发生了什么；再对照代码找到对应位置。",
    original: last,
  };
}

export function renderError(el, errStr) {
  const t = translateError(errStr);
  el.appendChild(ui.callout(
    "err",
    t.title,
    `${ui.escapeHtml(t.zh)}<br><b>英文原文</b>：<code>${ui.escapeHtml(t.original)}</code><br><b>怎么改</b>：${ui.escapeHtml(t.fix)}`,
  ));
}
