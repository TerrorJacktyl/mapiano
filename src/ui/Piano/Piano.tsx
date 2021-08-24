import { storeAnnotation } from "mobx/dist/internal";
import { createOctave } from "./Octave/Octave";
import { PianoView } from "./PianoView";
import { PianoStore } from "./PianoStore";
import { PianoPresenter } from "./PianoPresenter";

export function createPiano() {
  const NUMBER_OCTAVES = 2;

  // make the octaves
  const octaves = [...Array(2)].map((_) => createOctave());
  // combine their stores into the piano store
  const octaveStores = octaves.map((octave) => ({
    store: octave.store,
    mark: octave.mark,
    unmarkAll: octave.unmarkAll,
  }));
  const store = new PianoStore(octaveStores);
  const presenter = new PianoPresenter(store);
  // return the whole component
  return () => (
    <PianoView>
      {octaves.map(({ Octave }, i) => (
        <Octave key={i} />
      ))}
    </PianoView>
  );
}

export {};
