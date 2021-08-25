import "./ChordFinder.css";
import { observer } from "mobx-react";
import { ChordDisplayView } from "./ChordDisplay/ChordDisplayView";
import { createChordDisplay } from "./ChordDisplay/ChordDisplay";
import { createPiano } from "./Piano/Piano";
import { ChordFinderStore } from "./ChordFinderStore";
import { ChordFinderPresenter } from "./ChordFinderPresenter";

function createChordFinder() {
  const { Piano, store: pianoStore, mark, unmarkAll } = createPiano();

  const {
    ChordDisplay,
    store: displayStore,
    updateSymbol,
    updateName,
  } = createChordDisplay();

  const store = new ChordFinderStore(
    { store: pianoStore, mark, unmarkAll },
    {
      store: displayStore,
      updateSymbol,
      updateName,
    }
  );

  const presenter = new ChordFinderPresenter(store);

  const cMajorInversionE = {
    name: "C Major (inversion over E)",
    symbol: "C/E",
    notes: ["E", "G", "C"],
  };

  return observer(() => (
    <div className="ChordFinderView">
      <ChordDisplay></ChordDisplay>
      <Piano></Piano>
    </div>
  ));
}

export const ChordFinder = createChordFinder();
