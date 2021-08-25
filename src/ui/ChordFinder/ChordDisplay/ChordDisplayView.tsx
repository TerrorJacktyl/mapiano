import { observer } from "mobx-react";
import React from "react";
import "./ChordDisplay.css";
import { ChordDisplayPresenter } from "./ChordDisplayPresenter";
import { ChordDisplayStore } from "./ChordDisplayStore";

type Props = {
  chordName: string;
  chordSymbol: string;
  onChangeSymbol: (symbol: string) => void;
};

export function ChordDisplayView({
  chordName,
  chordSymbol,
  onChangeSymbol,
}: Props) {
  return (
    <section className="ChordControlsView">
      <form>
        <p>
          <label>{"Name: "}</label>
          {chordName}
        </p>
        <p>
          <label>{"Chord: "}</label>
          <input
            value={chordSymbol}
            type="text"
            name="chordName"
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              onChangeSymbol(e.currentTarget.value)
            }
          />
        </p>
      </form>
    </section>
  );
}

export function createChordDisplay() {
  const store = new ChordDisplayStore();
  const presenter = new ChordDisplayPresenter(store);

  const ChordDisplay = observer(() => (
    <ChordDisplayView
      chordName={store.chordName.get()}
      chordSymbol={store.chordSymbol.get()}
      // need anonymity here to preserve 'this' binding to presenter
      onChangeSymbol={(symbol) => presenter.updateSymbol(symbol)}
    ></ChordDisplayView>
  ));

  return { ChordDisplay };
}
