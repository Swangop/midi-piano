/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { Stave, Renderer, StaveNote, Voice, Formatter } from "vexflow";
import { midiBegin } from "./midi";
import { getMidiNumber, initAudioContext, playNote } from "./utils";
import "bootstrap/dist/css/bootstrap.min.css";
let gnotes = [
  new StaveNote({ keys: ["c/4"], duration: "q" }),
  new StaveNote({ keys: ["c/4"], duration: "q" }),
  new StaveNote({ keys: ["b/4"], duration: "q" }),
  new StaveNote({ keys: ["c/5"], duration: "q" }),
];
const possibleNotes = [
  "c/4",
  "d/4",
  "e/4",
  "f/4",
  "g/4",
  "a/4",
  "b/4",
  "c/5",
  "d/5",
  "e/5",
  "f/5",
  "g/5",
  "a/5",
  "b/5",
];

const changeNoteColor = (note, color) => {
  return note.setStyle({
    fillStyle: color,
    strokeStyle: color,
  });
};
let counter = 0;

const getRandomNotes = () => {
  const randomNotes = [];
  while (randomNotes.length < 4) {
    const randomIndex = Math.floor(Math.random() * possibleNotes.length);
    const note = new StaveNote({
      keys: [possibleNotes[randomIndex]],
      duration: "q",
    });
    if (!randomNotes.includes(note)) {
      randomNotes.push(note);
    }
  }
  return randomNotes;
};

function App() {
  const outputRef = useRef(null);
  const [notes, setNotes] = useState([...gnotes]);
  const [muted, setMuted] = useState(true);
  const [stats, setStats] = useState({ correct: 0, incorrect: 0 });
  useEffect(() => {
    setupVexFlow();
  }, []);
  useEffect(() => {
    paintStave();
  }, [notes]);

  const setupVexFlow = () => {
    const div = outputRef.current;
    div.innerHTML = "";
    midiBegin(keyHandler);
    const renderer = new Renderer(div, Renderer.Backends.SVG);

    // Configure the rendering context.
    renderer.resize(500, 500);
    global.GLOBAL_CONTEXT = renderer.getContext();
  };

  const paintStave = () => {
    const context = global.GLOBAL_CONTEXT;
    // Clear previous notes by clearing the SVG context
    context.svg.innerHTML = "";

    const stave = new Stave(10, 40, 400);
    // Add a clef and time signature.
    stave.addClef("treble");
    const voice = new Voice({ num_beats: 4, beat_value: 4 });
    voice.setStrict(false);
    voice.addTickables(notes);

    // Format and justify the notes to 400 pixels.
    new Formatter().joinVoices([voice]).format([voice], 350);

    stave.setContext(context).draw();
    voice.draw(context, stave);
  };

  const keyHandler = (note) => {
    console.log("Key pressed:", note);

    const midiNote = getMidiNumber(note);
    if (muted) {
      playNote(midiNote);
    }

    if (counter === 3) {
      counter = 0;
      gnotes = getRandomNotes();
      setNotes([...gnotes]);
    } else {
      if (note === notes[counter].keys[0]) {
        gnotes[counter] = changeNoteColor(gnotes[counter], "green");
        setNotes([...gnotes]);
        setStats((prevStats) => ({
          ...prevStats,
          correct: prevStats.correct + 1,
        }));
        counter++;
      } else {
        gnotes[counter] = changeNoteColor(gnotes[counter], "red");
        setNotes([...gnotes]);
        setStats((prevStats) => ({
          ...prevStats,
          incorrect: prevStats.incorrect + 1,
        }));
      }
    }
  };

  const handleMuteToggle = () => {
    setMuted(!muted);
  };

  return (
    <div className="App container" style={{ padding: "2rem" }}>
      <div className="row justify-content-center">
        <div className="col-md-4 text-center">
          <h3>Stats:</h3>
          <p>Correct: {stats.correct}</p>
          <p>Incorrect: {stats.incorrect}</p>
        </div>
        <div className="col-md-8 text-center">
          <h1>Piano Trainer</h1>
          <div ref={outputRef} className=""></div>
          <MuteButton
            handleMuteToggle={handleMuteToggle}
            initAudioContext={initAudioContext}
            muted={muted}
          ></MuteButton>
          <button
            onClick={() => {
              if (!muted) keyHandler("c/4");
            }}
          >
            Sound test
          </button>
        </div>
      </div>
    </div>
  );
}

const MuteButton = ({ handleMuteToggle, initAudioContext, muted }) => {
  return (
    <button
      onClick={() => {
        handleMuteToggle();
        initAudioContext();
      }}
      aria-label={muted ? "Unmute audio" : "Mute audio"}
    >
      {muted ? (
        // Muted icon (speaker crossed out)
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 10v4h4l5 5V5L7 10H3z" />
          <line x1="2" y1="2" x2="22" y2="22" stroke="red" strokeWidth="2" />
        </svg>
      ) : (
        // Unmuted icon (normal speaker)
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 10v4h4l5 5V5L7 10H3z" />
        </svg>
      )}
    </button>
  );
};
export default App;
