// ===============================
// ПОЛУЧАЕМ ЭЛЕМЕНТЫ
// ===============================

const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const emptyText = document.getElementById("emptyText");

const taskCounter = document.getElementById("taskCounter");
const completedCounter = document.getElementById("completedCounter");
const remainingCounter = document.getElementById("remainingCounter");

const progressBar = document.getElementById("progressBar");
const searchInput = document.getElementById("searchInput");
const clearCompleted = document.getElementById("clearCompleted");

// ===============================
// ДАННЫЕ
// ===============================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ===============================
// СОХРАНЕНИЕ
// ===============================

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

// ===============================
// ОБНОВЛЕНИЕ ИНТЕРФЕЙСА
// ===============================

function updateCounter() {

    taskCounter.textContent = tasks.length;

}

function updateCompletedCounter() {

    const completed =
        document.querySelectorAll(".completed").length;

    completedCounter.textContent = completed;

    remainingCounter.textContent =
    tasks.length - completed;

}

function updateProgress() {

    const completed =
        document.querySelectorAll(".completed").length;

    const percent =
        tasks.length === 0
            ? 0
            : completed / tasks.length * 100;

    progressBar.style.width =
        percent + "%";

}

function updateUI() {

    updateCounter();

    updateCompletedCounter();

    updateProgress();

}

// ===============================
// СОЗДАНИЕ ЗАДАЧИ
// ===============================

function createTask(task) {

    const li = document.createElement("li");
    li.textContent = task;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "🗑️";

    deleteButton.addEventListener("click", function (event) {

        event.stopPropagation();

        const index = tasks.indexOf(task);

        if (index !== -1) {
            tasks.splice(index, 1);
        }

        saveTasks();

        li.classList.add("deleting");

        setTimeout(function () {

            li.remove();

            if (tasks.length === 0) {
                emptyText.style.display = "block";
            }

            updateUI();

        }, 300);

    });

    li.addEventListener("click", function () {

        li.classList.toggle("completed");

        updateUI();

    });

    li.appendChild(deleteButton);

    taskList.appendChild(li);

}

// ===============================
// ЗАГРУЗКА СОХРАНЕННЫХ ЗАДАЧ
// ===============================

tasks.forEach(function (task) {

    createTask(task);

});

if (tasks.length > 0) {

    emptyText.style.display = "none";

}

updateUI();

// ===============================
// ДОБАВЛЕНИЕ ЗАДАЧИ
// ===============================

addButton.addEventListener("click", function () {

    const task = taskInput.value.trim();

    if (task === "") {

        return;

    }

    tasks.push(task);

    createTask(task);

    saveTasks();

    updateUI();

    taskInput.value = "";

    emptyText.style.display = "none";

});

// ===============================
// ENTER
// ===============================

taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        addButton.click();

    }

});

// ===============================
// ПОИСК
// ===============================

searchInput.addEventListener("input", function () {

    const search = searchInput.value.toLowerCase();

    const allTasks = taskList.querySelectorAll("li");

    allTasks.forEach(function (item) {

        const text = item.firstChild.textContent.toLowerCase();

        if (text.includes(search)) {

            item.style.display = "flex";

        } else {

            item.style.display = "none";

        }

    });

});

// ===============================
// ОЧИСТИТЬ ВЫПОЛНЕННЫЕ
// ===============================

clearCompleted.addEventListener("click", function () {

    const completedTasks = document.querySelectorAll(".completed");

    completedTasks.forEach(function (taskElement) {

        const text = taskElement.firstChild.textContent;

        const index = tasks.indexOf(text);

        if (index !== -1) {
            tasks.splice(index, 1);
        }

        taskElement.remove();

    });

    saveTasks();

    if (tasks.length === 0) {
        emptyText.style.display = "block";
    }

    updateUI();

});