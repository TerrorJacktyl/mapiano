import "./Octave.css";
import { BlackKey, WhiteKey, GhostKey } from "./key/Key";
import { action, observable, runInAction } from "mobx";
import { observer } from "mobx-react";

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
const isKeySharp = (note: string) => note.includes("#");

const ONCLICK: () => any = () => {};

type NoteState = {
  note: string;
  isMarked: boolean;
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

  mark(indexesToMark: number[]) {
    indexesToMark.forEach((i) => {
      if (!this.isValidIndex(i))
        throw Error(
          `The index ${i} is invalid (not an integer between [0,11]).`
        );
      runInAction(() => (this.store.notes[i].isMarked = true));
    });
  }

  private isValidIndex(i: number) {
    return 0 <= i && i < this.store.notes.length && i % 1 === 0;
  }

  logMarkedKeys() {
    this.store.notes.forEach((noteState) => {
      if (noteState.isMarked) console.log(`${noteState.note} is marked!`);
    });
  }

  @action
  private unmarkAll() {
    this.store.notes.forEach((noteState) =>
      runInAction(() => (noteState.isMarked = false))
    );
  }

  // @action toggleKey(note: Note) {
  //   this.store.notes[Note.C];
  // }
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
          // We want to link the sharp key states and pad the grid with ghost keys
          notes
            .filter(
              (noteState, i) =>
                isKeySharp(noteState.note) ||
                !isKeySharp(notes[(i + 1) % 12].note)
            )
            .map((noteState) =>
              isKeySharp(noteState.note) ? (
                <BlackKey
                  key={noteState.note}
                  onClick={ONCLICK}
                  isMarked={noteState.isMarked}
                ></BlackKey>
              ) : (
                <GhostKey key={noteState.note} />
              )
            )
        )}
      </BlackKeys>
      <WhiteKeys>
        {notes
          .filter((noteState) => !isKeySharp(noteState.note))
          .map((noteState) => {
            return (
              <WhiteKey
                key={noteState.note}
                onClick={ONCLICK}
                isMarked={noteState.isMarked}
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
