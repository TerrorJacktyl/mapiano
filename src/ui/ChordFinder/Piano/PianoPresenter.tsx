import { action, runInAction } from "mobx";
import { Chord, Note } from "../../../chords/chords";
import { NOTES } from "./Octave/OctaveStore";
import { PianoStore } from "./PianoStore";

export class PianoPresenter {
  constructor(private store: PianoStore) {
    this.store = store;
  }

  @action
  mark(chord: Chord) {
    const { octaves } = this.store;
    const { root, intervals } = chord;
    let scaledIntervals = intervals.map(
      (i) => i + PianoPresenter.noteIndex(root)
    );
    // Edge case: Cb should be scaled up an octave
    if (scaledIntervals[0] < 0)
      scaledIntervals = scaledIntervals.map((i) => i + 12);
    // Edge case: chords should be scaled down an octave where possible
    if (scaledIntervals.every((i) => Math.floor(i / 12) > 0))
      scaledIntervals = scaledIntervals.map((i) => i - 12);
    scaledIntervals.forEach((i) =>
      // do we need runinaction here?
      runInAction(() => octaves[Math.floor(i / 12)].mark([i % 12]))
    );
  }

  @action
  unmarkAll() {
    // does using runinaction outside the foreach make a difference to above?
    runInAction(() =>
      this.store.octaves.forEach((octave) => octave.unmarkAll())
    );
  }

  /**
   * @returns A list of indexes (where the lowest C = 0) of the keys that are currently marked.   *
   *
   * This is not a getter or mobx-computed value because it is not used by a reaction, and therefore will cache its initial value ([]).
   * Calling this method forces it to eagerly evaluate every time. This is useful because it allows clicking on a piano key to trigger
   * an update, rather than relying on mobx-reactions.
   */
  markedNotesIndexes() {
    const octaves = this.store.octaves;
    const markedIndexes = octaves.flatMap(({ store }, n) =>
      store.markedIndexes.map((i) => i + n * 12)
    );
    return markedIndexes;
  }

  /** Return the index for a note, where C = 0 and B = 11. */
  private static noteIndex(note: Note) {
    const { tone, modifier } = note;
    const modifierShift = modifier ? (modifier === "#" ? 1 : -1) : 0;
    return NOTES.findIndex((n) => n === tone) + modifierShift;
  }
}

export {};
