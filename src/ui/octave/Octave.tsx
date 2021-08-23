import React from "react";
import "./Octave.css";
import { BlackKey, WhiteKey as _WhiteKey, GhostKey } from "./key/Key";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { Chord } from "../../chords/chords";
import type { Props as KeyProps } from "./key/Key";

const OCTAVE = "CDEFGAB";
const SHARPS = "CDFGA";

enum Note {
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
}

const NUMBER_OF_NOTES_IN_OCTAVE = 12;
const WHITE_KEYS = OCTAVE.split("");
const SHARP_KEYS = OCTAVE.split("");

const ONCLICK: () => any = () => {};

class OctaveStore {
  cMajor = [0, 4, 7];
  // All notes are not marked by default
  @observable.deep markedNotes = Array(12).map((_, i) =>
    this.cMajor.includes(i) ? true : false
  );
}

class OctavePresenter {
  constructor(private store: OctaveStore) {
    const cMajor = [0, 4, 7];
    this.mark(cMajor);
  }

  // For now, assume that input indexes are valid i.e. natural numbers
  @action
  public mark(indexesToMark: number[]) {
    this.unmarkAll();
    for (const i of indexesToMark) {
      if (i >= NUMBER_OF_NOTES_IN_OCTAVE)
        throw `The index ${i} does not fall inside [0,11].`;
      this.store.markedNotes[i] = true;
    }
  }

  @action
  unmarkAll() {
    for (let i = 0; i < this.store.markedNotes.length; i++) {
      this.store.markedNotes[i] = false;
    }
  }
}

export function Octave() {
  const store = new OctaveStore();
  const presenter = new OctavePresenter(store);

  const WhiteKey = observer((props: KeyProps) => (
    <_WhiteKey {...props}></_WhiteKey>
  ));

  return (
    <div className="Octave">
      <div className="sharps">
        {[<GhostKey />].concat(
          WHITE_KEYS.map((note) => {
            if (!SHARPS.includes(note)) return <GhostKey />;
            const props = { onClick: ONCLICK, isMarked: false };
            return <BlackKey {...props}></BlackKey>;
            // const keyStoreIndex = (note + "#") as any as Note;
            // return observer(() => (
            //   <BlackKey
            //     onClick={ONCLICK}
            //     isMarked={store.markedNotes[keyStoreIndex]}
            //   ></BlackKey>
            // ))();
          })
        )}
      </div>
      <div className="whites">
        {WHITE_KEYS.map((note) => {
          const keyStoreIndex = parseInt(Note[note as any as Note]);
          console.log(
            `Note ${note} (${keyStoreIndex}) is ${
              store.markedNotes[keyStoreIndex] ? "marked" : "unmarked"
            }`
          );
          return (
            <WhiteKey
              onClick={ONCLICK}
              isMarked={store.markedNotes[keyStoreIndex]}
            ></WhiteKey>
          );
        })}
      </div>
    </div>
  );
}

type ViewProps = {
  children?: React.ReactNode;
};

export function OctaveView(props: ViewProps) {
  return <section className="OctaveView">{props.children}</section>;
}
