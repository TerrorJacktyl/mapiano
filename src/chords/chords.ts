import type {
  chord as ParsedChord,
  quality as ParsedQuality,
} from "./parser.ts";
// Hardcode intervals
export type Interval = number;
const UNISON = 0,
  MINOR_SECOND = 1,
  MAJOR_SECOND = 2,
  MINOR_THIRD = 3,
  MAJOR_THIRD = 4,
  PERFECT_FOURTH = 5,
  TRITONE = 6,
  PERFECT_FIFTH = 7,
  MINOR_SIXTH = 8,
  MAJOR_SIXTH = 9,
  MINOR_SEVENTH = 10,
  MAJOR_SEVENTH = 11,
  OCTAVE = 12,
  MINOR_NINTH = OCTAVE + MINOR_SECOND,
  MAJOR_NINTH = OCTAVE + MAJOR_SECOND,
  MINOR_TENTH = OCTAVE + MINOR_THIRD,
  MAJOR_TENTH = OCTAVE + MAJOR_THIRD,
  PERFECT_ELEVENTH = OCTAVE + PERFECT_FOURTH,
  COMPOUND_TRITONE = OCTAVE + TRITONE,
  PERFECT_TWELFTH = OCTAVE + PERFECT_FIFTH,
  MINOR_THIRTEENTH = OCTAVE + MAJOR_SIXTH,
  MAJOR_THIRTEENTH = OCTAVE + MAJOR_SIXTH;

// Helper function
function replace(chord: Interval[], remove: Interval, replacement: Interval) {
  return chord.map((interval) => (interval == remove ? replacement : interval));
}

function remove(chord: Interval[], remove: Interval) {
  const removeIndex = chord.find((i) => i == remove);
  return removeIndex ? chord.splice(removeIndex, 1) : chord;
}

// Write chord qualities (major, minor, augment, diminished, power) as chords
const MAJOR = [UNISON, MAJOR_THIRD, PERFECT_FIFTH];
const MINOR = [UNISON, MINOR_THIRD, PERFECT_FIFTH];
const POWER = remove(MAJOR, MAJOR_THIRD);
const DIMINISHED = replace(MINOR, PERFECT_FIFTH, TRITONE);
const AUGMENTED = replace(MAJOR, PERFECT_FIFTH, MINOR_SIXTH);

// Write chord added intervals (major sixth, major/minor seventh, major 9th/11th/13th)
// Write chord extensions (b9, 9, 11, #11, b13, 13) and minor 7th modifications (M7)
// Write chord modifications (sus2, sus4)

type Tone = "C" | "D" | "E" | "F" | "G" | "A" | "B";
type Sharp = "#";
type Flat = "b";
type Modifier = undefined | Sharp | Flat;
type TNote = {
  tone: Tone;
  modifier?: Modifier;
  symbol: string;
};
type Quality = "Major" | "Minor" | "Augmented" | "Diminished" | "Power";

class Note implements TNote {
  tone: Tone;
  modifier: Modifier = undefined;

  constructor(tone: Tone, modifier?: Modifier) {
    this.tone = tone;
    this.modifier = modifier;
  }

  get symbol() {
    return this.modifier ? this.tone + this.modifier : this.tone;
  }
}

type TChord = {
  root: Note;
  quality: Quality;
};

class Chord implements TChord {
  root: Note;
  quality: Quality;

  constructor(root: Note, quality: Quality) {
    this.root = root;
    this.quality = quality;
  }
}

type FullParsedQuality = ParsedQuality & {
  major?: string;
  minor?: string;
  augmented?: string;
  diminished?: string;
  power?: string;
};

function evaluateQuality(quality: FullParsedQuality): Quality {
  if (quality.major || quality.major == "") return "Major";
  if (quality.minor) return "Minor";
  if (quality.augmented) return "Augmented";
  if (quality.diminished) return "Diminished";
  return "Power";
}

export function evaluate(chord: ParsedChord): Chord {
  if (chord == null) throw Error("Parsed chord is null.");
  const { root: _root, quality: _quality } = chord;
  const root = new Note(<Tone>_root.tone, <Modifier>_root.modifier);
  const quality = evaluateQuality(_quality);
  return new Chord(root, quality);
}

export {};
