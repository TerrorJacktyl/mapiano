import { observable } from "mobx";
import { Note } from "./Octave";

export type NoteState = {
  note: string;
  isMarked: boolean;
};

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
  @observable notes: NoteState[] = observable(DEFAULT_NOTES_STATE);
}
