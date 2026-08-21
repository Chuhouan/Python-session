// DOM 渲染助手：el / 结构化内容 parts / callout / codeblock / toast

export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v === null || v === undefined) continue;
    if (k === "class") node.className = v;
    else if (k === "html") node.innerHTML = v;
    else if (k === "text") node.textContent = v;
    else if (k === "value") node.value = v;
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2).toLowerCase(), v);
    else node.setAttribute(k, v);
  }
  for (const c of [].concat(children)) {
    if (c === null || c === undefined || c === false) continue;
    node.appendChild(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  return node;
}

export function clear(node) { node.innerHTML = ""; return node; }

export function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// 结构化正文片段：{ type: "h"|"p"|"ul"|"ol"|"code"|"callout", ... }
export function parts(container, list) {
  for (const part of list) {
    if (!part) continue;
    switch (part.type) {
      case "h":
        container.appendChild(el("h2", { class: "part-h", text: part.t }));
        break;
      case "p":
        container.appendChild(el("p", { class: "part-p", html: part.t }));
        break;
      case "ul":
        container.appendChild(listEl("ul", part.items));
        break;
      case "ol":
        container.appendChild(listEl("ol", part.items));
        break;
      case "code":
        container.appendChild(codeBlock(part.code, part.caption));
        break;
      case "callout":
        container.appendChild(callout(part.kind || "key", part.title, part.t));
        break;
      default:
        break;
    }
  }
}

function listEl(tag, items) {
  const ul = el(tag, { class: "part-list" });
  for (const it of items || []) {
    ul.appendChild(el("li", { html: typeof it === "string" ? it : it.t }));
  }
  return ul;
}

export function codeBlock(code, caption) {
  const wrap = el("figure", { class: "codeblock" });
  if (caption) wrap.appendChild(el("figcaption", { class: "codeblock-cap", text: caption }));
  wrap.appendChild(el("pre", {}, [el("code", { class: "codeblock-code", text: code })]));
  return wrap;
}

export function callout(kind, title, text) {
  const c = el("div", { class: "callout callout-" + kind });
  if (title) c.appendChild(el("div", { class: "callout-title", text: title }));
  if (text) c.appendChild(el("div", { class: "callout-body", html: text }));
  return c;
}

export function toast(msg, kind = "info") {
  let root = document.getElementById("toast-root");
  if (!root) {
    root = el("div", { id: "toast-root" });
    document.body.appendChild(root);
  }
  const t = el("div", { class: "toast toast-" + kind, text: msg });
  root.appendChild(t);
  setTimeout(() => {
    t.classList.add("out");
    setTimeout(() => t.remove(), 320);
  }, 2600);
}

export function openModal() {
  const root = document.getElementById("modal-root");
  const overlay = el("div", { class: "modal-overlay" });
  const box = el("div", { class: "modal", role: "dialog", "aria-modal": "true" });
  overlay.appendChild(box);
  root.appendChild(overlay);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.remove(); });
  return box;
}
