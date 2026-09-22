# 📝 Interactive To-Do List

A clean, modern, and fully responsive To-Do List web app built with **pure HTML, CSS, and JavaScript** — no frameworks, no libraries, no build tools.

Tasks are saved to the browser's `localStorage`, so they stay put even after a page refresh.

![Status](https://img.shields.io/badge/status-ready-brightgreen)
![Stack](https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JS-blue)
![License](https://img.shields.io/badge/license-MIT-orange)

---

## ✨ Features

- ➕ **Add tasks** via input field + button (or press `Enter`)
- ✅ **Mark as complete** with a satisfying checkbox animation
- 🗑️ **Delete tasks** with a smooth exit animation
- 💾 **Persistent storage** — tasks survive page refreshes via `localStorage`
- ⚠️ **Empty-input validation** with a shake animation + warning text
- 🧹 **Clear completed** to bulk-remove finished tasks
- 📱 **Fully responsive** — desktop, tablet, mobile, and tiny screens
- ♿ **Accessible** — ARIA labels, focus styles, `prefers-reduced-motion` support
- 🎨 **Modern UI** — glassmorphism, gradient blobs, hover lift, smooth transitions
- 🚫 **Zero dependencies**

---

## 🛠️ Tech Stack

| Layer    | Tech                              |
| -------- | --------------------------------- |
| Markup   | HTML5 (semantic)                  |
| Styling  | CSS3 (custom properties, flexbox, animations, media queries) |
| Logic    | Vanilla JS (ES6+, DOM API, localStorage) |
| Storage  | Browser `localStorage`            |

---

## 📂 Project Structure

```
todo-list/
├── index.html        # App markup
├── css/
│   └── style.css     # All styles + animations + responsive rules
├── js/
│   └── script.js     # State, rendering, persistence, event handlers
└── README.md         # You are here
```

---

## 🚀 Getting Started

It's a static project — no build, no server, no install.

### Option A — Open it directly

1. Download or clone this folder.
2. Double-click `index.html` — it opens in your default browser. Done.

### Option B — Run a local server (recommended for development)

If you have Python 3:

```bash
cd todo-list
python -m http.server 8000
```

Then open <http://localhost:8000> in your browser.

Or with Node.js (no install required via `npx`):

```bash
npx serve todo-list
```

---

## 🎯 How to Use

| Action                 | How                                          |
| ---------------------- | -------------------------------------------- |
| Add a task             | Type in the input → click **Add Task** or press `Enter` |
| Mark complete / active | Click the **checkbox**, the **task text**, or the **✓ icon** |
| Delete a task          | Click the **trash icon**                     |
| Bulk remove completed  | Click **Clear completed** in the footer      |
| Reset everything       | Open DevTools → Application → Local Storage → delete the `todo-list-tasks-v1` key |

---

## 🎨 Design Highlights

- **Glassmorphism card** with `backdrop-filter: blur` for a frosted look.
- **Animated background blobs** — three soft circles floating slowly behind the app.
- **Micro-interactions** — buttons lift on hover, check icon scales on hover, delete trash tilts on hover.
- **Stagger-free animations** — every new task slides in, every deleted task fades out smoothly.
- **Token-based colors** via CSS custom properties (`--primary`, `--success`, etc.) — easy to re-theme.
- **Reduced motion** support: animations are disabled automatically when the user has that OS preference set.

---

## ♿ Accessibility

- Semantic landmarks: `<main>`, `<header>`, `<section>`, `<footer>`.
- ARIA labels on icon-only buttons (`aria-label="Delete task"`).
- `role="alert"` + `aria-live="polite"` on the warning message.
- Visible focus outlines via `:focus-visible`.
- Respects `prefers-reduced-motion` for users sensitive to motion.

---

## 🌐 Browser Compatibility

Tested in modern Chromium, Firefox, and Safari. Uses `backdrop-filter` (gracefully degrades to a slightly less frosted look on older browsers) and `localStorage` (IE9+, all evergreen browsers).

---

## 📸 Screenshots

> Add a screenshot by placing an image in the project root and referencing it like:
> `![To-Do List screenshot](./screenshot.png)`

---

## 📝 License

MIT — do whatever you want with this code, attribution appreciated but not required.

---

Made with ❤ as **Task 3** of the *NV ProjectLab* series.