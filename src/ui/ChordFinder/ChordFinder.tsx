import { observer } from "mobx-react";
import { ChordDisplayPresenter } from "./ChordDisplay/ChordDisplayPresenter";
import { ChordDisplayStore } from "./ChordDisplay/ChordDisplayStore";
import { ChordDisplayView } from "./ChordDisplay/ChordDisplayView";
import "./ChordFinder.css";
import { ChordFinderPresenter } from "./ChordFinderPresenter";
import { ChordFinderStore } from "./ChordFinderStore";
import { createOctave } from "./Piano/Octave/Octave";
import { createPiano } from "./Piano/Piano";
import { PianoPresenter } from "./Piano/PianoPresenter";
import { PianoStore } from "./Piano/PianoStore";
import { PianoView } from "./Piano/PianoView";

const createChordFinder = () => {
  const displayStore = new ChordDisplayStore();
  const displayPresenter = new ChordDisplayPresenter(displayStore);

  // const { Piano, store: pianoStore, mark, unmarkAll } = createPiano();
  const NUMBER_OCTAVES = 2;

  // Combine octaves' stores into the piano's store
  const octaves = [...Array(NUMBER_OCTAVES)].map((_) => createOctave());
  const octaveStores = octaves.map((octave) => ({
    store: octave.store,
    mark: octave.mark,
    unmarkAll: octave.unmarkAll,
  }));
  const pianoStore = new PianoStore(octaveStores);
  const pianoPresenter = new PianoPresenter(pianoStore);

  const store = new ChordFinderStore(
    {
      store: pianoStore,
      mark: pianoPresenter.mark,
      unmarkAll: pianoPresenter.unmarkAll,
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
  octaves.forEach((octave) => {
    octave.store.onClickCallBack = onClickKey;
  });

  const Piano = observer(() => (
    <>
      <PianoView>
        {octaves.map(({ Octave }, i) => (
          <Octave key={i} />
        ))}
      </PianoView>
    </>
  ));

  return observer(() => (
    <div className="ChordFinderView">
      <ChordDisplay></ChordDisplay>
      <Piano></Piano>
    </div>
  ));
};

export const ChordFinder = createChordFinder();
