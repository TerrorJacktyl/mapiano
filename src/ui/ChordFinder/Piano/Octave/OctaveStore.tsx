import { computed, observable } from "mobx";

export type NoteState = {
  note: string;
  isMarked: boolean;
};

/**
 * This Note type is used to provide a canonical and human-friendly representation for indexing the notes in an octave's state.
 */
export type Note =
  | "C"
  | "C#"
  | "D"
  | "D#"
  | "E"
  | "F"
  | "F#"
  | "G"
  | "G#"
  | "A"
  | "A#"
  | "B";

export const NOTES: Note[] = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

const DEFAULT_NOTES_STATE = NOTES.map((note) => ({
  note: note,
  isMarked: false,
}));

export class OctaveStore {
  @observable readonly notes: NoteState[] = observable(DEFAULT_NOTES_STATE);

  @computed
  get markedIndexes() {
    return this.notes
      .map((n, i) => ({ ...n, i }))
      .filter(({ isMarked }) => isMarked)
      .map(({ i }) => i);
  }
}
