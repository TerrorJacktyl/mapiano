import React from "react";
import { Octave, OctaveView } from "./ui/octave/Octave";
import "./App.css";

function App() {
  return (
    <div className="app">
      <section className="chord-panel"></section>
      <section className="octave-view">
        <Octave />
        <Octave />
      </section>
    </div>
  );
}

export default App;
