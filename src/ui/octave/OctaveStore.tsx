import { observable } from "mobx";

export type NoteState = {
  note: string;
  isMarked: boolean;
};

export class OctaveStore {
  @observable notes: NoteState[];

  constructor(markedNotes: NoteState[]) {
    this.notes = observable(markedNotes);
  }
}
