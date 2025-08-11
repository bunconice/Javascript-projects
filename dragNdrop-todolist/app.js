const dropZone = document.querySelectorAll(".drop-zone");
const input = document.getElementById('todo-input');
const form = document.querySelector('form');
const todoSection = document.getElementById('todo-section');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTask();
})

form.addEventListener('keydown', (e) => {
  if (e.key === "Enter") {
    addTask()
  }
})

function addTask() {
  if (!input.value) return;
  const p = document.createElement("p");
  p.className = "task";
  p.draggable = true;
  p.textContent = input.value.trim();
  todoSection.appendChild(p);
  input.value = "";
}

dropZone.forEach(zone => {
  handleDragstart(zone);
  handleDragover(zone);
});

function handleDragstart(zone) {
  zone.addEventListener('dragstart', (e) => {
    if (e.target.classList.contains('task')) {
      e.target.classList.add('is-dragging');
    }
  });

  zone.addEventListener('dragend', (e) => {
    if (e.target.classList.contains("task")) {
      e.target.classList.remove("is-dragging");
    }
  });
}

function handleDragover(zone) {
  zone.addEventListener('dragover', (e) => {
    e.preventDefault();

    const draggedTask = document.querySelector('.is-dragging');
    const dropTarget = taskBelowCursor(zone, e.clientY);

    if (!dropTarget) {
      zone.appendChild(draggedTask);
    } else {
      zone.insertBefore(draggedTask, dropTarget);
    }
  });

  function taskBelowCursor(zone, cursorY) {
    const notDraggedTasks = zone.querySelectorAll('.task:not(.is-dragging)');

    let closestTask = null;
    let lowestOffset = Number.NEGATIVE_INFINITY;

    notDraggedTasks.forEach((task) => {
      const taskTop = task.getBoundingClientRect().top;
      /* Calculate how far the mouse is from the *top* of the
      task */
      const offset = cursorY - taskTop;
      if (offset < 0 && offset > lowestOffset) {
        closestTask = task;
        lowestOffset = offset;
      }
    })
    return closestTask;
  }

}

