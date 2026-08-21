// 课程目录：模块清单 + 各模块包含的小节顺序
// 先 import 所有内容文件（注册 lesson），再注册 module（引用 lesson id）
import "./m1.js";
import "./m2.js";
import "./m3.js";
import "./m4.js";
import "./m5.js";
import "./m6.js";
import "./m7.js";
import "./m8.js";
import "./m9.js";
import "./m10.js";
import { registerModule } from "../router.js";

registerModule({ id: "m1", title: "1 · 起步", titleEn: "Getting Started", lessons: ["m1a", "m1b"] });
registerModule({ id: "m2", title: "2 · 数据类型", titleEn: "Data Types", lessons: ["m2a", "m2b", "m2c"] });
registerModule({ id: "m3", title: "3 · 字符串", titleEn: "Strings", lessons: ["m3a", "m3b", "m3c"] });
registerModule({ id: "m4", title: "4 · 输入输出", titleEn: "Input & Output", lessons: ["m4a", "m4b"] });
registerModule({ id: "m5", title: "5 · 条件判断", titleEn: "Conditionals", lessons: ["m5a", "m5b", "m5c"] });
registerModule({ id: "m6", title: "6 · 循环", titleEn: "Loops", lessons: ["m6a", "m6b", "m6c"] });
registerModule({ id: "m7", title: "7 · 列表", titleEn: "Lists", lessons: ["m7a", "m7b", "m7c"] });
registerModule({ id: "m8", title: "8 · 字典", titleEn: "Dictionaries", lessons: ["m8a", "m8b", "m8c"] });
registerModule({ id: "m9", title: "9 · 函数", titleEn: "Functions", lessons: ["m9a", "m9b", "m9c"] });
registerModule({ id: "m10", title: "10 · 面向对象", titleEn: "Object-Oriented", lessons: ["m10a", "m10b", "m10c", "m10d"] });
