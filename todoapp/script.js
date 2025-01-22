document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskList = document.getElementById("task-list");

  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => renderTask(task.text, task.completed));
  };

  const saveTasks = () => {
    const tasks = [];
    document.querySelectorAll("#task-list li").forEach((li) => {
      tasks.push({
        text: li.querySelector(".task-text").innerText,
        completed: li.classList.contains("completed"),
      });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const renderTask = (text, completed = false) => {
    const li = document.createElement("li");
    li.className = completed ? "completed" : "";

    const span = document.createElement("span");
    span.className = "task-text";
    span.innerText = text;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const completeBtn = document.createElement("button");
    completeBtn.className = "complete";
    completeBtn.innerText = completed ? "Undo" : "Complete";
    completeBtn.addEventListener("click", () => {
      li.classList.toggle("completed");
      completeBtn.innerText = li.classList.contains("completed")
        ? "Undo"
        : "Complete";
      saveTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", () => {
      li.remove();
      saveTasks();
    });

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);
    li.appendChild(span);
    li.appendChild(actions);
    taskList.appendChild(li);
    saveTasks();
  };

  addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      renderTask(taskText);
      taskInput.value = "";
    }
  });

  loadTasks();
});
