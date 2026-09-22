/* Interactive To-Do List
   Pure JavaScript - DOM manipulation only. */

// 1. Select DOM elements we will work with
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const warning = document.getElementById("warning");
const taskCount = document.getElementById("taskCount");

// 2. Helper: show a message under the input
function showWarning(message) {
    warning.textContent = message;
}

// 3. Helper: clear the warning
function clearWarning() {
    warning.textContent = "";
}

// 4. Helper: update the task counter at the bottom
function updateCount() {
    const total = taskList.children.length;
    taskCount.textContent = total + (total === 1 ? " task" : " tasks");
}

// 5. Main action: create a new <li> with task text + buttons
function createTaskElement(text) {
    // Create <li>
    const li = document.createElement("li");
    li.className = "task-item";

    // Task text (clickable to toggle complete)
    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = text;
    span.addEventListener("click", toggleComplete);

    // Complete button
    const completeBtn = document.createElement("button");
    completeBtn.type = "button";
    completeBtn.className = "complete-btn";
    completeBtn.textContent = "Complete";
    completeBtn.addEventListener("click", toggleComplete);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", deleteTask);

    // Put everything inside <li>
    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    return li;
}

// 6. Add a new task
function addTask() {
    const text = taskInput.value.trim();

    // Validation: prevent empty tasks
    if (text === "") {
        showWarning("Please enter a task before adding.");
        taskInput.focus();
        return;
    }

    clearWarning();

    // Build the task and append to the list
    const taskEl = createTaskElement(text);
    taskList.appendChild(taskEl);

    // Reset input + counter
    taskInput.value = "";
    taskInput.focus();
    updateCount();
}

// 7. Toggle "completed" state on a task
function toggleComplete(event) {
    // The click may come from the text span OR the Complete button
    const taskItem = event.target.closest(".task-item");
    if (taskItem) {
        taskItem.classList.toggle("completed");
    }
}

// 8. Delete a task from the list
function deleteTask(event) {
    const taskItem = event.target.closest(".task-item");
    if (taskItem) {
        taskList.removeChild(taskItem);
        updateCount();
    }
}

// 9. Event listeners
addBtn.addEventListener("click", addTask);

// Press Enter in the input = click Add Task
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Typing clears any previous warning
taskInput.addEventListener("input", clearWarning);

// Initial counter render
updateCount();