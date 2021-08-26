import "./ChordFinder.css";
import { observer } from "mobx-react";
import { ChordDisplayView } from "./ChordDisplay/ChordDisplayView";
import { createChordDisplay } from "./ChordDisplay/ChordDisplay";
import { createPiano } from "./Piano/Piano";
import { ChordFinderStore } from "./ChordFinderStore";
import { ChordFinderPresenter } from "./ChordFinderPresenter";
import { ChordDisplayStore } from "./ChordDisplay/ChordDisplayStore";
import { ChordDisplayPresenter } from "./ChordDisplay/ChordDisplayPresenter";
import { PianoPresenter } from "./Piano/PianoPresenter";

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

const createChordFinder2 = () => {
  const displayStore = new ChordDisplayStore();
  const displayPresenter = new ChordDisplayPresenter(displayStore);

  const { Piano, store: pianoStore, mark, unmarkAll } = createPiano();

  const store = new ChordFinderStore(
    { store: pianoStore, mark, unmarkAll },
    {
      store: displayStore,
      updateSymbol: displayPresenter.updateSymbol,
      updateName: displayPresenter.updateName,
    }
  );

  const presenter = new ChordFinderPresenter(store);

  const ChordDisplay = observer(() => (
    <ChordDisplayView
      chordName={displayStore.chordName.get()}
      chordSymbol={displayStore.chordSymbol.get()}
      // need anonymity and presenter.method here to preserve 'this' binding to presenter
      onChangeSymbol={(symbol) => {
        displayPresenter.updateSymbol(symbol);
        presenter.onSymbolChange();
      }}
    ></ChordDisplayView>
  ));

  return observer(() => (
    <div className="ChordFinderView">
      <ChordDisplay></ChordDisplay>
      <Piano></Piano>
    </div>
  ));
};

export const ChordFinder = createChordFinder2();
