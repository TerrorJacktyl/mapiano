import { action, runInAction } from "mobx";
import { Note } from "./Octave";
import { NoteState, OctaveStore } from "./OctaveStore";

export class OctavePresenter {
  constructor(private store: OctaveStore) {
    const cMinor = [0, 3, 7];
    setTimeout(() => {
      this.mark(cMinor);
    }, 1000);
    setTimeout(() => {
      this.unmarkAll();
    }, 3000);
  }

  mark(indexesToMark: number[]) {
    indexesToMark.forEach((i) => {
      if (!this.isValidIndex(i))
        throw Error(
          `The index ${i} is invalid (not an integer between [0,11]).`
        );
      runInAction(() => (this.store.notes[i].isMarked = true));
    });
  }

  private isValidIndex(i: number) {
    return 0 <= i && i < this.store.notes.length && i % 1 === 0;
  }

  logMarkedKeys() {
    this.store.notes.forEach((noteState) => {
      if (noteState.isMarked) console.log(`${noteState.note} is marked!`);
    });
  }

  @action
  private unmarkAll() {
    this.store.notes.forEach((noteState) =>
      runInAction(() => (noteState.isMarked = false))
    );
  }

  @action
  toggleKey(noteState: NoteState) {
    runInAction(() => (noteState.isMarked = !noteState.isMarked));
  }
}
