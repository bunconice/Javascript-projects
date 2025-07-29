const inputBox = document.getElementById('input-box');
const addBtn = document.querySelector('.add-btn');
const listContainer = document.getElementById('list-container');

function addTask() {
  if (inputBox.value === '') {
    return;
  } else {
    const li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    const span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = '';
  saveTask()
}

addBtn.addEventListener('click', () => {
  addTask();
})

inputBox.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
})

listContainer.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    event.target.classList.toggle('checked')
    saveTask();
  } else if (event.target.tagName === 'SPAN') {
    event.target.parentElement.remove()
    saveTask()
  }
})

function saveTask() {
  localStorage.setItem('task', listContainer.innerHTML)
}

function getTask() {
  listContainer.innerHTML = localStorage.getItem('task');
}

getTask();
