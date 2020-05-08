window.SpeechRecognition = window.SpeechRecognition
  || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.addEventListener('result', (e) => {
  const recognizedWord = e.results[0][0].transcript;
  const recognizedWordLowerCase = recognizedWord.toLowerCase();
  document.querySelector('.search-input').value = recognizedWordLowerCase;
});

recognition.addEventListener('end', recognition.start);

export default recognition;
