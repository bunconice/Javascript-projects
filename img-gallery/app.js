const gallery = document.querySelector('.gallery');
const backBtn = document.getElementById('back-btn');
const nextBtn = document.getElementById('next-btn');

gallery.addEventListener('wheel', (e) => {
  e.preventDefault()
  gallery.scrollLeft += e.deltaY;
  gallery.style.scrollBehavior = "auto";
});

function getScrollAmount() {
  const images = gallery.querySelectorAll('img');

  // fallback if only one image
  if (images.length < 2) {
    return images[0]?.getBoundingClientRect().width || 300;
  }

  const first = images[0].getBoundingClientRect();
  const second = images[1].getBoundingClientRect();
  // distance between left edges of first and second image
  return second.left - first.left;
}

nextBtn.addEventListener('click', () => {
  gallery.style.scrollBehavior = "smooth";
  gallery.scrollLeft += getScrollAmount();
});

backBtn.addEventListener('click', () => {
  gallery.style.scrollBehavior = "smooth";
  gallery.scrollLeft -= getScrollAmount();
});
