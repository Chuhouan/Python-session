// 第三单元：字符串（索引/切片、方法、f-string）
import { registerLesson } from "../router.js";
import * as ui from "../ui.js";
import { mountPlayground } from "../playground.js";
import { choiceExercise, codeExercise } from "../exercises.js";

registerLesson({
  id: "m3a",
  module: "m3",
  title: "索引与切片",
  titleEn: "Indexing & Slicing",
  subtitle: "第 3 单元 · 第 1 节",
  requires: ["m2c"],
  objectives: [
    { id: "index", label: "用 s[i] 取单个字符（从 0 开始）" },
    { id: "slice", label: "用 s[a:b] 截取子串（左闭右开）" },
  ],
  exercises: ["m3a-c1", "m3a-c2"],
  render(el) {
    ui.parts(el, [
      { type: "p", t: "字符串里的每个字符都有<b>编号（索引）</b>，从 0 开始。用方括号 <code>s[i]</code> 取第 i 个字符：" },
      { type: "code", code: "s = \"Python\"\nprint(s[0])   # P\nprint(s[1])   # y\nprint(s[-1])  # n（负数从右往左数）", caption: "索引从 0 开始，负数从末尾倒着数" },
      { type: "p", t: "想取<b>一段</b>子串，用切片 <code>s[起点:终点]</code>——<b>包含起点，不含终点</b>（左闭右开）：" },
      { type: "code", code: "s = \"Python\"\nprint(s[0:3])   # Pyt（第 0、1、2 个）\nprint(s[2:5])   # tho\nprint(s[:3])    # Pyt（省略起点 = 从头）\nprint(s[3:])    # hon（省略终点 = 到末尾）", caption: "切片：左闭右开" },
      { type: "callout", kind: "trap", title: "最容易错的一点", t: "<code>s[0:3]</code> 是前 3 个字符（0、1、2），<b>不是</b>第 0 到第 3 共 4 个。终点位置的字符不包含在内。" },
    ]);

    mountPlayground(el, { initial: 's = "hello"\nprint(s[1])\nprint(s[1:4])', label: "试试看" });

    choiceExercise(el, {
      lessonId: "m3a",
      exId: "m3a-c1",
      skills: [{ id: "str-index", label: "用索引取字符" }],
      prompt: "设 <code>s = \"abcde\"</code>，<code>s[2]</code> 是什么？",
      options: [
        { label: "c", correct: true },
        { label: "b" },
        { label: "d" },
        { label: "ab" },
      ],
      explain: "索引从 0 开始：s[0]='a'、s[1]='b'、<b>s[2]='c'</b>。",
      feedbackPerOption: {
        1: "那是 s[1]。",
        2: "那是 s[3]。",
        3: "切片 s[0:2] 才会得到多个字符。",
      },
    });

    codeExercise(el, {
      lessonId: "m3a",
      exId: "m3a-c2",
      skills: [{ id: "str-slice", label: "用切片截取子串" }],
      prompt: "设 <code>s = \"hello\"</code>，写代码输出 <code>s[1:4]</code> 的结果。",
      starter: "s = \"hello\"",
      expectOutput: "ell",
      explain: "<code>s[1:4]</code> 取索引 1、2、3 的字符：'e'、'l'、'l' → <code>ell</code>。",
    });
  },
});

registerLesson({
  id: "m3b",
  module: "m3",
  title: "字符串方法",
  titleEn: "String Methods",
  subtitle: "第 3 单元 · 第 2 节",
  requires: ["m3a"],
  objectives: [
    { id: "str-methods", label: "会用 upper/lower/strip/replace/split" },
    { id: "len", label: "用 len() 求长度" },
  ],
  exercises: ["m3b-c1", "m3b-c2"],
  render(el) {
    ui.parts(el, [
      { type: "p", t: "字符串自带很多<b>方法（method）</b>——写在字符串后面、用点 <code>.</code> 调用。注意方法末尾有括号 <code>()</code>：" },
      { type: "code", code: "s = \" Hello World \"\nprint(s.upper())      # \" HELLO WORLD \"\nprint(s.lower())      # \" hello world \"\nprint(s.strip())      # \"Hello World\"（去掉首尾空格）\nprint(s.replace(\"World\", \"Python\"))  # \" Hello Python \"", caption: "常用字符串方法" },
      { type: "p", t: "<code>split()</code> 把一个字符串按分隔符切成<b>列表</b>；<code>len()</code> 求字符串长度：" },
      { type: "code", code: "s = \"苹果,香蕉,橙子\"\nprint(s.split(\",\"))   # ['苹果', '香蕉', '橙子']\nprint(len(\"hello\"))   # 5", caption: "split 切分，len 求长度" },
      { type: "callout", kind: "key", title: "方法不改变原字符串", t: "字符串<b>不可变</b>：<code>s.upper()</code> 返回一个新字符串，<code>s</code> 本身不变。要保存结果就赋给变量：<code>t = s.upper()</code>。" },
    ]);

    mountPlayground(el, { initial: 's = "hello world"\nprint(s.title())\nprint(len(s))', label: "试试看" });

    choiceExercise(el, {
      lessonId: "m3b",
      exId: "m3b-c1",
      skills: [{ id: "str-methods", label: "用字符串方法" }],
      prompt: "哪个方法能把字符串全变成大写？",
      options: [
        { label: ".upper()", correct: true },
        { label: ".lower()" },
        { label: ".strip()" },
        { label: ".title()" },
      ],
      explain: "<code>\"hi\".upper()</code> → <code>\"HI\"</code>。",
      feedbackPerOption: {
        1: "那是变小写。",
        2: "那是去掉首尾空格。",
        3: "那是每个单词首字母大写。",
      },
    });

    codeExercise(el, {
      lessonId: "m3b",
      exId: "m3b-c2",
      skills: [{ id: "str-methods", label: "用字符串方法" }],
      prompt: "设 <code>s = \" Hello \"</code>，写代码输出去掉首尾空格后的结果（Hello）。",
      starter: 's = " Hello "',
      expectOutput: "Hello",
      explain: "<code>print(s.strip())</code> —— strip 去掉首尾空格。",
    });
  },
});

registerLesson({
  id: "m3c",
  module: "m3",
  title: "f-string 格式化",
  titleEn: "f-strings",
  subtitle: "第 3 单元 · 第 3 节",
  requires: ["m3b"],
  objectives: [
    { id: "fstring", label: "用 f\"...{变量}...\" 拼接字符串" },
  ],
  exercises: ["m3c-c1", "m3c-c2"],
  render(el) {
    ui.parts(el, [
      { type: "p", t: "想把变量的值插进一句话里，最方便的是 <b>f-string</b>：在字符串前面加字母 <code>f</code>，用花括号 <code>{}</code> 包住变量名。" },
      { type: "code", code: "name = \"小明\"\nage = 20\nprint(f\"我叫{name}，今年{age}岁\")\n# 输出：我叫小明，今年20岁", caption: "f-string 把变量塞进句子" },
      { type: "p", t: "花括号里还能放表达式（算式、方法调用等）：" },
      { type: "code", code: "a = 3\nb = 5\nprint(f\"{a} + {b} = {a + b}\")\n# 输出：3 + 5 = 8", caption: "花括号里可以写算式" },
      { type: "callout", kind: "key", title: "别忘了 f", t: "没有开头的 <code>f</code>，<code>\"我叫{name}\"</code> 会原样输出「我叫{name}」，不会替换。f 一定写在引号<b>前面</b>。" },
      { type: "p", t: "老式写法是 <code>\"我叫\" + name + \"岁\"</code>，容易漏加号或空格；f-string 更清晰，优先用。" },
    ]);

    mountPlayground(el, { initial: 'city = "上海"\nprint(f"我在{city}生活")', label: "试试看" });

    choiceExercise(el, {
      lessonId: "m3c",
      exId: "m3c-c1",
      skills: [{ id: "fstring", label: "用 f-string 拼字符串" }],
      prompt: "设 <code>name = \"小美\"</code>，哪个能输出「我是小美」？",
      options: [
        { label: 'print(f"我是{name}")', correct: true },
        { label: 'print("我是{name}")' },
        { label: 'print("我是" + name)' },
        { label: 'print(f"我是name")' },
      ],
      explain: "<code>f\"我是{name}\"</code> —— 花括号里的 name 会被替换成「小美」。",
      feedbackPerOption: {
        1: "少了 f，{name} 不会被替换。",
        2: "这个其实也能输出「我是小美」！但题目问的是 f-string 写法。",
        3: "花括号里写的是变量名，不能写死成 name 两字。",
      },
    });

    codeExercise(el, {
      lessonId: "m3c",
      exId: "m3c-c2",
      skills: [{ id: "fstring", label: "用 f-string 拼字符串" }],
      prompt: "设变量 <code>year = 2026</code>，用 f-string 输出「今年是2026年」。",
      starter: "year = 2026",
      expectOutput: "今年是2026年",
      explain: "<code>print(f\"今年是{year}年\")</code> —— 花括号里的 year 会被替换成 2026。",
    });
  },
});
