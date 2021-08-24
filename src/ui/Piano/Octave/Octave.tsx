import { BlackKey, WhiteKey, GhostKey } from "./key/Key";
import { observer } from "mobx-react";
import { OctaveStore } from "./OctaveStore";
import { OctavePresenter } from "./OctavePresenter";
import { OctaveView, BlackKeys, WhiteKeys } from "./OctaveView";

/**
 * A Note enum is used to provide a canonical and human-friendly representation for indexing the notes in an octave's state.
 */
export type Note =
  | "C"
  | "C#"
  | "D"
  | "D#"
  | "E"
  | "F"
  | "F#"
  | "G"
  | "G#"
  | "A"
  | "A#"
  | "B";

const NUMBER_OF_NOTES_IN_OCTAVE = 12;

const isKeySharp = (note: string) => note.includes("#");

export const createOctave = () => {
  const store = new OctaveStore();
  const presenter = new OctavePresenter(store);

  const { notes } = store;

  const { mark } = presenter;

  const Octave = observer(() => (
    <OctaveView>
      <BlackKeys>
        {[<GhostKey key={"B placeholder"} />].concat(
          // We want to link the sharp key states and pad the grid with ghost keys
          notes
            .filter(
              (noteState, i) =>
                isKeySharp(noteState.note) ||
                !isKeySharp(notes[(i + 1) % NUMBER_OF_NOTES_IN_OCTAVE].note)
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

  return { Octave, mark };
};
