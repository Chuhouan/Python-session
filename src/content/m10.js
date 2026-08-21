// 第十单元：面向对象（类与对象、实例方法、__str__、继承）
import { registerLesson } from "../router.js";
import * as ui from "../ui.js";
import { mountPlayground } from "../playground.js";
import { choiceExercise, codeExercise, fillExercise } from "../exercises.js";

registerLesson({
  id: "m10a",
  module: "m10",
  title: "类与对象",
  titleEn: "Classes & Objects",
  subtitle: "第 10 单元 · 第 1 节",
  requires: ["m9c"],
  objectives: [
    { id: "class-def", label: "用 class 定义一个新类型" },
    { id: "init-self", label: "用 __init__ 和 self 给对象存属性" },
    { id: "instantiate", label: "创建对象并访问它的属性" },
  ],
  exercises: ["m10a-c1", "m10a-c2"],
  render(el) {
    ui.parts(el, [
      { type: "p", t: "到现在我们用的都是 Python 现成的类型：<code>int</code>、<code>str</code>、<code>list</code>。可真实世界里你想表示的是「一个学生」「一笔订单」「一篇文献」——它们各自带着<b>数据</b>（名字、金额、作者）。<b>类（class）</b>就是让你自己造新类型。" },
      { type: "p", t: "一句话记两个词：<b>类（class）是造对象的模板</b>，<b>对象（object / 实例）是按模板造出来的具体东西</b>。就像「狗」是一个类，「旺财」是它的一只具体对象。" },
      { type: "code", code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n\nd = Dog(\"旺财\")\nprint(d.name)   # 旺财", caption: "定义一个 Dog 类，造一只叫旺财的狗" },
      { type: "callout", kind: "key", title: "__init__ 和 self 是核心", t: "<code>__init__</code> 是<b>初始化方法</b>，造对象时自动运行；<code>self</code> 指<b>当前这个对象自己</b>。<code>self.name = name</code> 的意思就是「把我自己的 name 属性，设成传进来的 name」。" },
      { type: "callout", kind: "trap", title: "两个下划线，别写少", t: "<code>__init__</code> 前后各是<b>两个</b>下划线（英文的 _ 连敲两下）。写成一个下划线 <code>_init_</code> 或只写 <code>init</code> 都不会被 Python 自动调用。" },
      { type: "p", t: "调用 <code>Dog(\"旺财\")</code> 就是在「用模板造对象」，Python 自动调 <code>__init__</code>，把 <code>\"旺财\"</code> 传给 <code>name</code>。造出来的对象 <code>d</code> 就有了属性 <code>d.name</code>。" },
    ]);

    mountPlayground(el, { initial: "class Dog:\n    def __init__(self, name):\n        self.name = name\n\nd = Dog(\"旺财\")\nprint(d.name)", label: "试试看" });

    choiceExercise(el, {
      lessonId: "m10a",
      exId: "m10a-c1",
      skills: [{ id: "oop-class", label: "用 class 定义类型" }],
      prompt: "类（class）和对象（对象/实例）的关系是？",
      options: [
        { label: "类是模板，对象是按模板造出的具体东西", correct: true },
        { label: "对象是模板，类是造出来的东西" },
        { label: "类和对象是同一个东西" },
        { label: "类只能有一个对象" },
      ],
      explain: "类 = 模板；对象 = 实例。一个类可以造出许多个对象。",
      feedbackPerOption: {
        1: "方向反了。",
        2: "不是同一个，类是类型，对象是具体值。",
        3: "一个类能造无数个对象，就像「狗」能造出旺财、大黄……",
      },
    });

    codeExercise(el, {
      lessonId: "m10a",
      exId: "m10a-c2",
      skills: [{ id: "oop-class", label: "定义类并创建对象" }],
      prompt: "定义类 <code>Dog</code>，<code>__init__</code> 接收参数 <code>name</code>，把 <code>self.name</code> 设为它。",
      starter: "",
      tests: [
        { name: "Dog('旺财').name 是 '旺财'", expr: "Dog('旺财').name == '旺财'" },
        { name: "Dog('大黄').name 是 '大黄'", expr: "Dog('大黄').name == '大黄'" },
      ],
      explain: "<code>class Dog:</code> 里写 <code>def __init__(self, name): self.name = name</code>。",
    });
  },
});

registerLesson({
  id: "m10b",
  module: "m10",
  title: "实例方法",
  titleEn: "Instance Methods",
  subtitle: "第 10 单元 · 第 2 节",
  requires: ["m10a"],
  objectives: [
    { id: "method", label: "给类加方法，第一个参数是 self" },
    { id: "call-method", label: "通过对象调用方法" },
  ],
  exercises: ["m10b-c1", "m10b-c2"],
  render(el) {
    ui.parts(el, [
      { type: "p", t: "对象除了有<b>数据</b>（属性），还能有<b>动作</b>（方法）。方法就是写在 <code>class</code> 里的函数，只是它的<b>第一个参数永远是 <code>self</code></b>——指调用它的那个对象。" },
      { type: "code", code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n\n    def bark(self):\n        return f\"{self.name}：汪汪！\"\n\nd = Dog(\"旺财\")\nprint(d.bark())   # 旺财：汪汪！", caption: "bark 是一个实例方法" },
      { type: "callout", kind: "key", title: "调用时不写 self", t: "方法定义里写 <code>self</code>，但<b>调用时不用传</b>：<code>d.bark()</code> 会自动把 <code>d</code> 当成 self。这就是方法能拿到「自己的 name」的原因。" },
      { type: "callout", kind: "trap", title: "方法在类里要缩进", t: "方法 <code>bark</code> 必须缩进在 <code>class</code> 下面（和 <code>__init__</code> 平级）。忘了缩进，它就成了类外面的普通函数，访问不到 self。" },
      { type: "p", t: "方法里可以用 <code>self.属性</code> 访问对象自己的数据。这是面向对象最核心的写法：<b>数据 + 操作数据的方法装在一起</b>。" },
    ]);

    mountPlayground(el, { initial: "class Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        return self.name + \" 汪汪\"\n\nprint(Dog(\"大黄\").bark())", label: "试试看" });

    choiceExercise(el, {
      lessonId: "m10b",
      exId: "m10b-c1",
      skills: [{ id: "oop-method", label: "写实例方法" }],
      prompt: "实例方法的第一个参数约定叫什么？",
      options: [
        { label: "self", correct: true },
        { label: "this" },
        { label: "obj" },
        { label: "不用写" },
      ],
      explain: "Python 约定第一个参数叫 <code>self</code>，指向对象自己。",
      feedbackPerOption: {
        1: "this 是 Java/JS 的写法，Python 用 self。",
        2: "obj 不是约定名，虽然能用但不推荐。",
        3: "必须写，而且写 self。",
      },
    });

    codeExercise(el, {
      lessonId: "m10b",
      exId: "m10b-c2",
      skills: [{ id: "oop-method", label: "写实例方法" }],
      prompt: "给 <code>Dog</code> 加一个方法 <code>bark(self)</code>，返回字符串 <code>\"汪汪！\"</code>。",
      starter: "class Dog:\n    def __init__(self, name):\n        self.name = name\n",
      tests: [{ name: "Dog('x').bark() 是 '汪汪！'", expr: "Dog('x').bark() == '汪汪！'" }],
      explain: "在 class 里加 <code>def bark(self): return \"汪汪！\"</code>，注意缩进与 __init__ 平级。",
    });
  },
});

registerLesson({
  id: "m10c",
  module: "m10",
  title: "__str__ 友好打印",
  titleEn: "__str__",
  subtitle: "第 10 单元 · 第 3 节",
  requires: ["m10b"],
  objectives: [
    { id: "str-dunder", label: "用 __str__ 让 print 输出友好内容" },
  ],
  exercises: ["m10c-c1", "m10c-c2"],
  render(el) {
    ui.parts(el, [
      { type: "p", t: "直接 <code>print(d)</code> 一个对象，会得到 <code>&lt;__main__.Dog object at 0x…&gt;</code> 这种看不懂的东西。定义 <code>__str__</code> 方法，就能指定 print 时显示什么。" },
      { type: "code", code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n    def __str__(self):\n        return f\"狗：{self.name}\"\n\nd = Dog(\"旺财\")\nprint(d)   # 狗：旺财", caption: "__str__ 决定 print 的显示" },
      { type: "callout", kind: "key", title: "双下划线方法 = 特殊方法", t: "像 <code>__init__</code>、<code>__str__</code> 这种前后双下划线的方法叫<b>特殊方法（dunder）</b>。你不用手动调它们，Python 在特定时机自动调：造对象时调 <code>__init__</code>，print 时调 <code>__str__</code>。" },
      { type: "p", t: "<code>__str__</code> 必须 <code>return</code> 一个字符串，不能 print。这样别人 print 你的对象时，看到的才是清爽的一行字。" },
    ]);

    mountPlayground(el, { initial: "class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    def __str__(self):\n        return f\"({self.x}, {self.y})\"\n\nprint(Point(3, 4))", label: "试试看" });

    choiceExercise(el, {
      lessonId: "m10c",
      exId: "m10c-c1",
      skills: [{ id: "oop-str", label: "用 __str__" }],
      prompt: "想让 print(对象) 显示友好内容，该定义哪个方法？",
      options: [
        { label: "__str__", correct: true },
        { label: "__init__" },
        { label: "print" },
        { label: "__print__" },
      ],
      explain: "<code>__str__</code> 返回的字符串，就是 print 时显示的内容。",
      feedbackPerOption: {
        1: "__init__ 是造对象时初始化用的。",
        2: "print 不是方法，是内置函数。",
        3: "没有 __print__ 这个特殊方法。",
      },
    });

    codeExercise(el, {
      lessonId: "m10c",
      exId: "m10c-c2",
      skills: [{ id: "oop-str", label: "用 __str__" }],
      prompt: "给 <code>Dog</code> 加 <code>__str__(self)</code>，返回 <code>self.name</code>。",
      starter: "class Dog:\n    def __init__(self, name):\n        self.name = name\n",
      tests: [{ name: "str(Dog('旺财')) 是 '旺财'", expr: "str(Dog('旺财')) == '旺财'" }],
      explain: "<code>def __str__(self): return self.name</code>。print 或 str() 都会用这个返回值。",
    });
  },
});

registerLesson({
  id: "m10d",
  module: "m10",
  title: "继承",
  titleEn: "Inheritance",
  subtitle: "第 10 单元 · 第 4 节",
  requires: ["m10c"],
  objectives: [
    { id: "inherit", label: "用 class 子类(父类) 继承" },
    { id: "override", label: "重写父类的方法" },
  ],
  exercises: ["m10d-c1", "m10d-c2"],
  render(el) {
    ui.parts(el, [
      { type: "p", t: "<b>继承（inheritance）</b>让一个类复用另一个类的代码。写成 <code>class 子类(父类):</code>，子类自动拥有父类的所有属性和方法。" },
      { type: "code", code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        return f\"{self.name}：汪汪！\"\n\nclass Puppy(Dog):\n    def bark(self):\n        return f\"{self.name}：嘤嘤！\"\n\np = Puppy(\"小奶狗\")\nprint(p.bark())   # 小奶狗：嘤嘤！", caption: "Puppy 继承 Dog，重写了 bark" },
      { type: "callout", kind: "key", title: "重写（override）", t: "子类里写一个和父类同名的方法，就<b>覆盖</b>了父类的版本——Puppy 的 <code>bark</code> 替换掉了 Dog 的。子类没重写的方法，照用父类的。" },
      { type: "callout", kind: "trap", title: "括号里是父类名", t: "<code>class Puppy(Dog)</code> 的括号里写<b>父类的名字</b>，不是字符串、不用引号。忘了括号里的父类，Puppy 就不会继承 Dog。" },
      { type: "p", t: "继承的价值是<b>别重复自己</b>：共同的东西放父类，差异的地方子类重写。Puppy 不用重新写一遍 <code>__init__</code>，直接继承了 Dog 的。" },
    ]);

    mountPlayground(el, { initial: "class Animal:\n    def __init__(self, name):\n        self.name = name\n\nclass Cat(Animal):\n    def speak(self):\n        return self.name + \" 喵\"\n\nprint(Cat(\"咪咪\").speak())", label: "试试看" });

    choiceExercise(el, {
      lessonId: "m10d",
      exId: "m10d-c1",
      skills: [{ id: "oop-inherit", label: "用继承" }],
      prompt: "让子类 Puppy 继承父类 Dog，正确写法是？",
      options: [
        { label: "class Puppy(Dog):", correct: true },
        { label: "class Puppy extends Dog:" },
        { label: "class Dog(Puppy):" },
        { label: "class Puppy(Dog)" },
      ],
      explain: "Python 用 <code>class 子类(父类):</code> 表示继承。",
      feedbackPerOption: {
        1: "extends 是 Java 的写法。",
        2: "方向反了，那是让 Dog 继承 Puppy。",
        3: "少了结尾的冒号。",
      },
    });

    codeExercise(el, {
      lessonId: "m10d",
      exId: "m10d-c2",
      skills: [{ id: "oop-inherit", label: "用继承并重写" }],
      prompt: "定义类 <code>Puppy</code> 继承 <code>Dog</code>，重写 <code>bark(self)</code> 返回 <code>\"嘤嘤！\"</code>。",
      starter: "class Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        return \"汪汪！\"\n",
      tests: [
        { name: "Puppy 是 Dog 的子类", expr: "issubclass(Puppy, Dog)" },
        { name: "Puppy('x').bark() 是 '嘤嘤！'", expr: "Puppy('x').bark() == '嘤嘤！'" },
      ],
      explain: "<code>class Puppy(Dog):</code> 里写 <code>def bark(self): return \"嘤嘤！\"</code> 即可覆盖父类版本。",
    });
  },
});
