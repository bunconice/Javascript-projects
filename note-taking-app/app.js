const addNote = document.querySelector(".add-note-btn");
const noteForm = document.getElementById("noteForm");
const closeBtn = document.querySelector(".close-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const dialog = document.getElementById("noteDialog");
const noteTitle = document.getElementById("noteTitle");
const noteContent = document.getElementById("noteContent");
const notesContainer = document.getElementById("notesContainer");
let notes = JSON.parse(localStorage.getItem("myNotes")) || [];
let editingId = null;

function clearInput() {
  noteTitle.value = "";
  noteContent.value = "";
  document.getElementById("dialogTitle").textContent = "Add New Note";
  dialog.close();
}
// close the dialog
closeBtn.addEventListener("click", () => {
  clearInput();
});

// close the dialog
cancelBtn.addEventListener("click", () => {
  clearInput();
});

function saveNote(event) {
  event.preventDefault();
  const title = noteTitle.value.trim();
  const content = noteContent.value.trim();

  if (editingId) {
    // Edit existing note
    const note = notes.find((n) => n.id === editingId);
    if (note) {
      note.title = title;
      note.content = content;
    }
    editingId = null;
  } else {
    // add new note
    notes.unshift({
      id: generateId(),
      title: title,
      content: content,
    });
  }

  saveToStorage();
  renderNotes();
  clearInput();
}

// generate unique id for each note
function generateId() {
  return Math.random().toString(36).slice(2, 8);
}

// save note to localStorage
function saveToStorage() {
  localStorage.setItem("myNotes", JSON.stringify(notes));
}

// function render all notes
function renderNotes() {
  // const notesContainer = document.getElementById("notesContainer");
  if (notes.length === 0) {
    notesContainer.innerHTML = `
      <div class="empty-state">
        <h2>No notes yet</h2>
        <p>Create your first note to get started!</p>
        <button class="add-note-btn">+ Add Your First Note</button>
      </div>
    `;
    return;
  }

  notesContainer.innerHTML = notes
    .map(
      (note) => `
      <div class="note-card">
        <h3 class="note-title">${note.title}</h3>
        <p class="note-content">${note.content}</p>
        <div class="note-actions">
          <button class="edit-btn" data-id="${note.id}" title="Edit Note">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
          </button>
          <button class="delete-btn" data-id="${note.id}" title="Delete Note">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/>
            </svg>
          </button>
        </div>
      </div>
    `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", function () {
  applyTheme();
  renderNotes();
  noteForm.addEventListener("submit", saveNote);

  document.getElementById("themeToggleBtn").addEventListener('click',toggleTheme);

  // clicking outside the dialog content(blurred area) close it
  dialog.addEventListener("click", function (event) {
    if (event.target === this) {
      clearInput();
    }
  });

  // open dialog when add-note-btn is clicked
  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-note-btn")) {
      dialog.showModal();
      noteTitle.focus();
    }
  });

  // delete note
  notesContainer.addEventListener("click", (e) => {
    const delBtn = e.target.closest(".delete-btn");
    if (delBtn) {
      const { id } = delBtn.dataset;
      notes = notes.filter((note) => note.id !== id);
      saveToStorage();
      renderNotes();
      return;
    }

  // edit note
    const editBtn = e.target.closest(".edit-btn");
    if (editBtn) {
      document.getElementById("dialogTitle").textContent = "Edit note";
      const { id } = editBtn.dataset;
      const edit = notes.find((note) => note.id === id);
      dialog.showModal();
      noteTitle.value = edit.title;
      noteContent.value = edit.content;
      // store the editing note's id to use when saving note
      editingId = id;
      console.log(id);
      return;
    }
  });

});


function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-theme')
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  document.getElementById("themeToggleBtn").textContent = isDark ? "💡" : "🌙";
}

function applyTheme() {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add("dark-theme");
    document.getElementById('themeToggleBtn').textContent = '💡'
  }
}