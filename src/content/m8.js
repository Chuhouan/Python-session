// 第八单元：字典（dict 基础、遍历、set）
import { registerLesson } from "../router.js";
import * as ui from "../ui.js";
import { mountPlayground } from "../playground.js";
import { choiceExercise, codeExercise } from "../exercises.js";

registerLesson({
  id: "m8a",
  module: "m8",
  title: "字典基础",
  titleEn: "Dictionaries",
  subtitle: "第 8 单元 · 第 1 节",
  requires: ["m7c"],
  objectives: [
    { id: "dict-basic", label: "创建字典，按键取值、增删改" },
  ],
  exercises: ["m8a-c1", "m8a-c2"],
  render(el) {
    ui.parts(el, [
      { type: "p", t: "<b>字典 dict</b> 存的是<b>键值对</b>（key → value），用花括号 <code>{}</code>，通过<b>键</b>找<b>值</b>——像查字典：" },
      { type: "code", code: "person = {\"name\": \"小明\", \"age\": 20}\nprint(person[\"name\"])   # 小明\nprint(person[\"age\"])    # 20", caption: "用键取值" },
      { type: "p", t: "字典可以增删改：直接赋值改/加，<code>del</code> 删除键：" },
      { type: "code", code: "person = {\"name\": \"小明\"}\nperson[\"city\"] = \"北京\"   # 加一个键\nperson[\"age\"] = 21        # 改一个值\ndel person[\"name\"]         # 删掉 name\nprint(person)               # {'city': '北京', 'age': 21}", caption: "增、改、删" },
      { type: "callout", kind: "key", title: "列表 vs 字典", t: "列表用<b>位置</b>（0、1、2…）找元素；字典用<b>名字</b>（键）找值。要「按名字查」就用字典。" },
      { type: "callout", kind: "trap", title: "键不存在会报 KeyError", t: "<code>person[\"email\"]</code> 在没这个键时会报 KeyError。用 <code>person.get(\"email\")</code> 更安全，没键时返回 None。" },
    ]);

    mountPlayground(el, { initial: 'd = {"a": 1, "b": 2}\nprint(d["b"])\nd["c"] = 3\nprint(d)', label: "试试看" });

    choiceExercise(el, {
      lessonId: "m8a",
      exId: "m8a-c1",
      skills: [{ id: "dict-basic", label: "用字典" }],
      prompt: "设 <code>d = {\"x\": 10, \"y\": 20}</code>，<code>d[\"y\"]</code> 是多少？",
      options: [
        { label: "20", correct: true },
        { label: "10" },
        { label: "y" },
        { label: "报错" },
      ],
      explain: "键 \"y\" 对应的值是 20。",
      feedbackPerOption: {
        1: "那是键 x 的值。",
        2: "键是 y，不是它的值。",
        3: "键 y 存在，不会报错。",
      },
    });

    codeExercise(el, {
      lessonId: "m8a",
      exId: "m8a-c2",
      skills: [{ id: "dict-basic", label: "用字典" }],
      prompt: "设 <code>d = {\"语文\": 90, \"数学\": 85}</code>，写代码输出「数学」的成绩（85）。",
      starter: 'd = {"语文": 90, "数学": 85}',
      expectOutput: "85",
      explain: "<code>print(d[\"数学\"])</code> —— 用键「数学」取出值 85。",
    });
  },
});

registerLesson({
  id: "m8b",
  module: "m8",
  title: "遍历字典",
  titleEn: "Iterating Dictionaries",
  subtitle: "第 8 单元 · 第 2 节",
  requires: ["m8a"],
  objectives: [
    { id: "dict-iterate", label: "用 for 遍历字典的键和值" },
  ],
  exercises: ["m8b-c1", "m8b-c2"],
  render(el) {
    ui.parts(el, [
      { type: "p", t: "<code>for</code> 遍历字典时，默认拿到的是<b>键</b>；用 <code>.items()</code> 同时拿键和值：" },
      { type: "code", code: "scores = {\"语文\": 90, \"数学\": 85}\nfor k in scores:\n    print(k)   # 语文 数学（键）\n\nfor k, v in scores.items():\n    print(f\"{k}：{v}分\")   # 语文：90分 数学：85分", caption: "遍历键，或键值一起" },
      { type: "p", t: "其他常用：<code>.keys()</code> 所有键，<code>.values()</code> 所有值，<code>.items()</code> 键值对。" },
      { type: "code", code: "scores = {\"语文\": 90, \"数学\": 85}\nprint(list(scores.keys()))    # ['语文', '数学']\nprint(list(scores.values()))  # [90, 85]", caption: "keys 和 values" },
      { type: "callout", kind: "key", title: "items() 最常用", t: "想同时拿到键和值，<code>for k, v in d.items():</code> 是最常用的写法。" },
    ]);

    mountPlayground(el, { initial: 'd = {"a": 1, "b": 2, "c": 3}\nfor k, v in d.items():\n    print(k, v)', label: "试试看" });

    choiceExercise(el, {
      lessonId: "m8b",
      exId: "m8b-c1",
      skills: [{ id: "dict-iterate", label: "遍历字典" }],
      prompt: "想同时拿到键和值，遍历时用什么？",
      options: [
        { label: ".items()", correct: true },
        { label: ".keys()" },
        { label: ".values()" },
        { label: ".list()" },
      ],
      explain: "<code>for k, v in d.items()</code> 同时拿到键 k 和值 v。",
      feedbackPerOption: {
        1: "keys() 只有键。",
        2: "values() 只有值。",
        3: "没有 .list() 方法。",
      },
    });

    codeExercise(el, {
      lessonId: "m8b",
      exId: "m8b-c2",
      skills: [{ id: "dict-iterate", label: "遍历字典" }],
      prompt: "设 <code>d = {\"a\": 1, \"b\": 2}</code>。写代码，遍历字典并输出每个值（每行一个：先 1 再 2）。",
      starter: 'd = {"a": 1, "b": 2}',
      expectOutput: "1\n2",
      explain: "<code>for v in d.values(): print(v)</code> —— 依次输出 1、2。",
    });
  },
});

registerLesson({
  id: "m8c",
  module: "m8",
  title: "集合 set",
  titleEn: "Sets",
  subtitle: "第 8 单元 · 第 3 节",
  requires: ["m8b"],
  objectives: [
    { id: "set", label: "认识集合 set（去重、无序）" },
  ],
  exercises: ["m8c-c1", "m8c-c2"],
  render(el) {
    ui.parts(el, [
      { type: "p", t: "<b>集合 set</b> 和字典一样用花括号，但没有键值对，只有<b>不重复</b>的元素，而且<b>无序</b>：" },
      { type: "code", code: "nums = {1, 2, 2, 3, 3, 3}\nprint(nums)   # {1, 2, 3}（自动去重）", caption: "集合自动去掉重复" },
      { type: "p", t: "集合的招牌本领是<b>去重</b>和集合运算（交、并、差）：" },
      { type: "code", code: "a = {1, 2, 3}\nb = {2, 3, 4}\nprint(a & b)   # {2, 3}（交集）\nprint(a | b)   # {1, 2, 3, 4}（并集）\nprint(a - b)   # {1}（差集）", caption: "交集 &、并集 |、差集 -" },
      { type: "callout", kind: "key", title: "去重的惯用招", t: "列表去重：<code>list(set(我的列表))</code> —— 先变集合去掉重复，再变回列表。" },
      { type: "p", t: "集合无序，所以不能用索引 <code>s[0]</code> 取元素。要遍历用 for。" },
    ]);

    mountPlayground(el, { initial: 'nums = [1, 2, 2, 3]\nprint(set(nums))\nprint(list(set(nums)))', label: "试试看" });

    choiceExercise(el, {
      lessonId: "m8c",
      exId: "m8c-c1",
      skills: [{ id: "set", label: "用集合" }],
      prompt: "集合 set 有什么特点？",
      options: [
        { label: "元素不重复、无序", correct: true },
        { label: "元素有序、可重复" },
        { label: "元素有序、不重复" },
        { label: "元素不重复、可索引" },
      ],
      explain: "集合自动去重，且无序（不能用索引）。",
      feedbackPerOption: {
        1: "集合无序，不能保证顺序。",
        2: "集合无序。",
        3: "集合不能索引。",
      },
    });

    codeExercise(el, {
      lessonId: "m8c",
      exId: "m8c-c2",
      skills: [{ id: "set", label: "用集合去重" }],
      prompt: "设 <code>nums = [1, 2, 2, 3, 3, 3]</code>。写代码，把这个列表去重后输出（顺序不限，如 {1, 2, 3}）。",
      starter: "nums = [1, 2, 2, 3, 3, 3]",
      tests: [{ name: "去重后元素为 1、2、3", expr: "sorted(set(nums)) == [1, 2, 3]" }],
      explain: "<code>print(set(nums))</code> 或 <code>sorted(set(nums))</code>。集合自动去重。",
    });
  },
});
