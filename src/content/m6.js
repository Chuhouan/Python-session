// 第六单元：循环（for/range、while、break/continue）
import { registerLesson } from "../router.js";
import * as ui from "../ui.js";
import { mountPlayground } from "../playground.js";
import { choiceExercise, codeExercise } from "../exercises.js";

registerLesson({
  id: "m6a",
  module: "m6",
  title: "for 循环与 range",
  titleEn: "for & range",
  subtitle: "第 6 单元 · 第 1 节",
  requires: ["m5c"],
  objectives: [
    { id: "for-range", label: "用 for ... in range(...) 重复执行" },
  ],
  exercises: ["m6a-c1", "m6a-c2"],
  render(el) {
    ui.parts(el, [
      { type: "p", t: "想让一段代码<b>重复执行</b>多次，用 <code>for</code> 循环。配合 <code>range()</code> 生成一串数字：" },
      { type: "code", code: "for i in range(5):\n    print(i)\n# 依次输出 0 1 2 3 4", caption: "range(5) = 0,1,2,3,4" },
      { type: "callout", kind: "key", title: "range 的三个用法", t: "<code>range(n)</code> 从 0 到 n-1；<code>range(a, b)</code> 从 a 到 b-1；<code>range(a, b, step)</code> 每次加 step。" },
      { type: "code", code: "for i in range(1, 6):\n    print(i)      # 1 2 3 4 5\n\nfor i in range(0, 10, 2):\n    print(i)      # 0 2 4 6 8", caption: "range 的起点、终点、步长" },
      { type: "p", t: "循环变量 <code>i</code> 每次取 range 里的下一个数。缩进在 <code>for</code> 下面的代码会被重复执行。" },
    ]);

    mountPlayground(el, { initial: 'for i in range(3):\n    print("第", i, "次")', label: "试试看" });

    choiceExercise(el, {
      lessonId: "m6a",
      exId: "m6a-c1",
      skills: [{ id: "for-range", label: "用 for 和 range" }],
      prompt: "<code>range(5)</code> 会产生哪几个数？",
      options: [
        { label: "0, 1, 2, 3, 4", correct: true },
        { label: "1, 2, 3, 4, 5" },
        { label: "0, 1, 2, 3, 4, 5" },
        { label: "5 个 5" },
      ],
      explain: "range(5) 从 0 开始，共 5 个数：0 到 4（不含 5）。",
      feedbackPerOption: {
        1: "range 从 0 开始，不是 1。",
        2: "共 5 个，不含 5。",
        3: "不是重复 5。",
      },
    });

    codeExercise(el, {
      lessonId: "m6a",
      exId: "m6a-c2",
      skills: [{ id: "for-range", label: "用 for 和 range" }],
      prompt: "用 for 循环依次输出 1、2、3，每行一个数字。",
      starter: "",
      expectOutput: "1\n2\n3",
      explain: "<code>for i in range(1, 4): print(i)</code> —— range(1,4) 产生 1、2、3。",
    });
  },
});

registerLesson({
  id: "m6b",
  module: "m6",
  title: "while 循环",
  titleEn: "while Loops",
  subtitle: "第 6 单元 · 第 2 节",
  requires: ["m6a"],
  objectives: [
    { id: "while", label: "用 while 在条件为真时重复执行" },
  ],
  exercises: ["m6b-c1", "m6b-c2"],
  render(el) {
    ui.parts(el, [
      { type: "p", t: "<code>while</code> 循环<b>只要条件为真就继续</b>，适合「不知道具体次数」的重复：" },
      { type: "code", code: "count = 1\nwhile count <= 3:\n    print(count)\n    count = count + 1\n# 依次输出 1 2 3", caption: "count 每次加 1，直到超过 3" },
      { type: "callout", kind: "trap", title: "小心死循环", t: "如果忘了写 <code>count = count + 1</code>，count 永远是 1，循环永远停不下来（死循环）。写 while 一定要让条件<b>有机会变假</b>。" },
      { type: "p", t: "<code>for</code> 适合「跑固定次数」，<code>while</code> 适合「满足条件就一直跑」。两者都能做的事，通常 for 更简洁。" },
    ]);

    mountPlayground(el, { initial: 'n = 10\nwhile n > 0:\n    print(n)\n    n = n - 2', label: "试试看" });

    choiceExercise(el, {
      lessonId: "m6b",
      exId: "m6b-c1",
      skills: [{ id: "while", label: "用 while 循环" }],
      prompt: "while 循环什么时候停止？",
      options: [
        { label: "条件变为假时", correct: true },
        { label: "条件变为真时" },
        { label: "执行了固定次数" },
        { label: "永远不会停" },
      ],
      explain: "while 循环在「条件为真」时继续，条件变假就停止。",
      feedbackPerOption: {
        1: "条件为真时才继续，不是停止。",
        2: "那是 for 循环的特点。",
        3: "写不好会死循环，但正常写会停。",
      },
    });

    codeExercise(el, {
      lessonId: "m6b",
      exId: "m6b-c2",
      skills: [{ id: "while", label: "用 while 循环" }],
      prompt: "设 <code>n = 3</code>。用 while 循环依次输出 3、2、1，每行一个。",
      starter: "n = 3",
      expectOutput: "3\n2\n1",
      explain: "<code>while n &gt; 0: print(n); n = n - 1</code> —— n 从 3 减到 1。",
    });
  },
});

registerLesson({
  id: "m6c",
  module: "m6",
  title: "break 与 continue",
  titleEn: "break & continue",
  subtitle: "第 6 单元 · 第 3 节",
  requires: ["m6b"],
  objectives: [
    { id: "break-continue", label: "用 break 提前退出、continue 跳过本次" },
  ],
  exercises: ["m6c-c1", "m6c-c2"],
  render(el) {
    ui.parts(el, [
      { type: "p", t: "<code>break</code> 直接<b>跳出整个循环</b>；<code>continue</code> 只<b>跳过本次</b>，继续下一轮。" },
      { type: "code", code: "for i in range(1, 10):\n    if i == 5:\n        break\n    print(i)\n# 输出 1 2 3 4（到 5 就停）", caption: "break：到 5 就退出" },
      { type: "code", code: "for i in range(1, 6):\n    if i == 3:\n        continue\n    print(i)\n# 输出 1 2 4 5（跳过 3）", caption: "continue：跳过 3" },
      { type: "callout", kind: "key", title: "一句话区分", t: "<code>break</code> = 彻底不循环了；<code>continue</code> = 这一轮跳过，继续下一轮。" },
    ]);

    mountPlayground(el, { initial: 'for i in range(10):\n    if i % 2 == 0:\n        continue\n    print(i)', label: "试试看" });

    choiceExercise(el, {
      lessonId: "m6c",
      exId: "m6c-c1",
      skills: [{ id: "break-continue", label: "用 break 和 continue" }],
      prompt: "哪个关键字能直接跳出整个循环？",
      options: [
        { label: "break", correct: true },
        { label: "continue" },
        { label: "exit" },
        { label: "stop" },
      ],
      explain: "<code>break</code> 跳出整个循环。",
      feedbackPerOption: {
        1: "continue 只跳过本轮。",
        2: "Python 里没有 exit 这个循环关键字。",
        3: "没有 stop。",
      },
    });

    codeExercise(el, {
      lessonId: "m6c",
      exId: "m6c-c2",
      skills: [{ id: "break-continue", label: "用 break 和 continue" }],
      prompt: "写代码输出 1 到 5 中除 3 以外的数，每行一个（即 1、2、4、5）。",
      starter: "",
      expectOutput: "1\n2\n4\n5",
      explain: "<code>for i in range(1, 6):</code> 里，<code>if i == 3: continue</code>，否则 print(i)。",
    });
  },
});
