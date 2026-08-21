// 应用入口：先加载目录（内部注册所有 lesson/module），再启动路由
import "./content/catalog.js";
import { init } from "./router.js";

init();
