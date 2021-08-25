import { ChordDisplayStore } from "./ChordDisplay/ChordDisplayStore";
import { PianoStore } from "./Piano/PianoStore";

type ChordDisplay = {
  store: ChordDisplayStore;
  updateSymbol: (symbol: string) => void;
  updateName: (symbol: string) => void;
};

export class ChordFinderStore {
  constructor(
    readonly pianoStore: PianoStore,
    readonly display: ChordDisplay
  ) {}
}
