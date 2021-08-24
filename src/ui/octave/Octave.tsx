import "./Octave.css";
import { BlackKey, WhiteKey, GhostKey } from "./key/Key";
import { action, runInAction } from "mobx";
import { observer } from "mobx-react";
import { OctaveStore } from "./OctaveStore";
import { OctavePresenter } from "./OctavePresenter";
import { OctaveView, BlackKeys, WhiteKeys, Props } from "./OctaveView";

/**
 * A Note enum is used to provide a canonical and human-friendly representation for indexing the notes in an octave's state.
 */
export enum Note {
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

export const createOctave = () => {
  const defaultNotesState = NOTES.map((note) => ({
    note: note,
    isMarked: false,
  }));
  const store = new OctaveStore(defaultNotesState);
  const presenter = new OctavePresenter(store);

  const { notes } = store;

  return observer(() => (
    <OctaveView>
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
                  onClick={async () => presenter.toggleKey(noteState)}
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
                onClick={async () => presenter.toggleKey(noteState)}
                isMarked={noteState.isMarked}
              ></WhiteKey>
            );
          })}
      </WhiteKeys>
    </OctaveView>
  ));
};

export function OctaveContainer(props: Props) {
  return <section className="OctaveView">{props.children}</section>;
}
