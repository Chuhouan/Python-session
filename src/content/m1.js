// 第一单元：起步（print + 变量）
import { registerLesson } from "../router.js";
import * as ui from "../ui.js";
import { mountPlayground } from "../playground.js";
import { choiceExercise, codeExercise, fillExercise } from "../exercises.js";

registerLesson({
  id: "m1a",
  module: "m1",
  title: "你好，Python",
  titleEn: "Hello, Python",
  subtitle: "第 1 单元 · 第 1 节",
  requires: [],
  objectives: [
    { id: "run-print", label: "知道一行 print() 能输出文字" },
    { id: "understand-program", label: "理解程序 = 按顺序执行的一串指令" },
  ],
  exercises: ["m1a-c1", "m1a-c2"],
  render(el) {
    ui.parts(el, [
      { type: "p", t: "程序（program）就是写给计算机的一串<b>按顺序执行</b>的指令。Python 里最常用的第一句话是 <code>print()</code>——它把括号里的内容显示到屏幕上。" },
      { type: "code", code: "print(\"你好，Python！\")\nprint(42)\nprint(1 + 2)", caption: "print 可以输出文字、数字，甚至算式的结果" },
      { type: "callout", kind: "key", title: "print() —— 输出函数", t: "<code>print(要显示的内容)</code> 把括号里的东西打印出来。文字要用<b>引号</b>包起来，数字和算式不用。" },
      { type: "p", t: "下面这个框里是一个真的 Python 环境，直接在你自己的浏览器里跑（不用安装任何东西）。点「运行」试试：" },
    ]);

    mountPlayground(el, { initial: "print(\"你好，Python！\")\nprint(3 + 5)" });

    ui.parts(el, [
      { type: "h", t: "练习" },
      { type: "p", t: "完成下面两道题，就能解锁下一节。" },
    ]);

    choiceExercise(el, {
      lessonId: "m1a",
      exId: "m1a-c1",
      skills: [{ id: "print-output", label: "用 print 输出文字" }],
      prompt: "下面哪一行代码，能正确输出文字「你好」？",
      options: [
        { label: 'print("你好")', correct: true },
        { label: "print(你好)" },
        { label: 'echo "你好"' },
        { label: "你好" },
      ],
      explain: "文字要用引号包起来：<code>print(\"你好\")</code>。没有引号，Python 会以为「你好」是个变量名。",
      feedbackPerOption: {
        1: "少了引号——「你好」是文字，得用引号包起来。",
        2: "echo 不是 Python 的输出命令。",
        3: "光写「你好」不会输出任何东西。",
      },
    });

    codeExercise(el, {
      lessonId: "m1a",
      exId: "m1a-c2",
      skills: [{ id: "print-output", label: "用 print 输出文字" }],
      prompt: "在下面写一行代码，输出文字 <code>你好，Python！</code>（注意中文的感叹号）。",
      starter: "",
      expectOutput: "你好，Python！",
      explain: "<code>print(\"你好，Python！\")</code> 就能输出这行文字。文字要用英文引号包起来。",
    });
  },
});

registerLesson({
  id: "m1b",
  module: "m1",
  title: "变量：给数据起个名字",
  titleEn: "Variables",
  subtitle: "第 1 单元 · 第 2 节",
  requires: ["m1a"],
  objectives: [
    { id: "assign-var", label: "用 = 给变量赋值" },
    { id: "print-var", label: "用 print 输出变量的值" },
  ],
  exercises: ["m1b-c1", "m1b-f1", "m1b-c2"],
  render(el) {
    ui.parts(el, [
      { type: "p", t: "变量（variable）就像一个<b>贴了标签的盒子</b>：把数据装进去，以后用标签就能找到它。用等号 <code>=</code> 给变量赋值。" },
      { type: "code", code: "name = \"小明\"\nage = 20\nprint(name)\nprint(age)", caption: "把「小明」放进 name，把 20 放进 age" },
      { type: "callout", kind: "key", title: "赋值 =", t: "<code>变量名 = 值</code> —— 把右边的值放进左边的变量。<b>= 不是「等于」</b>，是「把右边的赋给左边」。" },
      { type: "p", t: "变量可以<b>重新赋值</b>，后写的会覆盖先前的：" },
      { type: "code", code: "x = 1\nx = 2\nprint(x)   # 输出 2", caption: "x 先被赋成 1，又被改成 2" },
      { type: "callout", kind: "trap", title: "引号是关键", t: "<code>print(name)</code> 输出<b>变量的值</b>；<code>print(\"name\")</code> 输出<b>文字「name」</b>。引号表示「这是字面文字」。" },
      { type: "p", t: "变量名规则：以字母或下划线开头，可含数字；不能是 Python 关键字（如 <code>if</code>、<code>for</code>）。<code>my_score</code>、<code>name2</code> 合法，<code>2name</code> 不合法。" },
    ]);

    mountPlayground(el, { initial: "city = \"北京\"\nprint(city)\nprint(\"city\")", label: "试试看" });

    choiceExercise(el, {
      lessonId: "m1b",
      exId: "m1b-c1",
      skills: [{ id: "var-print", label: "区分变量与字面文字" }],
      prompt: "设 <code>x = 5</code>，下面哪个会输出数字 5？",
      options: [
        { label: "print(x)", correct: true },
        { label: 'print("x")' },
        { label: "print(5)" },
        { label: "x" },
      ],
      explain: "<code>print(x)</code> 输出变量的值 5。注意 <code>print(5)</code> 也能输出 5，但它是直接输出数字，不是通过变量。",
      feedbackPerOption: {
        1: "会输出文字「x」，不是 5——引号表示字面文字。",
        3: "光写 x 不会输出任何东西。",
      },
    });

    fillExercise(el, {
      lessonId: "m1b",
      exId: "m1b-f1",
      skills: [{ id: "var-assign", label: "用 = 赋值" }],
      prompt: "给变量赋值的符号是什么？（填一个字符）",
      accept: ["="],
      explain: "赋值用单个等号 <code>=</code>，它把右边的值赋给左边的变量。",
    });

    codeExercise(el, {
      lessonId: "m1b",
      exId: "m1b-c2",
      skills: [{ id: "var-assign", label: "定义变量并输出" }],
      prompt: "定义变量 <code>greeting</code>，赋值为文字「你好」，然后输出它的值（最终输出「你好」）。",
      starter: "",
      expectOutput: "你好",
      explain: "两行搞定：<code>greeting = \"你好\"</code> 再 <code>print(greeting)</code>。",
    });
  },
});
