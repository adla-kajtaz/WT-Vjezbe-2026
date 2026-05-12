const removeFinishedBtn = document.getElementById("removeFinishedBtn");
const removeAllBtn = document.getElementById("removeAllBtn");

removeFinishedBtn.addEventListener("click", () => {
  const taskList = document.getElementById("taskList");
  const tasks = taskList.querySelectorAll(".task-checkbox");
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].checked === true) {
      taskList.removeChild(tasks[i].parentNode);
    }
  }
});

removeAllBtn.addEventListener("click", () => {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
});

const addTaskBtn = document.getElementById("addTaskBtn");

addTaskBtn.addEventListener("click", () => {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");
  const newTask = document.createElement("li");
  if (taskInput.value === "") {
    return alert("Please enter a task");
  }
  newTask.innerHTML = `
        <input type="checkbox" class="task-checkbox">
        <span class="task-text">${taskInput.value}</span>
    `;
  taskList.appendChild(newTask);
  taskInput.value = "";
});
