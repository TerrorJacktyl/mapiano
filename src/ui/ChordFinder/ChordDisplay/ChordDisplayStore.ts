import { observable } from "mobx";

type DisplayChord = {
  name: string;
  symbol: string;
};

export class ChordDisplayStore {
  // @observable chord: DisplayChord = observable({ name: "", symbol: "" });

  @observable readonly chordName = observable.box("");
  @observable readonly chordSymbol = observable.box("");
}
