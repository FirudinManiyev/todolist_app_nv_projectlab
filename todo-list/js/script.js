/* ============================================================
   Interactive To-Do List — JavaScript
   Pure DOM manipulation + localStorage for persistence.
   ============================================================ */

/* ---------- 1. DOM References ---------- */
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const warning = document.getElementById("warning");
const totalCount = document.getElementById("totalCount");
const doneCount = document.getElementById("doneCount");
const clearBtn = document.getElementById("clearBtn");

/* ---------- 2. State ---------- */
const STORAGE_KEY = "todo-list-tasks-v1";

/** @type {{id:string, text:string, completed:boolean}[]} */
let tasks = loadTasks();

/* ---------- 3. Storage ---------- */
function loadTasks() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
        console.warn("Could not load tasks from localStorage:", err);
        return [];
    }
}

function saveTasks() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (err) {
        console.warn("Could not save tasks to localStorage:", err);
    }
}

/* ---------- 4. UI Helpers ---------- */
function showWarning(message) {
    warning.textContent = message;
    // Restart the shake animation on each call
    warning.style.animation = "none";
    // Force reflow so the animation can restart
    void warning.offsetWidth;
    warning.style.animation = "";
}

function clearWarning() {
    warning.textContent = "";
}

function updateStats() {
    const total = tasks.length;
    const done = tasks.filter(t => t.completed).length;

    totalCount.textContent = total;
    doneCount.textContent = done;

    // Show/hide empty state
    emptyState.hidden = total > 0;

    // Show/hide "clear completed" button
    clearBtn.hidden = done === 0;
}

/* ---------- 5. Build a Single Task Element ---------- */
function createTaskElement(task) {
    const li = document.createElement("li");
    li.className = "task-item";
    li.dataset.id = task.id;
    if (task.completed) li.classList.add("completed");

    /* -- Checkbox (click to toggle complete) -- */
    const check = document.createElement("button");
    check.type = "button";
    check.className = "task-check";
    check.setAttribute("aria-label", task.completed ? "Mark as active" : "Mark as completed");
    check.innerHTML = `
        <svg viewBox="0 0 24 24">
            <polyline points="4 12 10 18 20 6"/>
        </svg>
    `;
    check.addEventListener("click", () => toggleComplete(task.id));

    /* -- Task text -- */
    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;
    span.title = task.text;
    span.addEventListener("click", () => toggleComplete(task.id));

    /* -- Complete button (icon) -- */
    const completeBtn = document.createElement("button");
    completeBtn.type = "button";
    completeBtn.className = "action-btn complete-btn";
    completeBtn.setAttribute("aria-label", "Toggle complete");
    completeBtn.innerHTML = `
        <svg viewBox="0 0 24 24">
            <polyline points="4 12 10 18 20 6"/>
        </svg>
    `;
    completeBtn.addEventListener("click", () => toggleComplete(task.id));

    /* -- Delete button -- */
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "action-btn delete-btn";
    deleteBtn.setAttribute("aria-label", "Delete task");
    deleteBtn.innerHTML = `
        <svg viewBox="0 0 24 24">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
            <path d="M10 11v6M14 11v6"/>
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
        </svg>
    `;
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    /* -- Assemble -- */
    li.appendChild(check);
    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    return li;
}

/* ---------- 6. Actions ---------- */
function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        showWarning("Please enter a task before adding.");
        taskInput.focus();
        return;
    }

    clearWarning();

    const task = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        text: text,
        completed: false
    };

    tasks.push(task);
    const el = createTaskElement(task);
    taskList.appendChild(el);

    taskInput.value = "";
    taskInput.focus();

    saveTasks();
    updateStats();
}

function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    task.completed = !task.completed;

    const el = taskList.querySelector(`[data-id="${id}"]`);
    if (el) el.classList.toggle("completed", task.completed);

    saveTasks();
    updateStats();
}

function deleteTask(id) {
    const el = taskList.querySelector(`[data-id="${id}"]`);
    if (!el) return;

    // Play exit animation, then remove from DOM + state
    el.classList.add("removing");
    el.addEventListener("animationend", function handler() {
        el.removeEventListener("animationend", handler);
        el.remove();
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        updateStats();
    });
}

function clearCompleted() {
    // Animate out each completed task, then update state once
    const completedEls = taskList.querySelectorAll(".task-item.completed");

    if (completedEls.length === 0) return;

    completedEls.forEach(el => {
        el.classList.add("removing");
        el.addEventListener("animationend", function handler() {
            el.removeEventListener("animationend", handler);
            el.remove();
        });
    });

    // After the animation duration, prune the state
    setTimeout(() => {
        tasks = tasks.filter(t => !t.completed);
        saveTasks();
        updateStats();
    }, 400);
}

/* ---------- 7. Render All Saved Tasks on Load ---------- */
function renderInitial() {
    tasks.forEach(task => {
        taskList.appendChild(createTaskElement(task));
    });
    updateStats();
}

/* ---------- 8. Event Listeners ---------- */
addBtn.addEventListener("click", addTask);

// Enter key in input = add
taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
});

// Clear warning as soon as user starts typing again
taskInput.addEventListener("input", clearWarning);

// Clear completed button
clearBtn.addEventListener("click", clearCompleted);

/* ---------- 9. Boot ---------- */
renderInitial();