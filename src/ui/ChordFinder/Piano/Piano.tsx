import { observer } from "mobx-react";
import { createOctave } from "./Octave/Octave";
import { PianoPresenter } from "./PianoPresenter";
import { PianoStore } from "./PianoStore";
import { PianoView } from "./PianoView";

export function createPiano() {
  const NUMBER_OCTAVES = 2;

  // Combine octaves' stores into the piano's store
  const octaves = [3, 4].map((i) => createOctave(i));
  const octaveStores = octaves.map((octave) => ({
    store: octave.store,
    mark: octave.mark,
    unmarkAll: octave.unmarkAll,
  }));
  const store = new PianoStore(octaveStores);
  const presenter = new PianoPresenter(store);

  const Piano = observer(() => (
    <>
      <PianoView>
        {octaves.map(({ Octave }, i) => (
          <Octave key={i} />
        ))}
      </PianoView>
    </>
  ));

  return {
    Piano,
    store: store,
    mark: presenter.mark,
    unmarkAll: presenter.unmarkAll,
    markedNotesIndexes: presenter.markedNotesIndexes,
  };
}

export {};
