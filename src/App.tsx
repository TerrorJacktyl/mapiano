import "./App.css";
import { ChordControls } from "./ui/controls/ChordControls";
import { createPiano } from "./ui/Piano/Piano";

function App() {
  const cMajorInversionE = {
    name: "C Major (inversion over E)",
    symbol: "C/E",
    notes: ["E", "G", "C"],
  };

  const Piano = createPiano();

  return (
    <div className="App">
      <ChordControls
        chord={cMajorInversionE}
        onChangeSymbol={(symbol: string) => {}}
      ></ChordControls>
      <Piano></Piano>
    </div>
  );
}

export default App;
