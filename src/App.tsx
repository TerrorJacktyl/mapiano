import React from "react";
import { createOctave as Octave, OctaveView } from "./ui/octave/Octave";
import { ChordControls } from "./ui/controls/ChordControls";
import "./App.css";

function App() {
  const cMajorInversionE = {
    name: "C Major (inversion over E)",
    symbol: "C/E",
    notes: ["E", "G", "C"],
  };

  return (
    <div className="App">
      <ChordControls
        chord={cMajorInversionE}
        onChangeSymbol={(symbol: string) => {}}
      ></ChordControls>
      <OctaveView>
        <Octave />
      </OctaveView>
    </div>
  );
}

export default App;
