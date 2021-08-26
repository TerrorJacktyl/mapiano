import { action, computed, reaction } from "mobx";
import { parseToChord } from "../../chords/chords";
import { ChordFinderStore } from "./ChordFinderStore";

export class ChordFinderPresenter {
  constructor(private store: ChordFinderStore) {
    // Whenever the input changes, update the chord name and intervals shown
    // reaction(
    //   () => this.store.display.store.chordSymbol.get(),
    //   () => {
    //     const chord = this.chordFromSymbol;
    //     const { piano, display } = this.store;
    //     if (chord) {
    //       display.updateName(chord.name);
    //       piano.unmarkAll();
    //       piano.mark(chord);
    //     } else {
    //       display.updateName("");
    //       piano.unmarkAll();
    //     }
    //   }
    // );
  }

  @action
  onSymbolChange() {
    const chord = this.chordFromSymbol;
    const { piano, display } = this.store;
    if (chord) {
      display.updateName(chord.name);
      piano.unmarkAll();
      piano.mark(chord);
    } else {
      display.updateName("");
      piano.unmarkAll();
    }
  }

  @computed
  get chordFromSymbol() {
    const chordSymbol = this.store.display.store.chordSymbol.get();
    const parsedChord = parseToChord(chordSymbol);
    return parsedChord;
  }
}
