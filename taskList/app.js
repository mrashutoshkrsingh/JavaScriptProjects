const form = document.getElementById("task-form");
const taskList = document.getElementsByClassName("collection")[0];
const clearBtn = document.getElementsByClassName("clear-tasks")[0];
const filter = document.getElementById("filter");
const taskInput = document.getElementById("task");

loadEventListeners();

function loadEventListeners() {
  // DOM Load event
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add task event
  form.addEventListener("submit", addTask);
  // Remove task event
  taskList.addEventListener("click", removeTask);
  // Clear task event
  clearBtn.addEventListener("click", clearTasks);
  // Filter tasks
  filter.addEventListener("keyup", filterTasks);
}

function addTask(e) {
  e.preventDefault();
  const text = taskInput.value;
  if (!text) {
    alert("Please add a Task");
    return;
  }
  let li = document.createElement("li");
  li.className = "collection-item";
  li.appendChild(document.createTextNode(text));

  let link = document.createElement("a");
  link.className = "delete-item secondary-content";

  link.innerHTML = '<i class="fa fa-remove"></i>';

  li.appendChild(link);

  taskList.appendChild(li);
  taskInput.value = "";
}

function getTasks() {}

function removeTask(e) {
  e.preventDefault();

  if(e.target.parentElement.parentElement.className==='collection-item');
  e.target.parentElement.parentElement.remove();
}

function clearTasks(e) {
  e.preventDefault();
  taskList.innerHTML = "";
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != '-1') {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
