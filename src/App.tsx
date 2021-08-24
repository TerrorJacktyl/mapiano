import React from "react";
import { createOctave, OctaveContainer } from "./ui/octave/Octave";
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
      <OctaveContainer>
        {Octaves.map((Octave, i) => (
          <Octave key={i} />
        ))}
      </OctaveContainer>
    </div>
  );
}

export default App;
