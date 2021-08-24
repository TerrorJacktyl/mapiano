import React from "react";
import "./Octave.css";
import { BlackKey, WhiteKey, GhostKey } from "./key/Key";
import { action, observable, runInAction } from "mobx";
import { observer } from "mobx-react";

const OCTAVE = "CDEFGAB";
const SHARPS = "CDFGA";

/**
 * A Note enum is used to provide a canonical and human-friendly representation for indexing the notes in an octave's state.
 */
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
  @observable notes: NoteState[];

  constructor(markedNotes: NoteState[]) {
    this.notes = observable(markedNotes);
  }
}

class OctavePresenter {
  constructor(private store: OctaveStore) {
    const cMajor = [0, 4, 7];
    setTimeout(() => {
      this.mark(cMajor);
    }, 1000);
    setTimeout(() => {
      this.unmarkAll();
    }, 3000);
  }

  // For now, assume that input indexes are valid i.e. natural numbers
  public mark(indexesToMark: number[]) {
    for (const i of indexesToMark) {
      if (i >= NUMBER_OF_NOTES_IN_OCTAVE)
        throw `The index ${i} does not fall inside [0,11].`;
      runInAction(() => (this.store.notes[i].isMarked = true));
    }
  }

  public logMarkedKeys() {
    const markedNotes = this.store.notes;
    for (let i = 0; i < markedNotes.length; i++) {
      if (markedNotes[i].isMarked) console.log(`${Note[i]} is marked!`);
    }
  }

  @action
  private unmarkAll() {
    for (let i = 0; i < this.store.notes.length; i++) {
      runInAction(() => (this.store.notes[i].isMarked = false));
    }
  }
}

export const createOctave = () => {
  const defaultNotesState = NOTES.map((note) => ({
    note: note,
    isMarked: false,
  }));
  const store = new OctaveStore(defaultNotesState);
  const presenter = new OctavePresenter(store);

  const { notes } = store;

  return observer(() => (
    <Octave>
      <BlackKeys>
        {[<GhostKey key={"B placeholder"} />].concat(
          WHITE_KEYS.map((note) => {
            if (!SHARPS.includes(note)) return <GhostKey key={note} />;
            const props = { onClick: ONCLICK, isMarked: false };
            return <BlackKey {...props} key={note}></BlackKey>;
          })
        )}
      </BlackKeys>
      <WhiteKeys>
        {notes
          .filter((noteState) => !noteState?.note.includes("#"))
          .map((noteState) => {
            return (
              <WhiteKey
                key={noteState.note}
                onClick={ONCLICK}
                isMarked={noteState.isMarked.valueOf()}
              ></WhiteKey>
            );
          })}
      </WhiteKeys>
    </Octave>
  ));
};

type Props = {
  children: JSX.Element[];
};

function WhiteKeys(props: Props) {
  const { children } = props;
  return <div className="WhiteKeys">{children}</div>;
}

function BlackKeys(props: Props) {
  const { children } = props;
  return <div className="BlackKeys">{children}</div>;
}

function Octave(props: Props) {
  const { children } = props;
  return <div className="Octave">{children}</div>;
}

export function OctaveView(props: Props) {
  return <section className="OctaveView">{props.children}</section>;
}
