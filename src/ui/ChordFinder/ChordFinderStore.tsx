import { Chord } from "../../chords/chords";
import { PianoStore } from "./Piano/PianoStore";

export class ChordFinderStore {
  constructor(private pianoStore: PianoStore, chordSymbol: string) {}
}
