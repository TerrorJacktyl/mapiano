import {
  chord as ParsedChord,
  parse,
  quality as ParsedQuality,
} from "./parser";
import {
  QualityName,
  Chord,
  Note,
  Tone,
  NoteModifier,
  Quality,
} from "../chords";

// || Parsing from symbol
type FullParsedQuality = ParsedQuality & {
  major?: string;
  minor?: string;
  augmented?: string;
  diminished?: string;
  half_diminished?: string;
  power?: string;
  sus2?: string;
  sus4?: string;
};
function evaluateQualityName(quality: FullParsedQuality): QualityName {
  if (quality.major || quality.major === "") return "Major";
  if (quality.minor) return "Minor";
  if (quality.augmented) return "Augmented";
  if (quality.diminished) return "Diminished";
  // if (quality.half_diminished) return "Half Diminished";
  if (quality.power) return "Power";
  if (quality.sus2) return "Suspended 2nd";
  if (quality.sus4) return "Suspended 4th";
  throw "Unhandled quality:" + JSON.stringify(quality);
}

export function evaluateParsedSymbol(chord: ParsedChord | null): Chord {
  if (chord === null) throw Error("Parsed chord is null.");
  const { root: _root, quality: _quality } = chord;
  const root = new Note(<Tone>_root.tone, <NoteModifier>_root.modifier);
  const quality = new Quality(evaluateQualityName(_quality));
  return new Chord(root, quality);
}

export function parseChordFromSymbol(chordSymbol: string): Chord | undefined {
  const { ast } = parse(chordSymbol);
  if (ast) return evaluateParsedSymbol(ast);
  return undefined;
}
