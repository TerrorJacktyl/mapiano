import { action, computed } from "mobx";
import parseChordFromPiano from "../../chords/parseFromPiano";
import { parseChordFromSymbol } from "../../chords/parseFromSymbol/parseFromSymbol";
import { ChordFinderStore } from "./ChordFinderStore";
import { NOTES } from "./Piano/Octave/OctaveStore";

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
    let markedIndexes = this.store.piano.markedNotesIndexes();
    if (markedIndexes.length === 0) return;
    markedIndexes =
      ChordFinderPresenter.markedIndexesShiftedDown(markedIndexes);
    const markedIntervals =
      ChordFinderPresenter.indexesToIntervals(markedIndexes);
    const rootSymbol = NOTES[markedIndexes[0]];
    const chord = parseChordFromPiano(rootSymbol, markedIntervals);
    const { display } = this.store;
    if (chord) {
      display.updateName(chord.name);
      display.updateSymbol(chord.symbol);
    } else {
      display.updateName("");
      display.updateSymbol("");
    }
    // Try to lookup a chord (excluding its root) in the table of known interval lists.
    // If a chord was found, apply the root to turn it into a chord, and update the display
  }

  /**
   * @returns A list of indexes (where the lowest C = 0) of the keys that are currently marked, scaled down where possible.
   * For example, marking B major (naturally spans the first two octaves) returns [11, 15, 18], while marking C major on
   * the second octave ([12, 16, 19] in the piano store) returns [0, 4, 7].
   */
  private static markedIndexesShiftedDown(markedIndexes: number[]) {
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

  private static indexesToIntervals(indexes: number[]) {
    if (indexes?.length === 0) return indexes;
    const root = indexes[0];
    return indexes.map((i) => i - root);
  }

  @computed
  get chordFromSymbol() {
    const chordSymbol = this.store.display.store.chordSymbol.get();
    const parsedChord = parseChordFromSymbol(chordSymbol);
    return parsedChord;
  }
}
