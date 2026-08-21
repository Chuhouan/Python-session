// 第九单元：函数（def、参数与返回值、作用域）
import { registerLesson } from "../router.js";
import * as ui from "../ui.js";
import { mountPlayground } from "../playground.js";
import { choiceExercise, codeExercise } from "../exercises.js";

registerLesson({
  id: "m9a",
  module: "m9",
  title: "定义与调用函数",
  titleEn: "Defining Functions",
  subtitle: "第 9 单元 · 第 1 节",
  requires: ["m8c"],
  objectives: [
    { id: "def", label: "用 def 定义函数并调用" },
  ],
  exercises: ["m9a-c1", "m9a-c2"],
  render(el) {
    ui.parts(el, [
      { type: "p", t: "<b>函数 function</b> 是一段<b>有名字、可重复调用</b>的代码。用 <code>def</code> 定义，之后调用它就能反复执行：" },
      { type: "code", code: "def say_hello():\n    print(\"你好！\")\n\nsay_hello()\nsay_hello()\n# 输出两遍「你好！」", caption: "定义一次，调用多次" },
      { type: "callout", kind: "key", title: "def 的固定格式", t: "<code>def 函数名():</code> 结尾冒号，函数体<b>缩进 4 格</b>。函数名习惯用小写加下划线，如 <code>say_hello</code>。" },
      { type: "p", t: "函数还能<b>接收参数</b>——调用时传进去的值，函数内部用参数名使用：" },
      { type: "code", code: "def greet(name):\n    print(f\"你好，{name}\")\n\ngreet(\"小明\")\ngreet(\"小美\")\n# 你好，小明\n# 你好，小美", caption: "带参数的函数" },
      { type: "callout", kind: "trap", title: "别忘了缩进和冒号", t: "def 那行漏冒号、函数体不缩进，都会报错。这是写函数最常见的两个坑。" },
    ]);

    mountPlayground(el, { initial: 'def double(n):\n    return n * 2\nprint(double(4))', label: "试试看" });

    choiceExercise(el, {
      lessonId: "m9a",
      exId: "m9a-c1",
      skills: [{ id: "def", label: "定义函数" }],
      prompt: "定义函数用哪个关键字？",
      options: [
        { label: "def", correct: true },
        { label: "func" },
        { label: "function" },
        { label: "define" },
      ],
      explain: "Python 用 <code>def 函数名():</code> 定义函数。",
      feedbackPerOption: {
        1: "func 不是关键字。",
        2: "function 是 JavaScript 的写法。",
        3: "没有 define。",
      },
    });

    codeExercise(el, {
      lessonId: "m9a",
      exId: "m9a-c2",
      skills: [{ id: "def", label: "定义函数" }],
      prompt: "定义函数 <code>greet(name)</code>，调用 <code>greet(\"你好\")</code> 时输出「你好」。函数体用 <code>print(name)</code>。",
      starter: "",
      expectOutput: "你好",
      explain: "<code>def greet(name): print(name)</code> 再 <code>greet(\"你好\")</code>。",
    });
  },
});

registerLesson({
  id: "m9b",
  module: "m9",
  title: "返回值与参数",
  titleEn: "Return Values & Arguments",
  subtitle: "第 9 单元 · 第 2 节",
  requires: ["m9a"],
  objectives: [
    { id: "return", label: "用 return 返回结果" },
    { id: "args", label: "区分位置/关键字/默认参数" },
  ],
  exercises: ["m9b-c1", "m9b-c2"],
  render(el) {
    ui.parts(el, [
      { type: "p", t: "函数用 <code>return</code> 把结果<b>交还</b>给调用者。有 return 的函数可以「算出一个值」再继续用：" },
      { type: "code", code: "def add(a, b):\n    return a + b\n\nresult = add(3, 5)\nprint(result)   # 8", caption: "return 返回计算结果" },
      { type: "callout", kind: "key", title: "print 和 return 不是一回事", t: "<code>print</code> 只是<b>显示</b>，函数结束就没了；<code>return</code> 把值<b>交出去</b>，能存进变量继续算。想「算出结果给别人用」就用 return。" },
      { type: "p", t: "参数有几种传法：<b>位置参数</b>（按顺序）、<b>关键字参数</b>（按名字）、<b>默认参数</b>（给默认值）：" },
      { type: "code", code: "def greet(name, greeting=\"你好\"):\n    print(f\"{greeting}，{name}\")\n\ngreet(\"小明\")                # 你好，小明\ngreet(\"小美\", greeting=\"早上好\")  # 早上好，小美", caption: "默认参数 + 关键字参数" },
    ]);

    mountPlayground(el, { initial: 'def power(base, exp=2):\n    return base ** exp\nprint(power(3))\nprint(power(3, 3))', label: "试试看" });

    choiceExercise(el, {
      lessonId: "m9b",
      exId: "m9b-c1",
      skills: [{ id: "return", label: "用 return 返回值" }],
      prompt: "想让函数「算出一个值交给调用者」，用什么？",
      options: [
        { label: "return", correct: true },
        { label: "print" },
        { label: "break" },
        { label: "yield" },
      ],
      explain: "<code>return</code> 把值交还给调用者，能存进变量。",
      feedbackPerOption: {
        1: "print 只是显示，值交不出去。",
        2: "break 是循环里用的。",
        3: "yield 是生成器，超纲了。",
      },
    });

    codeExercise(el, {
      lessonId: "m9b",
      exId: "m9b-c2",
      skills: [{ id: "return", label: "用 return 返回值" }],
      prompt: "定义函数 <code>double(n)</code>，用 return 返回 <code>n * 2</code>。",
      starter: "",
      tests: [
        { name: "double(4) 等于 8", expr: "double(4) == 8" },
        { name: "double(0) 等于 0", expr: "double(0) == 0" },
      ],
      explain: "<code>def double(n): return n * 2</code>。",
    });
  },
});

registerLesson({
  id: "m9c",
  module: "m9",
  title: "作用域",
  titleEn: "Scope",
  subtitle: "第 9 单元 · 第 3 节",
  requires: ["m9b"],
  objectives: [
    { id: "scope", label: "理解局部变量与全局变量" },
  ],
  exercises: ["m9c-c1", "m9c-c2"],
  render(el) {
    ui.parts(el, [
      { type: "p", t: "<b>作用域 scope</b> 决定了变量在哪里能用。函数<b>内部</b>定义的变量是<b>局部变量</b>，函数外访问不到：" },
      { type: "code", code: "def f():\n    x = 10   # x 是局部变量\n    print(x)\n\nf()          # 10\n# print(x)   # 报错！x 在函数外不存在", caption: "局部变量只在函数内可见" },
      { type: "p", t: "函数<b>外面</b>定义的变量是<b>全局变量</b>，函数内可以读；但要<b>修改</b>它得用 <code>global</code> 声明：" },
      { type: "code", code: "count = 0\n\ndef add():\n    global count\n    count = count + 1\n\nadd()\nadd()\nprint(count)   # 2", caption: "global 声明后才能改全局变量" },
      { type: "callout", kind: "key", title: "一句话", t: "函数内新建的变量是<b>局部的</b>（外面看不到）；函数外建的变量是<b>全局的</b>（里面能读，改它要声明 global）。" },
      { type: "callout", kind: "trap", title: "尽量少用 global", t: "过多用 global 会让程序难懂、难排错。优先用 <code>return</code> 把结果传出来，而不是改全局变量。" },
    ]);

    mountPlayground(el, { initial: 'def calc():\n    y = 100\n    return y\nprint(calc())\n# print(y) 会报错，y 是局部的', label: "试试看" });

    choiceExercise(el, {
      lessonId: "m9c",
      exId: "m9c-c1",
      skills: [{ id: "scope", label: "理解作用域" }],
      prompt: "函数内部定义的变量，函数外面能用吗？",
      options: [
        { label: "不能，它是局部变量", correct: true },
        { label: "能，它是全局的" },
        { label: "取决于变量名" },
        { label: "永远都能" },
      ],
      explain: "函数内定义的变量是局部的，函数外访问会报 NameError。",
      feedbackPerOption: {
        1: "默认是局部的，不是全局。",
        2: "跟名字无关。",
        3: "不是永远能。",
      },
    });

    codeExercise(el, {
      lessonId: "m9c",
      exId: "m9c-c2",
      skills: [{ id: "scope", label: "理解作用域" }],
      prompt: "定义函数 <code>area(w, h)</code>，用 return 返回矩形面积（w 乘 h）。",
      starter: "",
      tests: [
        { name: "area(3, 4) 等于 12", expr: "area(3, 4) == 12" },
        { name: "area(5, 2) 等于 10", expr: "area(5, 2) == 10" },
      ],
      explain: "<code>def area(w, h): return w * h</code>。",
    });
  },
});
