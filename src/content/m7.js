// 第七单元：列表（list 基础、遍历与方法、tuple）
import { registerLesson } from "../router.js";
import * as ui from "../ui.js";
import { mountPlayground } from "../playground.js";
import { choiceExercise, codeExercise } from "../exercises.js";

registerLesson({
  id: "m7a",
  module: "m7",
  title: "列表基础",
  titleEn: "Lists",
  subtitle: "第 7 单元 · 第 1 节",
  requires: ["m6c"],
  objectives: [
    { id: "list-basic", label: "创建列表、取元素、增删改" },
  ],
  exercises: ["m7a-c1", "m7a-c2"],
  render(el) {
    ui.parts(el, [
      { type: "p", t: "<b>列表 list</b> 是一组<b>有序</b>的数据，用方括号 <code>[]</code> 表示，元素用逗号隔开。和字符串一样用索引取元素（从 0 开始）：" },
      { type: "code", code: "fruits = [\"苹果\", \"香蕉\", \"橙子\"]\nprint(fruits[0])   # 苹果\nprint(fruits[-1])  # 橙子\nprint(fruits[0:2]) # ['苹果', '香蕉']", caption: "列表的索引和切片" },
      { type: "p", t: "列表<b>可以修改</b>：<code>append()</code> 加一个，<code>pop()</code> 删一个，直接赋值改一个：" },
      { type: "code", code: "nums = [1, 2, 3]\nnums.append(4)       # [1, 2, 3, 4]\nnums[0] = 10         # [10, 2, 3, 4]\nnums.pop()           # 删掉末尾的 4 → [10, 2, 3]\nprint(nums)", caption: "增、改、删" },
      { type: "callout", kind: "key", title: "列表 vs 字符串", t: "字符串<b>不可变</b>，列表<b>可变</b>。你可以 <code>nums[0] = 10</code>，但不能 <code>s[0] = 'x'</code>（字符串会报错）。" },
    ]);

    mountPlayground(el, { initial: 'nums = [1, 2, 3]\nnums.append(4)\nprint(nums)\nprint(len(nums))', label: "试试看" });

    choiceExercise(el, {
      lessonId: "m7a",
      exId: "m7a-c1",
      skills: [{ id: "list-basic", label: "用列表" }],
      prompt: "给列表加一个元素用什么方法？",
      options: [
        { label: ".append()", correct: true },
        { label: ".add()" },
        { label: ".push()" },
        { label: ".insert()" },
      ],
      explain: "<code>nums.append(4)</code> 在末尾加元素。",
      feedbackPerOption: {
        1: "列表没有 .add()（集合 set 才有）。",
        2: "push 是别的语言的说法。",
        3: "insert 是在指定位置插入，参数不同。",
      },
    });

    codeExercise(el, {
      lessonId: "m7a",
      exId: "m7a-c2",
      skills: [{ id: "list-basic", label: "用列表" }],
      prompt: "设 <code>nums = [10, 20, 30, 40]</code>，写代码输出第三个元素（30）。",
      starter: "nums = [10, 20, 30, 40]",
      expectOutput: "30",
      explain: "索引从 0 开始，第三个是 <code>nums[2]</code>。",
    });
  },
});

registerLesson({
  id: "m7b",
  module: "m7",
  title: "遍历列表与常用方法",
  titleEn: "Iterating Lists",
  subtitle: "第 7 单元 · 第 2 节",
  requires: ["m7a"],
  objectives: [
    { id: "list-iterate", label: "用 for 遍历列表" },
    { id: "list-methods", label: "用 len/sort 等常用方法" },
  ],
  exercises: ["m7b-c1", "m7b-c2"],
  render(el) {
    ui.parts(el, [
      { type: "p", t: "用 <code>for</code> 直接遍历列表的每个元素（不用 range，直接 in 列表）：" },
      { type: "code", code: "fruits = [\"苹果\", \"香蕉\", \"橙子\"]\nfor f in fruits:\n    print(f)\n# 依次输出：苹果 香蕉 橙子", caption: "for ... in 列表" },
      { type: "p", t: "常用方法：<code>len()</code> 求长度，<code>sort()</code> 排序，<code>sum()</code> 求和，<code>max()</code>/<code>min()</code> 取极值：" },
      { type: "code", code: "nums = [3, 1, 2]\nprint(len(nums))   # 3\nnums.sort()\nprint(nums)        # [1, 2, 3]\nprint(sum(nums))   # 6", caption: "长度、排序、求和" },
      { type: "callout", kind: "key", title: "sort 直接改原列表", t: "<code>nums.sort()</code> 会<b>就地</b>修改 nums 本身（返回 None）。想保留原列表用 <code>sorted(nums)</code>。" },
    ]);

    mountPlayground(el, { initial: 'nums = [5, 3, 8, 1]\nprint(sorted(nums))\nprint(max(nums))', label: "试试看" });

    choiceExercise(el, {
      lessonId: "m7b",
      exId: "m7b-c1",
      skills: [{ id: "list-iterate", label: "遍历列表" }],
      prompt: "哪个能依次打印列表每个元素？",
      options: [
        { label: "for x in nums: print(x)", correct: true },
        { label: "for i in len(nums): print(i)" },
        { label: "while nums: print(nums)" },
        { label: "print(nums)" },
      ],
      explain: "<code>for x in nums</code> 每次取一个元素。",
      feedbackPerOption: {
        1: "len(nums) 是数字，不能 in。",
        2: "while 要配合索引，这样写不对。",
        3: "print(nums) 一次输出整个列表，不是逐个。",
      },
    });

    codeExercise(el, {
      lessonId: "m7b",
      exId: "m7b-c2",
      skills: [{ id: "list-iterate", label: "遍历列表" }],
      prompt: "设 <code>nums = [1, 2, 3]</code>。写代码，用 for 循环把每个元素乘 2 后输出，每行一个（即 2、4、6）。",
      starter: "nums = [1, 2, 3]",
      expectOutput: "2\n4\n6",
      explain: "<code>for n in nums: print(n * 2)</code> —— 依次输出 2、4、6。",
    });
  },
});

registerLesson({
  id: "m7c",
  module: "m7",
  title: "元组 tuple",
  titleEn: "Tuples",
  subtitle: "第 7 单元 · 第 3 节",
  requires: ["m7b"],
  objectives: [
    { id: "tuple", label: "认识元组 tuple（不可变的列表）" },
  ],
  exercises: ["m7c-c1", "m7c-c2"],
  render(el) {
    ui.parts(el, [
      { type: "p", t: "<b>元组 tuple</b> 和列表很像，但用<b>圆括号</b> <code>()</code>，而且<b>不可变</b>（创建后不能改元素）：" },
      { type: "code", code: "point = (3, 4)\nprint(point[0])   # 3\nprint(point[1])   # 4", caption: "元组用圆括号" },
      { type: "callout", kind: "key", title: "什么时候用元组", t: "表示<b>固定的一组值</b>（比如坐标、日期）时用元组；需要增删改的集合用列表。元组不可变，更「安全」。" },
      { type: "code", code: "point = (3, 4)\nx, y = point\nprint(x)   # 3\nprint(y)   # 4", caption: "解包：一次取多个值" },
      { type: "p", t: "元组同样支持索引、切片、for 遍历、len()，只是不能改。" },
    ]);

    mountPlayground(el, { initial: 't = (1, 2, 3)\nprint(t)\nprint(len(t))', label: "试试看" });

    choiceExercise(el, {
      lessonId: "m7c",
      exId: "m7c-c1",
      skills: [{ id: "tuple", label: "用元组" }],
      prompt: "元组和列表最大的区别是什么？",
      options: [
        { label: "元组不可变，列表可变", correct: true },
        { label: "元组能装更多元素" },
        { label: "元组更快" },
        { label: "元组只能装数字" },
      ],
      explain: "元组创建后不能改元素；列表可以增删改。",
      feedbackPerOption: {
        1: "两者容量没这个区别。",
        2: "速度不是关键区别。",
        3: "元组能装任意类型。",
      },
    });

    codeExercise(el, {
      lessonId: "m7c",
      exId: "m7c-c2",
      skills: [{ id: "tuple", label: "用元组" }],
      prompt: "设 <code>t = (10, 20, 30)</code>，写代码输出第二个元素（20）。",
      starter: "t = (10, 20, 30)",
      expectOutput: "20",
      explain: "<code>print(t[1])</code> —— 元组索引也从 0 开始，第二个是 t[1]。",
    });
  },
});
