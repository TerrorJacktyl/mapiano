import React from "react";
import "./Octave.css";
import { BlackKey, WhiteKey, GhostKey } from "./key/Key";
import { action, IObservableArray, observable, runInAction } from "mobx";
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
const NOTES = [...Array(NUMBER_OF_NOTES_IN_OCTAVE)].map((_, i) => Note[i]);
const WHITE_KEYS = OCTAVE.split("");
const SHARP_KEYS = OCTAVE.split("");

const ONCLICK: () => any = () => {};

type NoteState = {
  note: string;
  isMarked: Boolean;
};

class OctaveStore {
  initialisedNotes = observable(new Boolean(false));
  // All notes are not marked by default
  markedNotes = observable(
    NOTES.map((note) => ({ note: note, isMarked: false }))
  );
}

class OctavePresenter {
  constructor(private store: OctaveStore) {
    const cMajor = [0, 4, 7];
    setTimeout(() => {
      this.mark(cMajor);
      console.log("marked!");
    }, 5000);
  }

  // For now, assume that input indexes are valid i.e. natural numbers
  public mark(indexesToMark: number[]) {
    for (const i of indexesToMark) {
      if (i >= NUMBER_OF_NOTES_IN_OCTAVE)
        throw `The index ${i} does not fall inside [0,11].`;
      runInAction(() => (this.store.markedNotes[i].isMarked = true));
    }
    this.logMarkedKeys();
  }

  public logMarkedKeys() {
    const markedNotes = this.store.markedNotes;
    for (let i = 0; i < markedNotes.length; i++) {
      if (markedNotes[i].isMarked) console.log(`${Note[i]} is marked!`);
    }
  }

  @action
  private unmarkAll() {
    for (let i = 0; i < this.store.markedNotes.length; i++) {
      this.store.markedNotes[i].isMarked = false;
    }
  }
}

const ObservedWhiteKey = observer((props: KeyProps) => (
  <WhiteKey {...props}></WhiteKey>
));

export function createOctave() {
  const store = new OctaveStore();
  const presenter = new OctavePresenter(store);

  return <Octave markedNotes={store.markedNotes} />;
}

export const Octave = observer((props: { markedNotes: Array<NoteState> }) => {
  const { markedNotes } = props;
  return (
    <div className="Octave">
      <p>
        Is C marked:{" "}
        {markedNotes.length > 0 && markedNotes[0].isMarked ? "yes" : "no"}
      </p>
      <div className="sharps">
        {[<GhostKey />].concat(
          WHITE_KEYS.map((note) => {
            if (!SHARPS.includes(note)) return <GhostKey />;
            const props = { onClick: ONCLICK, isMarked: false };
            return <BlackKey {...props}></BlackKey>;
          })
        )}
      </div>
      <div className="whites">
        {markedNotes
          .filter((noteState) => !noteState?.note.includes("#"))
          .map((noteState) => {
            return (
              <ObservedWhiteKey
                key={noteState.note}
                onClick={ONCLICK}
                isMarked={noteState.isMarked.valueOf()}
              ></ObservedWhiteKey>
            );
          })}
      </div>
    </div>
  );
});

type ViewProps = {
  children?: React.ReactNode;
};

export function OctaveView(props: ViewProps) {
  return <section className="OctaveView">{props.children}</section>;
}
