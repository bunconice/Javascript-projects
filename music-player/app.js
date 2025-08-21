const song = document.getElementById('song');
const progress = document.getElementById('progress');
const playIcon = document.getElementById('play-icon');
const pausePlay = document.getElementById("pause-play");

let updateInterval;  // store interval ID

// set max progress and progress value when metadata is loaded
song.onloadedmetadata = () => {
  progress.max = song.duration;
  progress.value = song.currentTime;
}
// when pause or play is clicked
pausePlay.onclick = () => {
  if (song.paused) {
    song.play();
    playIcon.classList.remove("fa-play");
    playIcon.classList.add("fa-pause");

    // keep updating progress only while playing
    setInterval(() => {
      progress.value = song.currentTime;
    }, 500);
  } else {
    song.pause();
    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");

    clearInterval(updateInterval);
  }
};

// updates the song currentTime
progress.oninput = () => {
  song.currentTime = progress.value;
};
