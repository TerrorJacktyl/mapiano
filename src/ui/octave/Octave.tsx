import React from "react";
import "./Octave.css";

const OCTAVE = "CDEFGAB";
const SHARPS = "CDFGA";
const WHITE_KEYS = OCTAVE.split("");
const SHARP_KEYS = OCTAVE.split("");

function WhiteKey() {
  return <div className="Key"></div>;
}

function SharpKey() {
  return <div className="Key Sharp"></div>;
}

function GhostKey() {
  return <div className="Ghost" />;
}

function GhostOrSharp(note: string) {
  return SHARPS.includes(note) ? <SharpKey /> : <GhostKey />;
}

export function Octave() {
  return (
    <div className="Octave">
      <div className="sharps">
        {[<GhostKey />].concat(SHARP_KEYS.map((note) => GhostOrSharp(note)))}
      </div>
      <div className="whites">
        {WHITE_KEYS.map((note) => (
          <WhiteKey key={note} />
        ))}
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
