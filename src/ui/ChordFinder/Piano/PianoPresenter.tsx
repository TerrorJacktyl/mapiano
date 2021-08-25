import { action, computed, runInAction } from "mobx";
import { Chord, Note } from "../../../chords/chords";
import { NOTES } from "./Octave/OctaveStore";
import { PianoStore } from "./PianoStore";

// const isInteger = (n: number) => n % 1 === 0;
// const positiveModulo = (i: number, n: number) => ((i % n) + n) % n;

export class PianoPresenter {
  constructor(private store: PianoStore) {
    this.store = store;
  }

  @computed
  get findChord() {
    const pressedNotes = this.store.octaves[0].store.notes
      .filter((n) => n.isMarked)
      .map((n) => n.note);
    console.log(pressedNotes);
    return pressedNotes.toString();
  }

  @action
  mark(chord: Chord) {
    const { octaves } = this.store;
    const { root, intervals } = chord;
    let scaledIntervals = intervals.map(
      (i) => i + PianoPresenter.noteIndex(root)
    );
    if (scaledIntervals.some((i) => i < 0))
      scaledIntervals = scaledIntervals.map((i) => i + 12);
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

  /** Return the index for a note, where C = 0 and B = 11. */
  private static noteIndex(note: Note) {
    const { tone, modifier } = note;
    const modifierShift = modifier ? (modifier === "#" ? 1 : -1) : 0;
    return NOTES.findIndex((n) => n === tone) + modifierShift;
  }
}

export {};
