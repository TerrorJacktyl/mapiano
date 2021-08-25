import { storeAnnotation } from "mobx/dist/internal";
import { createOctave } from "./Octave/Octave";
import { PianoView } from "./PianoView";
import { PianoStore } from "./PianoStore";
import { PianoPresenter } from "./PianoPresenter";
import { observer } from "mobx-react";

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

  return observer(() => (
    <>
      <p>First octave: {presenter.findChord}</p>
      <PianoView>
        {octaves.map(({ Octave }, i) => (
          <Octave key={i} />
        ))}
      </PianoView>
    </>
  ));
}

export {};
