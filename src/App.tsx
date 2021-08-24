import React from "react";
import { createOctave, OctaveView } from "./ui/octave/Octave";
import { ChordControls } from "./ui/controls/ChordControls";
import "./App.css";

function App() {
  const cMajorInversionE = {
    name: "C Major (inversion over E)",
    symbol: "C/E",
    notes: ["E", "G", "C"],
  };

  const Octaves = [1, 2].map((_) => createOctave());

  return (
    <div className="App">
      <ChordControls
        chord={cMajorInversionE}
        onChangeSymbol={(symbol: string) => {}}
      ></ChordControls>
      <OctaveView>
        {Octaves.map((Octave, i) => (
          <Octave key={i} />
        ))}
      </OctaveView>
    </div>
  );
}

export default App;
