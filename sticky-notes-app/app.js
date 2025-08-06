/* const color = document.getElementById('color');
const createBtn = document.getElementById('createBtn');
const list = document.getElementById('list');

createBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let newNote = document.createElement('div');
  newNote.classList.add('note');
  newNote.innerHTML = `
    <span class="close">x</span>
    <textarea
      placeholder="Write Content..."
      rows="10"
      cols="30"
    ></textarea>
  `;
  newNote.style.borderTopColor = color.value;
  list.appendChild(newNote);
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('close')) {
    e.target.parentNode.remove();
    return;
  }

  const noteElement = e.target.classList.contains('note') ? e.target : e.target.closest('.note');

  if (noteElement) {
    // move note to end of container
    list.appendChild(noteElement);
  }
});

// coordinate of mouse pointer when the note is clicked
let cursor = {
  x: null,
  y: null
}

// information about note being dragged and dropped
let note = {
  dom: null, // target element
  x: null, // note initial horizontal coordinate on click
  y: null // note initial vertical coordinate on click
};


document.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('note')) {
    cursor = {
      x: e.clientX,
      y: e.clientY
    }
    note = {
      dom: e.target,
      x: e.target.getBoundingClientRect().left,
      y: e.target.getBoundingClientRect().top
    }
  }
})

document.addEventListener('mousemove', (e) => {
  if (note.dom == null) return;
  let currentCursor = {
    x: e.clientX,
    y: e.clientY
  };

  let distance = {
    x: currentCursor.x - cursor.x,
    y: currentCursor.y - cursor.y
  };

  note.dom.style.left = (note.x + distance.x) + 'px';
  note.dom.style.top = (note.y + distance.y) + 'px';
  note.dom.style.cursor = "grab";
});

document.addEventListener('mouseup', (e) => {
  if (note.dom == null) return;
  note.dom.style.cursor = 'auto'
  note.dom = null;
});
 */

class StickyNote {
  constructor(color) {
    this.element = this.createNoteElement(color);
  }

  createNoteElement(color) {
    const note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML = `
      <span class="close">x</span>
      <textarea
        placeholder="Write Content..."
        rows="10"
        cols="30"
      ></textarea>
    `;
    note.style.borderTopColor = color;
    return note;
  }
}

class NotesManager {
  constructor() {
    this.list = document.getElementById('list');
    this.colorPicker = document.getElementById('color');
    this.createBtn = document.getElementById('createBtn');
    this.draggedNote = {
      element: null,
      initialX: null,
      initialY: null,
      cursorStartX: null,
      cursorStartY: null,
    };

    this.initializeEventListeners();
  }

  initializeEventListeners() {
    this.createBtn.addEventListener('click', (e) => this.createNote(e));
    document.addEventListener("click", (e) => this.handleClick(e));
    document.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    document.addEventListener('mouseup', (e) => this.handleMouseUp(e));
  }

  createNote(e) {
    e.preventDefault();
    const note = new StickyNote(this.colorPicker.value);
    this.list.appendChild(note.element);
  }

  getNoteElement(e) {
    return e.target.classList.contains("note")
      ? e.target
      : e.target.closest(".note");
  }

  handleClick(e) {
    if (e.target.classList.contains('close')) {
      e.target.parentNode.remove();
      return;
    }

    const noteElement = this.getNoteElement(e);
    if (noteElement) {
      this.list.appendChild(noteElement); // Move to end for stacking
    }
  }

  handleMouseDown(e) {
    if (e.target.classList.contains('close')) return;

    const noteElement = this.getNoteElement(e);
    if (noteElement) {
      this.list.appendChild(noteElement);

      const rect = noteElement.getBoundingClientRect();
      this.draggedNote = {
        element: noteElement,
        initialX: rect.left,
        initialY: rect.top,
        cursorStartX: e.clientX,
        cursorStartY: e.clientY
      };
    }

  }

  handleMouseMove(e) {
    if (!this.draggedNote.element) return;

    const distance = {
      x: e.clientX - this.draggedNote.cursorStartX,
      y: e.clientY - this.draggedNote.cursorStartY
    };

    this.draggedNote.element.style.left = (distance.x + this.draggedNote.initialX) + 'px';
    this.draggedNote.element.style.top = (distance.y + this.draggedNote.initialY) + 'px';
    this.draggedNote.element.style.cursor = 'grab';

  }

  handleMouseUp(e) {
    if (!this.draggedNote.element) return;
    this.draggedNote.element.style.cursor = "auto";
    this.draggedNote.element = null;
  }

}

const notesManager = new NotesManager();