// 第二单元：数据类型（数字/运算符、字符串/布尔、类型转换）
import { registerLesson } from "../router.js";
import * as ui from "../ui.js";
import { mountPlayground } from "../playground.js";
import { choiceExercise, codeExercise, fillExercise } from "../exercises.js";

registerLesson({
  id: "m2a",
  module: "m2",
  title: "数字与运算符",
  titleEn: "Numbers & Operators",
  subtitle: "第 2 单元 · 第 1 节",
  requires: ["m1b"],
  objectives: [
    { id: "int-float", label: "区分整数 int 与小数 float" },
    { id: "arithmetic", label: "会用 + - * / // % 运算符" },
  ],
  exercises: ["m2a-c1", "m2a-c2"],
  render(el) {
    ui.parts(el, [
      { type: "p", t: "Python 里数字分两种：<b>整数 int</b>（如 <code>42</code>）和<b>小数 float</b>（如 <code>3.14</code>）。日常计算用这几个运算符：" },
      { type: "ul", items: ["<code>+</code> 加，<code>-</code> 减，<code>*</code> 乘，<code>/</code> 除", "<code>//</code> 整除（去掉小数部分），<code>%</code> 取余（余数）", "<code>**</code> 乘方（如 <code>2**3</code> = 8）"] },
      { type: "code", code: "print(7 + 2)    # 9\nprint(7 - 2)    # 5\nprint(7 * 2)    # 14\nprint(7 / 2)    # 3.5\nprint(7 // 2)   # 3\nprint(7 % 2)    # 1\nprint(2 ** 3)   # 8", caption: "各运算符的结果" },
      { type: "callout", kind: "key", title: "/ 和 // 的区别", t: "<code>/</code> 是普通除法，结果是小数（<code>7 / 2 → 3.5</code>）；<code>//</code> 是整除，砍掉小数部分（<code>7 // 2 → 3</code>）。" },
      { type: "callout", kind: "trap", title: "取余很有用", t: "<code>7 % 2</code> 得 1（7 除以 2 余 1）。判断奇偶就用它：<code>n % 2 == 0</code> 是偶数，<code>n % 2 == 1</code> 是奇数。" },
    ]);

    mountPlayground(el, { initial: "print(10 // 3)\nprint(10 % 3)", label: "试试看" });

    choiceExercise(el, {
      lessonId: "m2a",
      exId: "m2a-c1",
      skills: [{ id: "operators", label: "用算术运算符" }],
      prompt: "哪个运算符是「整除」（砍掉小数部分）？",
      options: [
        { label: "//", correct: true },
        { label: "/" },
        { label: "%" },
        { label: "**" },
      ],
      explain: "<code>//</code> 是整除：<code>7 // 2 → 3</code>。",
      feedbackPerOption: {
        1: "<code>/</code> 是普通除法，会得小数。",
        2: "<code>%</code> 是取余，不是整除。",
        3: "<code>**</code> 是乘方。",
      },
    });

    codeExercise(el, {
      lessonId: "m2a",
      exId: "m2a-c2",
      skills: [{ id: "operators", label: "用算术运算符" }],
      prompt: "写一行代码，输出 <code>17 // 5</code> 的结果。",
      starter: "",
      expectOutput: "3",
      explain: "<code>print(17 // 5)</code> —— 17 除以 5 得 3 余 2，整除结果是 3。",
    });
  },
});

registerLesson({
  id: "m2b",
  module: "m2",
  title: "字符串与布尔",
  titleEn: "Strings & Booleans",
  subtitle: "第 2 单元 · 第 2 节",
  requires: ["m2a"],
  objectives: [
    { id: "str-type", label: "认识字符串 str" },
    { id: "bool-type", label: "认识布尔 bool（True/False）" },
  ],
  exercises: ["m2b-c1", "m2b-c2"],
  render(el) {
    ui.parts(el, [
      { type: "p", t: "<b>字符串 str</b> 就是一串文字，用引号包起来。单引号、双引号都行：<code>'你好'</code> 和 <code>\"你好\"</code> 等价。" },
      { type: "p", t: "<b>布尔 bool</b> 只有两个值：<code>True</code>（真）和 <code>False</code>（假）。<b>比较</b>运算会得到布尔值：" },
      { type: "code", code: "print(3 > 2)     # True\nprint(3 < 2)     # False\nprint(3 == 3)    # True（等于）\nprint(3 != 3)    # False（不等于）", caption: "比较产生 True / False" },
      { type: "callout", kind: "key", title: "== 和 = 不是一回事", t: "<code>==</code> 是「比较相等」，结果是 True/False；<code>=</code> 是「赋值」。写条件时别漏了一个等号。" },
      { type: "p", t: "字符串也能比较大小，按字母顺序：<code>'apple' &lt; 'banana'</code> 是 True。" },
    ]);

    mountPlayground(el, { initial: 'print(5 > 3)\nprint("a" < "b")', label: "试试看" });

    choiceExercise(el, {
      lessonId: "m2b",
      exId: "m2b-c1",
      skills: [{ id: "bool-compare", label: "用比较运算符得布尔值" }],
      prompt: "下面哪个表达式的结果是 True？",
      options: [
        { label: "5 > 3", correct: true },
        { label: "5 < 3" },
        { label: "5 == 3" },
        { label: "5 != 5" },
      ],
      explain: "<code>5 &gt; 3</code> 成立，所以是 True。",
      feedbackPerOption: {
        1: "5 不小于 3。",
        2: "5 不等于 3。",
        3: "5 等于 5，所以「不等于」是 False。",
      },
    });

    codeExercise(el, {
      lessonId: "m2b",
      exId: "m2b-c2",
      skills: [{ id: "bool-compare", label: "用比较运算符得布尔值" }],
      prompt: "写一行代码，输出 <code>10 > 7</code> 的结果。",
      starter: "",
      expectOutput: "True",
      explain: "<code>print(10 > 7)</code> —— 10 确实大于 7，输出 True。",
    });
  },
});

registerLesson({
  id: "m2c",
  module: "m2",
  title: "类型转换",
  titleEn: "Type Conversion",
  subtitle: "第 2 单元 · 第 3 节",
  requires: ["m2b"],
  objectives: [
    { id: "convert", label: "会用 int() float() str() 转换类型" },
    { id: "type-check", label: "用 type() 查看类型" },
  ],
  exercises: ["m2c-c1", "m2c-c2"],
  render(el) {
    ui.parts(el, [
      { type: "p", t: "不同类型不能随便混用。比如 <code>\"3\"</code> 是<b>字符串</b>，<code>3</code> 是<b>数字</b>，它们长得像但不是一回事。用转换函数把一种类型变成另一种：" },
      { type: "code", code: "print(int(\"42\"))     # 42（字符串转整数）\nprint(float(\"3.5\"))   # 3.5（字符串转小数）\nprint(str(42))       # \"42\"（数字转字符串）", caption: "int() / float() / str()" },
      { type: "callout", kind: "trap", title: "常见错误：字符串 + 数字", t: "<code>\"我有\" + 3</code> 会报 TypeError。要先把数字转成字符串：<code>\"我有\" + str(3)</code>。" },
      { type: "p", t: "想看一个值是什么类型，用 <code>type()</code>：" },
      { type: "code", code: "print(type(42))      # <class 'int'>\nprint(type(3.14))    # <class 'float'>\nprint(type(\"hi\"))    # <class 'str'>", caption: "type() 告诉我们类型" },
    ]);

    mountPlayground(el, { initial: 'print(int("42") + 8)\nprint("我有 " + str(3) + " 本书")', label: "试试看" });

    choiceExercise(el, {
      lessonId: "m2c",
      exId: "m2c-c1",
      skills: [{ id: "convert", label: "转换类型" }],
      prompt: "要把字符串 \"5\" 变成数字 5，用哪个函数？",
      options: [
        { label: "int(\"5\")", correct: true },
        { label: "str(5)" },
        { label: "float(\"5\")" },
        { label: 'type("5")' },
      ],
      explain: "<code>int(\"5\")</code> 把字符串转成整数。",
      feedbackPerOption: {
        1: "这是把数字转成字符串，方向反了。",
        2: "float 会把 \"5\" 转成小数 5.0，不是整数。",
        3: "type() 是查看类型，不是转换。",
      },
    });

    codeExercise(el, {
      lessonId: "m2c",
      exId: "m2c-c2",
      skills: [{ id: "convert", label: "转换类型后运算" }],
      prompt: "写代码，把字符串 <code>\"25\"</code> 转成整数后加 5，输出结果（30）。",
      starter: "",
      expectOutput: "30",
      explain: "<code>print(int(\"25\") + 5)</code> —— 先转成整数 25，再加 5 得 30。",
    });
  },
});
