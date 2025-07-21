let listenersAdded = false;

export const midiBegin = (handler) => {
  if (!listenersAdded) {
    window.addEventListener("midiNoteOn", (e) => {
      const { note } = e.detail;
      handler(getNoteName(note));
    });
    window.addEventListener("midiNoteOff", (e) => {
      const { note } = e.detail;
      console.log("Note OFF event received:", note);
    });
    listenersAdded = true;
  }
  if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
  } else {
    console.error("Web MIDI API not supported in this browser.");
  }
};
function onMIDISuccess(midiAccess) {
  for (let input of midiAccess.inputs.values()) {
    input.onmidimessage = handleMIDIMessage;
  }
}

function onMIDIFailure() {
  alert("Failed to access MIDI devices.");
}

function handleMIDIMessage(event) {
  const [status, note, velocity] = event.data;

  const command = status >> 4;

  if (command === 9 && velocity > 0) {
    const midiEvent = new CustomEvent("midiNoteOn", {
      detail: { note, velocity },
    });
    window.dispatchEvent(midiEvent);
  } else if (command === 8 || (command === 9 && velocity === 0)) {
    const midiEvent = new CustomEvent("midiNoteOff", {
      detail: { note },
    });
    window.dispatchEvent(midiEvent);
  }
}

const noteNames = [
  "c",
  "c#",
  "d",
  "d#",
  "e",
  "f",
  "f#",
  "g",
  "g#",
  "a",
  "a#",
  "b",
];

function getNoteName(midiNote) {
  const octave = Math.floor(midiNote / 12) - 1;
  const name = noteNames[midiNote % 12];
  return `${name}/${octave}`;
}
