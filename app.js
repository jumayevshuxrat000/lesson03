const addBtn = document.getElementById("add-btn");
const tasks = [];

addBtn.addEventListener("click", () => {
  const teskText = prompt("Enter the task please!!!");
  if (teskText) {
    tasks.push({ text: teskText, done: false });
    runner();
  }
});

const taskList = document.getElementById("task-list");

let currentFilter = "All";

document.querySelectorAll(".filters button").forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    runner();
  });
});

function runner() {
  taskList.innerHTML = "";

  let filteredTasks = tasks.filter(task => {
    if (currentFilter === "done") return task.done;
    if (currentFilter === "undone") return !task.done;
    return true;
  });

  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    if (task.done) {
      li.classList.add('done');
    }

    const originalIndex = tasks.indexOf(task);

    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button onclick="toggleDone(${originalIndex})"><i class="fa-solid fa-check"></i> Done</button>
        <button onclick="deleteTask(${originalIndex})"><i class="fa-solid fa-trash"></i></i> Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });

  updateCounter();
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  runner();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  runner();
}

function updateCounter() {
  const doneCount = tasks.filter(task => task.done).length;
  const undoneCount = tasks.filter(task => !task.done).length;

  document.getElementById('counter').textContent =
    `Bajarilgan: ${doneCount} ta | Bajarilmagan: ${undoneCount} ta`;
}


const darkModeToggle = document.getElementById("dark-mode-toggle");

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if(document.body.classList.contains("dark")){
    darkModeToggle.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode';
  }else{
    darkModeToggle.innerHTML = '<i class="fa-solid fa-moon"></i> Dark Mode';
  }
})


document.getElementById("date").textContent = new Date().toLocaleDateString("uz-UZ", {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});