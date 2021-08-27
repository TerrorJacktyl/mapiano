import { Chord } from "../../chords/chords";
import { ChordDisplayStore } from "./ChordDisplay/ChordDisplayStore";
import { PianoStore } from "./Piano/PianoStore";

type PianoState = {
  store: PianoStore;
  mark: (chord: Chord) => void;
  unmarkAll: () => void;
  markedNotesIndexes: () => number[];
};

type ChordDisplayState = {
  store: ChordDisplayStore;
  updateSymbol: (symbol: string) => void;
  updateName: (symbol: string) => void;
};

export class ChordFinderStore {
  constructor(
    readonly piano: PianoState,
    readonly display: ChordDisplayState
  ) {}
}
