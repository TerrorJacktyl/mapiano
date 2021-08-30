import { BlackKey, WhiteKey, GhostKey } from "./key/Key";
import { observer } from "mobx-react";
import { isKeySharp, OctaveStore } from "./OctaveStore";
import { OctavePresenter } from "./OctavePresenter";
import { OctaveView, BlackKeys, WhiteKeys } from "./OctaveView";
import React from "react";

const NUMBER_OF_NOTES_IN_OCTAVE = 12;

export const createOctave = (octave: number) => {
  const store = new OctaveStore();
  const presenter = new OctavePresenter(store);

  const { notes } = store;

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
                  note={noteState.note + octave.toString()}
                  onClick={(e: React.MouseEvent) => {
                    presenter.toggleKey(noteState);
                    presenter.onClickSound(e);
                    store.onClickCallBack();
                  }}
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
                note={noteState.note + octave.toString()}
                onClick={(e: React.MouseEvent) => {
                  presenter.toggleKey(noteState);
                  presenter.onClickSound(e);
                  store.onClickCallBack();
                }}
                isMarked={noteState.isMarked}
              ></WhiteKey>
            );
          })}
      </WhiteKeys>
    </OctaveView>
  ));

  return {
    Octave,
    store,
    mark: presenter.mark,
    unmarkAll: presenter.unmarkAll,
  };
};
