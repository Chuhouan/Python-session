// 第五单元：条件判断（if/else、if/elif/else、逻辑运算）
import { registerLesson } from "../router.js";
import * as ui from "../ui.js";
import { mountPlayground } from "../playground.js";
import { choiceExercise, codeExercise } from "../exercises.js";

registerLesson({
  id: "m5a",
  module: "m5",
  title: "if / else 条件判断",
  titleEn: "if / else",
  subtitle: "第 5 单元 · 第 1 节",
  requires: ["m4b"],
  objectives: [
    { id: "if-else", label: "用 if/else 根据条件走不同分支" },
  ],
  exercises: ["m5a-c1", "m5a-c2"],
  render(el) {
    ui.parts(el, [
      { type: "p", t: "<code>if</code> 让程序<b>根据条件做选择</b>：条件为真（True）就执行一块代码，否则执行 <code>else</code> 里的另一块。" },
      { type: "code", code: "age = 20\nif age >= 18:\n    print(\"成年人\")\nelse:\n    print(\"未成年\")", caption: "if/else 二选一" },
      { type: "callout", kind: "key", title: "冒号和缩进", t: "if 那行末尾要写<b>冒号</b> <code>:</code>，下面的代码块要<b>缩进 4 个空格</b>。Python 靠缩进知道哪些代码属于 if。" },
      { type: "callout", kind: "trap", title: "最容易漏的冒号", t: "忘写 <code>:</code> 会报 SyntaxError。缩进不统一会报 IndentationError。这两个是新手最常犯的错误。" },
      { type: "p", t: "条件里常用比较运算符：<code>==</code> <code>!=</code> <code>&gt;</code> <code>&lt;</code> <code>&gt;=</code> <code>&lt;=</code>。" },
    ]);

    mountPlayground(el, { initial: 'score = 60\nif score >= 60:\n    print("及格")\nelse:\n    print("不及格")', label: "试试看" });

    choiceExercise(el, {
      lessonId: "m5a",
      exId: "m5a-c1",
      skills: [{ id: "if-else", label: "写 if/else 分支" }],
      prompt: "if 那行结尾必须写什么？",
      options: [
        { label: "冒号 :", correct: true },
        { label: "分号 ;" },
        { label: "逗号 ," },
        { label: "什么都不用" },
      ],
      explain: "if 条件后面要写冒号 <code>:</code>，比如 <code>if x &gt; 0:</code>。",
      feedbackPerOption: {
        1: "Python 不用分号。",
        2: "不是逗号。",
        3: "缺了冒号会报 SyntaxError。",
      },
    });

    codeExercise(el, {
      lessonId: "m5a",
      exId: "m5a-c2",
      skills: [{ id: "if-else", label: "写 if/else 分支" }],
      prompt: "设 <code>x = 10</code>。写代码：如果 x 大于 0 输出「正数」，否则输出「非正数」。",
      starter: "x = 10",
      expectOutput: "正数",
      explain: "<code>if x &gt; 0: print(\"正数\")</code> 加上 <code>else: print(\"非正数\")</code>。x=10 大于 0，输出「正数」。",
    });
  },
});

registerLesson({
  id: "m5b",
  module: "m5",
  title: "if / elif / else 多分支",
  titleEn: "elif",
  subtitle: "第 5 单元 · 第 2 节",
  requires: ["m5a"],
  objectives: [
    { id: "elif", label: "用 elif 处理多个分支" },
  ],
  exercises: ["m5b-c1", "m5b-c2"],
  render(el) {
    ui.parts(el, [
      { type: "p", t: "有<b>多种</b>情况时，用 <code>elif</code>（else if 的缩写）串联。程序从上往下检查，命中第一个为真的分支就执行并跳过其余：" },
      { type: "code", code: "score = 85\nif score >= 90:\n    print(\"优\")\nelif score >= 80:\n    print(\"良\")\nelif score >= 60:\n    print(\"及格\")\nelse:\n    print(\"不及格\")", caption: "从上往下，命中即停" },
      { type: "callout", kind: "key", title: "顺序很重要", t: "条件要按<b>从严格到宽松</b>排。如果先写 <code>score >= 60</code>，那 85 分会被判成「及格」而不是「良」。" },
      { type: "p", t: "可以只有 if 没有 else；也可以有多个 elif。但 if 是必须的，elif 和 else 可有可无。" },
    ]);

    mountPlayground(el, { initial: 'temp = 30\nif temp >= 35:\n    print("炎热")\nelif temp >= 25:\n    print("温暖")\nelse:\n    print("凉爽")', label: "试试看" });

    choiceExercise(el, {
      lessonId: "m5b",
      exId: "m5b-c1",
      skills: [{ id: "elif", label: "用 elif 多分支" }],
      prompt: "<code>elif</code> 是什么的缩写？",
      options: [
        { label: "else if", correct: true },
        { label: "else in" },
        { label: "end if" },
        { label: "else it" },
      ],
      explain: "elif = else if，用来接「另一种情况」的分支。",
    });

    codeExercise(el, {
      lessonId: "m5b",
      exId: "m5b-c2",
      skills: [{ id: "elif", label: "用 elif 多分支" }],
      prompt: "设 <code>n = 7</code>。写代码：n 大于 10 输出「大」；n 在 5 到 10 之间（含）输出「中」；否则输出「小」。",
      starter: "n = 7",
      expectOutput: "中",
      explain: "<code>if n &gt; 10</code> 输出「大」，<code>elif n &gt;= 5</code> 输出「中」，否则「小」。n=7 命中「中」。",
    });
  },
});

registerLesson({
  id: "m5c",
  module: "m5",
  title: "逻辑运算 and / or / not",
  titleEn: "Logical Operators",
  subtitle: "第 5 单元 · 第 3 节",
  requires: ["m5b"],
  objectives: [
    { id: "logical", label: "用 and/or/not 组合多个条件" },
  ],
  exercises: ["m5c-c1", "m5c-c2"],
  render(el) {
    ui.parts(el, [
      { type: "p", t: "一个条件不够时，用逻辑运算组合：<code>and</code>（并且）、<code>or</code>（或者）、<code>not</code>（取反）。" },
      { type: "code", code: "age = 20\nhas_id = True\nif age >= 18 and has_id:\n    print(\"可以进入\")\nelse:\n    print(\"不能进入\")", caption: "and：两个条件都满足" },
      { type: "code", code: "day = \"周六\"\nif day == \"周六\" or day == \"周日\":\n    print(\"周末\")\nif not (age < 18):\n    print(\"已成年\")", caption: "or：任一满足；not：取反" },
      { type: "callout", kind: "key", title: "三个运算符一句话", t: "<code>and</code> 要<b>都真</b>；<code>or</code> 要<b>至少一个真</b>；<code>not</code> 把真变假、假变真。" },
      { type: "p", t: "多个条件可以组合，用括号让意图更清楚：<code>(a &gt; 0) and (a &lt; 10)</code>。" },
    ]);

    mountPlayground(el, { initial: 'x = 5\nprint(x > 0 and x < 10)\nprint(x > 10 or x < 0)\nprint(not (x > 3))', label: "试试看" });

    choiceExercise(el, {
      lessonId: "m5c",
      exId: "m5c-c1",
      skills: [{ id: "logical", label: "用 and/or/not 组合条件" }],
      prompt: "<code>True and False</code> 的结果是？",
      options: [
        { label: "False", correct: true },
        { label: "True" },
        { label: "None" },
        { label: "报错" },
      ],
      explain: "<code>and</code> 要两个都真才为真；False 在，所以结果是 False。",
      feedbackPerOption: {
        1: "and 不是 or，只要有一个假就是假。",
      },
    });

    codeExercise(el, {
      lessonId: "m5c",
      exId: "m5c-c2",
      skills: [{ id: "logical", label: "用 and/or/not 组合条件" }],
      prompt: "设 <code>age = 16</code>、<code>has_ticket = True</code>。写代码：年龄 ≥ 18 且（and）有票才输出「入场」，否则输出「拒绝」。",
      starter: "age = 16\nhas_ticket = True",
      expectOutput: "拒绝",
      explain: "<code>if age &gt;= 18 and has_ticket: print(\"入场\") else: print(\"拒绝\")</code>。age=16 不满足年龄，输出「拒绝」。",
    });
  },
});
