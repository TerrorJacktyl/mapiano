import { computed, reaction } from "mobx";
import { parseToChord } from "../../chords/chords";
import { ChordFinderStore } from "./ChordFinderStore";

export class ChordFinderPresenter {
  constructor(private store: ChordFinderStore) {
    // Whenever the input changes, update the chord name
    reaction(
      () => this.store.display.store.chordSymbol.get(),
      () => {
        const chord = this.chordFromSymbol;
        this.store.display.updateName(chord ? chord.name : "");
      }
    );
  }

  @computed
  get chordFromSymbol() {
    const chordSymbol = this.store.display.store.chordSymbol.get();
    const parsedChord = parseToChord(chordSymbol);
    return parsedChord;
  }
}
