import { observable } from "mobx";

export class ChordDisplayStore {
  @observable readonly chordName = observable.box("");
  @observable readonly chordSymbol = observable.box("");
}
