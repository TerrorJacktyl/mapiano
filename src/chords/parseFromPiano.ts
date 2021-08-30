import {
  isKeySharp,
  Note as UINote,
} from "../ui/ChordFinder/Piano/Octave/OctaveStore";
import {
  Chord,
  Note,
  Quality,
  QualityName,
  QUALITY_NAMES,
  Tone,
  ToneModifier,
} from "./chords";

/**
 * Chord features are every attribute of a chord except the root note.
 */

type ChordFeatureNames = {
  quality: QualityName;
};

function intervalsToChordFeatures(qualities: QualityName[]) {
  const root = new Note("C");
  const chordsWithDistinctFeatures = qualities.map(
    (q) => new Chord(root, new Quality(q))
  );
  const intervalsToFeatures: { [intervals: string]: ChordFeatureNames } = {};
  chordsWithDistinctFeatures.forEach(
    (chord) =>
      /** The same interval list will yield the same string representation even if the arrays are different.
       * We can't use indexed types (i.e. arrays) as key types for a POJO, so using the string representation
       * is a suitable substitute.
       */
      /** */
      (intervalsToFeatures[chord.intervals.toString()] = {
        quality: chord.quality.quality,
      })
  );
  return intervalsToFeatures;
}

const INTERVAL_LISTS_TO_CHORD_FEATURES =
  intervalsToChordFeatures(QUALITY_NAMES);

export default function parseChordFromPiano(
  rootSymbol: UINote,
  intervals: number[]
): Chord | undefined {
  const chordFeatures = INTERVAL_LISTS_TO_CHORD_FEATURES[intervals.toString()];
  if (!chordFeatures) return undefined;
  const root = new Note(
    rootSymbol[0] as Tone,
    isKeySharp(rootSymbol) ? ("#" as ToneModifier) : undefined
  );
  const quality = new Quality(chordFeatures.quality);
  const chord = new Chord(root, quality);
  return chord;
}
