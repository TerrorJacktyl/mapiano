import { action, autorun, computed, reaction, runInAction } from "mobx";
import { Chord, Note } from "../../chords/chords";
import { PianoStore } from "./PianoStore";

const isInteger = (n: number) => n % 1 === 0;
const positiveModulo = (i: number, n: number) => ((i % n) + n) % n;

export class PianoPresenter {
  constructor(private store: PianoStore) {
    this.store = store;

    const aBigChord = new Chord(new Note("C", "#"), "Major");
    setTimeout(() => {
      this.mark(aBigChord);
    }, 2000);
    setTimeout(() => {
      this.unmarkAll();
    }, 5000);

    // reaction(
    //   () => this.store.octaves[0].store.notes.map((n) => n.isMarked),
    //   () => this.findChord
    // );
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
    const scaledIntervals = intervals.map((i) => i + root.index);
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
}

export {};
