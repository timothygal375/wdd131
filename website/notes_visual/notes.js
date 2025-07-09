const noteDisplay = document.querySelector(".note-display img");
const feedback = document.getElementById("feedback");
const buttons = document.querySelectorAll(".note-options button");

const clefNotes = {
  treble: ["d3", "e3", "f3", "g3", "a3", "b3", "c4", "d4", "e4", "f4", "g4", "a4", "b4", "c5", "d5", "e5", "f5", "g5", "a5", "b5", "c6", "d6", "e6", "f6", "g6",],
  bass: ["a1", "b1", "c2", "d2", "e2", "f2", "g2", "a2", "b2", "c3", "d3", "e3", "f3", "g3", "a3", "b3", "c4", "d4", "e4", "f4", "g4", "a4",],
  alto: ["e2", "f2", "g2", "a2", "b2", "c3", "d3", "e3", "f3", "g3", "a3", "b3", "c4", "d4", "e4", "f4", "g4", "a4", "b4", "c5", "d5", "e5", "f5", "g5", "a5"],
};

const clefs = Object.keys(clefNotes);
let currentClef = "";

const clefSelect = document.getElementById("clef-select");
const soundToggle = document.getElementById("sound-toggle");

let soundEnabled = true;

document.body.addEventListener("click", () => {
  Tone.start();
}, { once: true });

// Initialize the synth once
const synth = new Tone.Synth().toDestination();

function playNoteSound(noteOctave) {
  if (soundEnabled) {
    synth.triggerAttackRelease(noteOctave, "8n");
  }
}

function loadRandomNote() {
  const userClefChoice = clefSelect.value;

  currentClef = (userClefChoice === "random")
    ? clefs[Math.floor(Math.random() * clefs.length)]
    : userClefChoice;

  const validNotes = clefNotes[currentClef];
  const noteOctave = validNotes[Math.floor(Math.random() * validNotes.length)];

  currentNote = noteOctave.slice(0, -1);
  currentOctave = noteOctave.slice(-1);

  const noteOctaveFormatted = noteOctave.replace(/^([a-g#b]+)(\d)$/i, (_, note, octave) =>
    note.toLowerCase() + octave
  );

  noteDisplay.src = `notes/note_${currentClef}_${noteOctaveFormatted}.png`;
  feedback.textContent = "";
  playNoteSound(noteOctaveFormatted);

  console.log(`Loading: notes/note_${currentClef}_${noteOctaveFormatted}.png`);
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const guess = button.textContent;
    if (guess === currentNote.toUpperCase()) {
      feedback.textContent = "✅ Correct!";
      feedback.style.color = "green";
      feedback.className = "correct";
      setTimeout(loadRandomNote, 1000);
    } else {
      feedback.textContent = "❌ Try again.";
      feedback.style.color = "red";
      feedback.className = "incorrect";
    }
  });
});

loadRandomNote();

document.querySelectorAll('.key').forEach(key => {
  key.addEventListener('click', () => {
    const note = key.getAttribute('data-note');
    playNoteSound(note);
  });
});

soundToggle.addEventListener("change", () => {
  soundEnabled = soundToggle.checked;
});