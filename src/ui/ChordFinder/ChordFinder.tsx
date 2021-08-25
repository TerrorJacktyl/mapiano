import "./ChordFinder.css";
import { observer } from "mobx-react";
import {
  ChordDisplayView,
  createChordDisplay,
} from "./ChordDisplay/ChordDisplayView";
import { createPiano } from "./Piano/Piano";
import { ChordFinderStore } from "./ChordFinderStore";

function createChordFinder() {
  const { Piano, mark, unmarkAll } = createPiano();

  const { ChordDisplay } = createChordDisplay();
  // const store = new ChordFinderStore();

  const cMajorInversionE = {
    name: "C Major (inversion over E)",
    symbol: "C/E",
    notes: ["E", "G", "C"],
  };

  return observer(() => (
    <div className="ChordFinderView">
      {/* <ChordDisplayView
        chordName={cMajorInversionE.name}
        chordSymbol={cMajorInversionE.symbol}
        onChangeSymbol={(symbol: string) => {}}
      ></ChordDisplayView> */}
      <ChordDisplay></ChordDisplay>
      <Piano></Piano>
    </div>
  ));
}

export const ChordFinder = createChordFinder();
