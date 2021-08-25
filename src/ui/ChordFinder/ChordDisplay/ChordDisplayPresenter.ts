import { action, runInAction } from "mobx";
import { ChordDisplayStore } from "./ChordDisplayStore";

export class ChordDisplayPresenter {
  private store: ChordDisplayStore;

  constructor(store: ChordDisplayStore) {
    this.store = store;
  }

  @action
  public updateSymbol(symbol: string) {
    runInAction(() => this.store.chordSymbol.set(symbol));
  }

  @action
  public updateName(name: string) {
    runInAction(() => this.store.chordName.set(name));
  }
}
