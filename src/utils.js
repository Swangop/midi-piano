import { SplendidGrandPiano, CacheStorage } from "smplr";
const getMidiNumber = (noteName) => {
  const noteMap = {
    c: 0,
    "c#": 1,
    d: 2,
    "d#": 3,
    e: 4,
    f: 5,
    "f#": 6,
    g: 7,
    "g#": 8,
    a: 9,
    "a#": 10,
    b: 11,
  };
  const [note, octave] = noteName.split("/");
  return 12 * (parseInt(octave, 10) + 1) + noteMap[note.toLowerCase()];
};

let audioCtx = null;
let marimba = null;
const initAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new AudioContext(); // create the audio context
    const storage = new CacheStorage();
    marimba = new SplendidGrandPiano(audioCtx, { storage }); // create and load the instrument
  }
};

const playNote = (midiNote) => {
  if (!audioCtx) {
    return;
  }
  audioCtx.resume();
  marimba.start({ note: midiNote, velocity: 80, duration: 0.5 });
};

export { getMidiNumber, playNote, initAudioContext };
