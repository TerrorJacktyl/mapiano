import { action, computed } from "mobx";
import { parseChordFromSymbol } from "../../chords/parseFromSymbol/parseFromSymbol";
import { ChordFinderStore } from "./ChordFinderStore";

export class ChordFinderPresenter {
  constructor(private store: ChordFinderStore) {}

  @action
  onSymbolInput() {
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

  @action
  onPianoInput() {
    const markedIntervals = this.markedIntervalsShiftedDown();
    console.log(markedIntervals);
    // Try to lookup a chord (excluding its root) in the table of known interval lists.
    // If a chord was found, apply the root to turn it into a chord, and update the display
  }

  /**
   * @returns A list of indexes (where the lowest C = 0) of the keys that are currently marked, scaled down where possible.
   * For example, marking B major (naturally spans the first two octaves) returns [11, 15, 18], while marking C major on
   * the second octave ([12, 16, 19] in the piano store) returns [0, 4, 7].
   */
  private markedIntervalsShiftedDown() {
    const markedIndexes = this.store.piano.markedNotesIndexes();

    // Scale down marked intervals (i.e. C major on the second octave) where possible
    const octavesToScaleDown =
      markedIndexes.length > 0
        ? markedIndexes
            .map((i) => Math.floor(i / 12))
            .reduce((previous, current) => Math.min(previous, current))
        : 0;
    if (octavesToScaleDown > 0) {
      return markedIndexes.map((i) => i - octavesToScaleDown * 12);
    }
    return markedIndexes;
  }

  @computed
  get chordFromSymbol() {
    const chordSymbol = this.store.display.store.chordSymbol.get();
    const parsedChord = parseChordFromSymbol(chordSymbol);
    return parsedChord;
  }
}
