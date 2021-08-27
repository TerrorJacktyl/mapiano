import { observer } from "mobx-react";
import { createOctave } from "./Octave/Octave";
import { PianoPresenter } from "./PianoPresenter";
import { PianoStore } from "./PianoStore";
import { PianoView } from "./PianoView";

export function createPiano() {
  const NUMBER_OCTAVES = 2;

  // Combine octaves' stores into the piano's store
  const octaves = [...Array(NUMBER_OCTAVES)].map((_) => createOctave());
  const octaveStores = octaves.map((octave) => ({
    store: octave.store,
    mark: octave.mark,
    unmarkAll: octave.unmarkAll,
  }));
  const store = new PianoStore(octaveStores);
  const presenter = new PianoPresenter(store);

  const Piano = observer(() => (
    <>
      {/* <p>Pressed indexes: {presenter.markedNotesIndexes.toString()}</p> */}
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
