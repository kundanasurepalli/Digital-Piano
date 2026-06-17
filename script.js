const KEY_MAP = {
    'a': 'C4',  'w': 'Db4',
    's': 'D4',  'e': 'Eb4',
    'd': 'E4',
    'f': 'F4',  't': 'Gb4',
    'g': 'G4',  'y': 'Ab4',
    'h': 'A4',  'u': 'Bb4',
    'j': 'B4',
    'k': 'C5'
};

// DOM Selections
const pianoKeyboard = document.querySelector('.piano-keyboard');
const pianoKeys = document.querySelectorAll('.key');
const instrumentSelect = document.getElementById('instrument-select');
const labelsToggle = document.getElementById('labels-toggle');

// State configuration
let currentInstrument = instrumentSelect.value;

// Dynamic configuration listener
instrumentSelect.addEventListener('change', (e) => {
    currentInstrument = e.target.value;
});

labelsToggle.addEventListener('change', (e) => {
    if (e.target.checked) {
        pianoKeyboard.classList.remove('hide-hints');
    } else {
        pianoKeyboard.classList.add('hide-hints');
    }
});

// Centralized Note Execution
function playNote(note) {
    const audioUrl = `https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/${currentInstrument}/${note}.mp3`;
    const audio = new Audio(audioUrl);
    audio.volume = 0.8;
    
    audio.play().catch(err => console.warn("Audio interaction restricted:", err));
}

// Mouse Interactivity
pianoKeys.forEach(key => {
    key.addEventListener('mousedown', () => {
        const note = key.getAttribute('data-note');
        playNote(note);
    });
});

// Hardware Keyboard Watchers
document.addEventListener('keydown', (event) => {
    if (event.repeat) return; // Prevent stutter loops on long presses

    const keyLower = event.key.toLowerCase();
    const note = KEY_MAP[keyLower];

    if (note) {
        const visualKey = document.querySelector(`[data-note="${note}"]`);
        if (visualKey) visualKey.classList.add('active');
        playNote(note);
    }
});

document.addEventListener('keyup', (event) => {
    const keyLower = event.key.toLowerCase();
    const note = KEY_MAP[keyLower];
    
    if (note) {
        const visualKey = document.querySelector(`[data-note="${note}"]`);
        if (visualKey) visualKey.classList.remove('active');
    }
});