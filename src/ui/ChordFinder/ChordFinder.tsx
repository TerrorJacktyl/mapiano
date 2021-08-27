import { observer } from "mobx-react";
import { ChordDisplayPresenter } from "./ChordDisplay/ChordDisplayPresenter";
import { ChordDisplayStore } from "./ChordDisplay/ChordDisplayStore";
import { ChordDisplayView } from "./ChordDisplay/ChordDisplayView";
import "./ChordFinder.css";
import { ChordFinderPresenter } from "./ChordFinderPresenter";
import { ChordFinderStore } from "./ChordFinderStore";
import { createPiano } from "./Piano/Piano";

const createChordFinder = () => {
  const displayStore = new ChordDisplayStore();
  const displayPresenter = new ChordDisplayPresenter(displayStore);

  const {
    Piano,
    store: pianoStore,
    mark,
    unmarkAll,
    markedNotesIndexes,
  } = createPiano();

  const store = new ChordFinderStore(
    {
      store: pianoStore,
      mark,
      unmarkAll,
      markedNotesIndexes,
    },
    {
      store: displayStore,
      updateSymbol: displayPresenter.updateSymbol,
      updateName: displayPresenter.updateName,
    }
  );

  const presenter = new ChordFinderPresenter(store);

  const onChangeSymbol = (symbol: string) => {
    displayPresenter.updateSymbol(symbol);
    presenter.onSymbolChange();
  };

  const ChordDisplay = observer(() => (
    <ChordDisplayView
      chordName={displayStore.chordName.get()}
      chordSymbol={displayStore.chordSymbol.get()}
      onChangeSymbol={onChangeSymbol}
    ></ChordDisplayView>
  ));

  const onClickKey = () => presenter.onMarkedKeysChange();
  pianoStore.octaves.forEach((octave) => {
    octave.store.onClickCallBack = onClickKey;
  });

  return observer(() => (
    <div className="ChordFinderView">
      <ChordDisplay></ChordDisplay>
      <Piano></Piano>
    </div>
  ));
};

export const ChordFinder = createChordFinder();
