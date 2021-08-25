import { ChordControls } from "./ui/controls/ChordControls";
import "./App.css";
import { createPiano } from "./ui/Piano/Piano";

function App() {
  const cMajorInversionE = {
    name: "C Major (inversion over E)",
    symbol: "C/E",
    notes: ["E", "G", "C"],
  };

  // const Octaves = [1, 2].map((_) => createOctave()["Octave"]);

  const Piano = createPiano();

  return (
    <div className="App">
      <ChordControls
        chord={cMajorInversionE}
        onChangeSymbol={(symbol: string) => {}}
      ></ChordControls>
      <Piano></Piano>
      {/* <PianoView>
        {Octaves.map((Octave, i) => (
          <Octave key={i} />
        ))}
      </PianoView> */}
    </div>
  );
}

export default App;
