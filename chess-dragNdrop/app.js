const king = document.querySelector('.chess-piece');
const squares = document.querySelectorAll('.square');

king.addEventListener('dragstart', (e) => {
  e.dataTransfer.setData('text/plain', king.id);
});

squares.forEach((square) => {
  square.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  square.addEventListener('drop', (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const piece = document.getElementById(data);
    if (piece) {
      e.currentTarget.appendChild(piece);
    }
  })
});
