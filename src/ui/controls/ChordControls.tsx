import React from "react";
import "./ChordControls.css";

type Chord = {
  name: string;
  symbol: string;
  notes: string[];
};

type Props = {
  chord: Chord;
  onChangeSymbol: (symbol: string) => void;
};

export function ChordControls(props: Props) {
  const { chord, onChangeSymbol: onChange } = props;
  return (
    <section className="ChordControlsView">
      <form>
        <p>
          <label>{"Name: "}</label>
          {props.chord.name}
        </p>
        <p>
          <label>{"Chord: "}</label>
          <input
            value={chord.symbol}
            type="text"
            name="chordName"
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              props.onChangeSymbol(e.currentTarget.value)
            }
          />
        </p>
      </form>
    </section>
  );
}
