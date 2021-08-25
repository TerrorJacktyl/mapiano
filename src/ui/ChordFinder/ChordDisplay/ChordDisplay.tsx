import { observer } from "mobx-react";
import { ChordDisplayPresenter } from "./ChordDisplayPresenter";
import { ChordDisplayStore } from "./ChordDisplayStore";
import { ChordDisplayView } from "./ChordDisplayView";

export function createChordDisplay() {
  const store = new ChordDisplayStore();
  const presenter = new ChordDisplayPresenter(store);

  const ChordDisplay = observer(() => (
    <ChordDisplayView
      chordName={store.chordName.get()}
      chordSymbol={store.chordSymbol.get()}
      // need anonymity and presenter.method here to preserve 'this' binding to presenter
      onChangeSymbol={(symbol) => presenter.updateSymbol(symbol)}
    ></ChordDisplayView>
  ));

  return {
    ChordDisplay,
    store: store,
    // need presenter.methodName to preserve this binding
    updateSymbol: presenter.updateSymbol,
    updateName: presenter.updateName,
  };
}
