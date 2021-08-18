import React from "react";

const OCTAVE = "CDEFGAB";
const SHARPS = "CDFGA";
const WHITE_KEYS = OCTAVE.split("");
const SHARP_KEYS = OCTAVE.split("");

function WhiteKey() {
  return <div className="key"></div>;
}

function SharpKey() {
  return <div className="key sharp"></div>;
}

function GhostKey() {
  return <div />;
}

function GhostOrSharp(note: string) {
  return SHARPS.includes(note) ? <SharpKey /> : <GhostKey />;
}

export function Octave() {
  return (
    <div className="octave">
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
