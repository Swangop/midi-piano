/* eslint-disable no-unused-vars */
let midi = null; // global MIDIAccess object
let handler = null;
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

function listInputsAndOutputs(midiAccess) {
  for (const entry of midiAccess.inputs) {
    const input = entry[1];
    console.log(
      `Input port [type:'${input.type}']` +
        ` id:'${input.id}'` +
        ` manufacturer:'${input.manufacturer}'` +
        ` name:'${input.name}'` +
        ` version:'${input.version}'`
    );
  }

  for (const entry of midiAccess.outputs) {
    const output = entry[1];
    console.log(
      `Output port [type:'${output.type}'] id:'${output.id}' manufacturer:'${output.manufacturer}' name:'${output.name}' version:'${output.version}'`
    );
  }
}

function onMIDIMessage(event) {
  if (event.data.length > 1) {
    let str = `MIDI message received at timestamp ${event.timeStamp}[${event.data.length} bytes]: `;
    for (const character of event.data) {
      str += `0x${character.toString(16)} `;
    }
    console.log(str);
    console.log(event.data);
    const [status, note, velocity] = event.data;
    if (velocity > 0 && status != undefined) {
      handler(getNoteName(note));
    }
  }
}

function startLoggingMIDIInput(midiAccess) {
  midiAccess.inputs.forEach((entry) => {
    entry.onmidimessage = onMIDIMessage;
  });
}

function onMIDISuccess(midiAccess) {
  console.log("MIDI ready!");
  midi = midiAccess;
  listInputsAndOutputs(midiAccess);
  startLoggingMIDIInput(midiAccess);
}

function onMIDIFailure(msg) {
  console.error(`Failed to get MIDI access - ${msg}`);
}

export const midiBegin = (h) => {
  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
  handler = h;
};


function getNoteName(midiNote) {
  const octave = Math.floor(midiNote / 12) - 1;
  const name = noteNames[midiNote % 12];
  return `${name}/${octave}`;
}
