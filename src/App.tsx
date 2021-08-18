import React from "react";
import { Octave } from "./Octave";
import "./App.css";

function App() {
  return (
    <div className="app">
      <section className="octave-view">
        <Octave />
        <Octave />
      </section>
    </div>
  );
}

export default App;
