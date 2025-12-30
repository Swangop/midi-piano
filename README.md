# MIDI Piano Trainer

## Overview

MIDI Piano Trainer is an interactive web-based application designed to help users learn and practice piano notes on a digital keyboard. The core concept revolves around randomly generating musical notes on a virtual stave, challenging players to identify and play them quickly. This approach fosters fast reactions, muscle memory, and improved sheet music reading skills. Originally developed as a personal tool to practice my own sheet music reading proficiency, the app serves as an entry-level trainer for beginners. While it may seem simplistic to experienced musicians, its unpredictable note generation makes it highly effective for building foundational speed and memorization.

The application integrates with MIDI-enabled keyboards, allowing real-time input and feedback. Notes are displayed using a treble clef stave, and users must press the correct key on their keyboard to progress. Incorrect attempts provide immediate visual cues, encouraging correction and repetition. This gamified learning method emphasizes function over aesthetics, focusing on practical training rather than elaborate design.

## Features

- **Random Note Generation**: Notes are selected unpredictably to focus on reaction time and muscle memory.
- **MIDI Integration**: Connects to digital keyboards for authentic practice.
- **Visual Feedback**: Displays correct and incorrect responses on the stave.
- **Treble Clef Focus**: Currently limited to treble clef, with plans for multi-clef support.
- **Web-Based Deployment**: Easily accessible via GitHub Pages.

## Technology Stack

The project is built using React, a component-based front-end framework simply chosen because of my personal experience. 
While the functionality could have been implemented in vanilla JavaScript, React was selected to experiment with deployment workflows in githug pages. For rendering musical notation, i used VexFlow, a specialized library for drawing sheet music. This library handles the stave, notes, and clef rendering efficiently. The app uses minimal CSS, prioritizing functionality over visual polish, as design is not the primary focus.

## File Structure and Descriptions

The codebase is organized into a standard React project structure, with source files in the `src/` directory. Below is a detailed breakdown of the key files written for this project:

- **`src/App.js`**: This is the main React component that orchestrates the application's logic. It manages the state for note generation, MIDI input handling, and rendering the stave. The component uses VexFlow to draw the treble clef and notes, and it listens for MIDI events to check user input against the displayed note. Design choice: I kept the component relatively simple and monolithic to avoid over-engineering for a small project, though in a larger app, I might split it into sub-components for better maintainability.

- **`src/index.js`**: The entry point for the React application. It renders the `App` component into the DOM and includes boilerplate code for initializing the app.

- **`src/midi.js`**: Handles MIDI device integration. This utility file requests access to MIDI devices, listens for input events, and translates them into note values. It includes error handling for unsupported browsers or disconnected devices. Design choice: I debated using a third-party MIDI library but opted for native Web MIDI API to keep dependencies minimal and ensure direct control over input processing.

- **`src/utils.js`**: A collection of helper functions for note generation and validation. It includes logic for randomly selecting notes within the treble clef range and comparing user input to the target note. This file promotes code reusability and separation of concerns.


## Design Choices and Rationale

One key debate was the choice of clef: I limited the app to treble clef initially to keep the scope manageable, as adding bass or alto clefs would require additional logic for note ranges and stave rendering. This decision aligns with the app's beginner focus, where treble clef is most common. Future updates could introduce a settings panel for clef selection.

Another consideration was MIDI support. Using the Web MIDI API directly ensures broad compatibility without external libraries, but it requires user permission and may not work in all browsers. I prioritized this for authenticity, as simulated keyboard input wouldn't provide the same tactile feedback.

Styling was intentionally minimal. As someone not focused on design, I avoided any complex design, sticking to a simple bootstrap grid.

In summary, MIDI Piano Trainer is a focused tool for piano practice, built with simplicity and effectiveness in mind. Its file structure reflects a straightforward React app, with each component serving a clear purpose. While expandable, its current design meets the needs of its target audience. For installation, clone the repository, run `npm install`, and start with `npm start`. Deploy via `npm run deploy` to GitHub Pages.
