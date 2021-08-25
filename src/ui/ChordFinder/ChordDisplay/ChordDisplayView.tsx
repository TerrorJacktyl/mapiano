import React from "react";
import "./ChordDisplay.css";

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
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
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
