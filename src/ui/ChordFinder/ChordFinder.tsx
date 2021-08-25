import "./ChordFinder.css";
import { observer } from "mobx-react";
import { ChordDisplayView } from "./ChordDisplay/ChordDisplayView";
import { createPiano } from "./Piano/Piano";

function createChordFinder() {
  const Piano = createPiano();

  const cMajorInversionE = {
    name: "C Major (inversion over E)",
    symbol: "C/E",
    notes: ["E", "G", "C"],
  };

  return observer(() => (
    <div className="ChordFinderView">
      <ChordDisplayView
        chordName={cMajorInversionE.name}
        chordSymbol={cMajorInversionE.symbol}
        onChangeSymbol={(symbol: string) => {}}
      ></ChordDisplayView>
      <Piano></Piano>
    </div>
  ));
}

export const ChordFinder = createChordFinder();
