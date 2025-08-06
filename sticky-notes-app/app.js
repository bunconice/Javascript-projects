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
