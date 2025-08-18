const synth = window.speechSynthesis;
const voiceSelect = document.querySelector('select');
const inputText = document.querySelector('textarea');
const btn = document.querySelector('button');
let voices = [];

// Populate voice list
synth.onvoiceschanged = () => {
  voices = synth.getVoices();
  voiceSelect.innerHTML = ""; // clear old voices

  voices.forEach((voice) => {
    const option = new Option(
      voice.default ? `${voice.name} - Default` : voice.name,
      voice.voiceURI
    );
    voiceSelect.appendChild(option)
  })
}

// speak
btn.addEventListener('click', () => {
  synth.cancel(); // stop any current speech
  const utterance = new SpeechSynthesisUtterance(inputText.value);
  utterance.voice = voices[voiceSelect.selectedIndex];
  synth.speak(utterance);
})

