const playButton = document.getElementById("playInterval");
const replayButton = document.getElementById("replayInterval");
const feedback = document.getElementById("feedback");
const answerContainer = document.getElementById("answerButtons");

const intervals = {
  "Minor 2nd": 1,
  "Major 2nd": 2,
  "Minor 3rd": 3,
  "Major 3rd": 4,
  "Perfect 4th": 5,
  "Tritone": 6,
  "Perfect 5th": 7,
  "Minor 6th": 8,
  "Major 6th": 9,
  "Minor 7th": 10,
  "Major 7th": 11,
  "Octave": 12
};

const MIN_MIDI = 48;
const MAX_MIDI = 84;

let lastInterval = null;
let currentCorrectAnswer = "";

// Utility to shuffle choices
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function playInterval(rootMidi, targetMidi) {
  const synth = new Tone.PolySynth().toDestination();
  const rootNote = Tone.Frequency(rootMidi, "midi").toNote();
  const targetNote = Tone.Frequency(targetMidi, "midi").toNote();

  feedback.textContent = "";

  // Melodic first
  synth.triggerAttackRelease(rootNote, "8n");
  setTimeout(() => {
    synth.triggerAttackRelease(targetNote, "8n");
  }, 600);

  // Then harmonic
  setTimeout(() => {
    synth.triggerAttackRelease([rootNote, targetNote], "8n");
  }, 1400);

  // Question prompt
  setTimeout(() => {
    feedback.textContent = "Which interval was that?";
  }, 1600);
}

function startNewRound() {
  const intervalNames = Object.keys(intervals);
  const randomIntervalName = intervalNames[Math.floor(Math.random() * intervalNames.length)];
  const semitones = intervals[randomIntervalName];

  const maxStart = MAX_MIDI - semitones;
  const rootMidi = Math.floor(Math.random() * (maxStart - MIN_MIDI + 1)) + MIN_MIDI;
  const targetMidi = rootMidi + semitones;

  lastInterval = { rootMidi, targetMidi };
  currentCorrectAnswer = randomIntervalName;

  playInterval(rootMidi, targetMidi);
  replayButton.disabled = false;
  generateAnswerButtons();
}

function generateAnswerButtons() {
  answerContainer.innerHTML = "";

  const intervalNames = Object.keys(intervals);
  const incorrectChoices = intervalNames.filter(i => i !== currentCorrectAnswer);
  const randomIncorrect = shuffle(incorrectChoices).slice(0, 3);
  const choices = shuffle([currentCorrectAnswer, ...randomIncorrect]);

  choices.forEach(name => {
    const btn = document.createElement("button");
    btn.textContent = name;
    btn.addEventListener("click", () => {
      if (name === currentCorrectAnswer) {
        const article = currentCorrectAnswer === "Octave" ? "an" : "a";
        feedback.textContent = `✅ Correct! It was ${article} ${currentCorrectAnswer}.`;
        setTimeout(startNewRound, 1500);
      } else {
        feedback.textContent = `❌ Nope — Try Again.`;
      }
    });
    answerContainer.appendChild(btn);
  });
}

replayButton.addEventListener("click", () => {
  if (lastInterval) {
    playInterval(lastInterval.rootMidi, lastInterval.targetMidi);
  }
});

playButton.addEventListener("click", () => {
  playButton.style.display = "none";
  startNewRound();
});
