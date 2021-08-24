import React from "react";
import { createOctave } from "./ui/Piano/Octave/Octave";
import { PianoView } from "./ui/Piano/PianoView";
import { ChordControls } from "./ui/controls/ChordControls";
import "./App.css";

function App() {
  const cMajorInversionE = {
    name: "C Major (inversion over E)",
    symbol: "C/E",
    notes: ["E", "G", "C"],
  };

  const Octaves = [1, 2].map((_) => createOctave()["Octave"]);

  return (
    <div className="App">
      <ChordControls
        chord={cMajorInversionE}
        onChangeSymbol={(symbol: string) => {}}
      ></ChordControls>
      <PianoView>
        {Octaves.map((Octave, i) => (
          <Octave key={i} />
        ))}
      </PianoView>
    </div>
  );
}

export default App;
