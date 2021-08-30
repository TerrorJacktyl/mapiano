import { action, runInAction } from "mobx";
import { NoteState, OctaveStore } from "./OctaveStore";
import * as Tone from "tone";

const TONE_SAMPLER_PARAMETERS = {
  urls: {
    A0: "A0.mp3",
    C1: "C1.mp3",
    "D#1": "Ds1.mp3",
    "F#1": "Fs1.mp3",
    A1: "A1.mp3",
    C2: "C2.mp3",
    "D#2": "Ds2.mp3",
    "F#2": "Fs2.mp3",
    A2: "A2.mp3",
    C3: "C3.mp3",
    "D#3": "Ds3.mp3",
    "F#3": "Fs3.mp3",
    A3: "A3.mp3",
    C4: "C4.mp3",
    "D#4": "Ds4.mp3",
    "F#4": "Fs4.mp3",
    A4: "A4.mp3",
    C5: "C5.mp3",
    "D#5": "Ds5.mp3",
    "F#5": "Fs5.mp3",
    A5: "A5.mp3",
    C6: "C6.mp3",
    "D#6": "Ds6.mp3",
    "F#6": "Fs6.mp3",
    A6: "A6.mp3",
    C7: "C7.mp3",
    "D#7": "Ds7.mp3",
    "F#7": "Fs7.mp3",
    A7: "A7.mp3",
    C8: "C8.mp3",
  },
  release: 1,
  baseUrl: "https://tonejs.github.io/audio/salamander/",
};

export class OctavePresenter {
  private sampler: Tone.Sampler;

  constructor(private store: OctaveStore) {
    this.mark = this.mark.bind(this);
    this.sampler = new Tone.Sampler(TONE_SAMPLER_PARAMETERS).toDestination();
  }

  async playSound(note: string) {
    await Tone.loaded();
    this.sampler.triggerAttackRelease(note, "0.3s");
  }

  async onClickSound(e: React.MouseEvent) {
    const note = e.currentTarget.getAttribute("note");
    const isMarked = e.currentTarget.className.includes("Marked");
    if (note && !isMarked) this.playSound(note);
  }

  public mark(indexesToMark: number[]) {
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
  public unmarkAll() {
    this.store.notes.forEach((noteState) =>
      runInAction(() => (noteState.isMarked = false))
    );
  }

  @action
  toggleKey(noteState: NoteState) {
    runInAction(() => (noteState.isMarked = !noteState.isMarked));
  }
}
