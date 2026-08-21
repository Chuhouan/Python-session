// 第四单元：输入输出（print 进阶、input 概念）
import { registerLesson } from "../router.js";
import * as ui from "../ui.js";
import { mountPlayground } from "../playground.js";
import { choiceExercise, codeExercise } from "../exercises.js";

registerLesson({
  id: "m4a",
  module: "m4",
  title: "print 进阶",
  titleEn: "Print in Depth",
  subtitle: "第 4 单元 · 第 1 节",
  requires: ["m3c"],
  objectives: [
    { id: "print-multi", label: "print 一次输出多个值" },
    { id: "print-sep-end", label: "会用 sep 和 end 参数" },
  ],
  exercises: ["m4a-c1", "m4a-c2"],
  render(el) {
    ui.parts(el, [
      { type: "p", t: "<code>print()</code> 一次可以输出<b>多个</b>值，用逗号隔开，默认用空格分开：" },
      { type: "code", code: "print(\"苹果\", \"香蕉\", \"橙子\")\n# 输出：苹果 香蕉 橙子", caption: "逗号分隔，默认空格连接" },
      { type: "p", t: "两个常用参数：<code>sep</code>（多个值之间的分隔符）和 <code>end</code>（结尾字符，默认换行）：" },
      { type: "code", code: "print(\"a\", \"b\", \"c\", sep=\"-\")   # a-b-c\nprint(\"你好\", end=\"！\")       # 你好！\nprint(\"接下来\")                 # 接在上一行后面", caption: "sep 改分隔符，end 改结尾" },
      { type: "callout", kind: "key", title: "end 默认换行", t: "print 默认在结尾加一个换行，所以每次输出都另起一行。想不换行就设 <code>end=\"\"</code>（空字符串）。" },
    ]);

    mountPlayground(el, { initial: 'print("1", "2", "3", sep=",")\nprint("你好", end="！")\nprint("世界")', label: "试试看" });

    choiceExercise(el, {
      lessonId: "m4a",
      exId: "m4a-c1",
      skills: [{ id: "print-sep-end", label: "用 print 的 sep/end" }],
      prompt: "<code>print(\"a\", \"b\", sep=\"-\")</code> 输出什么？",
      options: [
        { label: "a-b", correct: true },
        { label: "a b" },
        { label: "ab" },
        { label: "a-b-c" },
      ],
      explain: "<code>sep=\"-\"</code> 把两个值用短横线连起来 → <code>a-b</code>。",
      feedbackPerOption: {
        1: "那是默认的 sep=\" \"（空格）。",
        2: "没指定 sep 时默认是空格，不会是 ab。",
        3: "只有两个值，没有 c。",
      },
    });

    codeExercise(el, {
      lessonId: "m4a",
      exId: "m4a-c2",
      skills: [{ id: "print-sep-end", label: "用 print 的 sep/end" }],
      prompt: "写代码输出 <code>1+2+3</code>（数字 1、2、3 之间用加号连接）。",
      starter: "",
      expectOutput: "1+2+3",
      explain: "<code>print(1, 2, 3, sep=\"+\")</code> —— 三个数字用「+」分隔。",
    });
  },
});

registerLesson({
  id: "m4b",
  module: "m4",
  title: "输入 input()",
  titleEn: "User Input",
  subtitle: "第 4 单元 · 第 2 节",
  requires: ["m4a"],
  objectives: [
    { id: "input-str", label: "理解 input() 返回的是字符串" },
    { id: "input-convert", label: "输入数字时用 int() 转换" },
  ],
  exercises: ["m4b-c1", "m4b-c2"],
  render(el) {
    ui.parts(el, [
      { type: "p", t: "<code>input()</code> 让程序<b>等待用户输入</b>，返回用户输入的内容。它返回的<b>永远是字符串</b>：" },
      { type: "code", code: "name = input(\"你叫什么名字？\")\nprint(f\"你好，{name}\")\n# 运行时输入「小明」，输出：你好，小明", caption: "input 读取一行输入" },
      { type: "callout", kind: "trap", title: "输入数字要转换", t: "<code>age = input(\"年龄：\")</code> 得到的是字符串 <code>\"20\"</code>，不是数字 20。要算年龄得先转：<code>age = int(input(\"年龄：\"))</code>。" },
      { type: "callout", kind: "warn", title: "浏览器环境的限制", t: "本站在<b>浏览器里</b>运行 Python，<code>input()</code> 会卡住（浏览器没有命令行让你打字）。所以练习里我们用<b>直接给变量赋值</b>来模拟输入，你在本地写真实程序时再放心用 input()。" },
      { type: "p", t: "这个知识点要记住的是：<b>input 返回字符串，数字要 int() 转换</b>——这个坑在实际编程里很常见。" },
    ]);

    choiceExercise(el, {
      lessonId: "m4b",
      exId: "m4b-c1",
      skills: [{ id: "input-str", label: "理解 input 返回字符串" }],
      prompt: "用户输入了 20，<code>age = input(\"年龄：\")</code> 之后，<code>age</code> 是什么类型？",
      options: [
        { label: "字符串 str", correct: true },
        { label: "整数 int" },
        { label: "小数 float" },
        { label: "布尔 bool" },
      ],
      explain: "input() <b>永远返回字符串</b>，即 \"20\"。要算数就得 <code>int(age)</code>。",
      feedbackPerOption: {
        1: "虽然输入的是数字，但类型是字符串。",
        2: "不会是小数。",
        3: "不会是布尔。",
      },
    });

    codeExercise(el, {
      lessonId: "m4b",
      exId: "m4b-c2",
      skills: [{ id: "input-convert", label: "把输入转成数字" }],
      prompt: "假设用户输入的字符串存在变量 <code>s</code>（值为 \"15\"）。写代码把它转成整数后加 10，输出 25。",
      starter: 's = "15"',
      expectOutput: "25",
      explain: "<code>print(int(s) + 10)</code> —— int(s) 转成 15，加 10 得 25。",
    });
  },
});
