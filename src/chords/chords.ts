import type { chord as ParsedChord, quality as ParsedQuality } from "./parser";

// Hardcode intervals

enum Interval {
  UNISON = 0,
  MINOR_SECOND = 1,
  MAJOR_SECOND = 2,
  MINOR_THIRD = 3,
  MAJOR_THIRD = 4,
  PERFECT_FOURTH = 5,
  TRITONE = 6,
  PERFECT_FIFTH = 7,
  MINOR_SIXTH = 8,
  MAJOR_SIXTH = 9,
  DIMINISHED_SEVENTH = 9,
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
  MAJOR_THIRTEENTH = OCTAVE + MAJOR_SIXTH,
}

// Helper functions
function replace(ints: Interval[], remove: Interval, replacement: Interval) {
  return ints.map((interval) => (interval == remove ? replacement : interval));
}
function remove(ints: Interval[], removals: Interval[]) {
  return ints.filter((i) => !removals.includes(i));
}

function add(ints: Interval[], newInterval: Interval) {
  if (ints.find((i) => i == newInterval)) {
    return ints;
  }
  ints.push(newInterval);
  ints.sort();
  return ints;
}

/**
 * Modifiers
 * (Interval) modifiers are used to construct interval lists for different chord types.
 * The idea is to construct chords how you might as a human: start with the major chord
 * and then modify or extend it to create other chords. That way, give a chord with a
 * root, quality, extensions etc. we can generate the keys that correspond to that
 * chord.
 */

const MAJOR = [Interval.UNISON, Interval.MAJOR_THIRD, Interval.PERFECT_FIFTH];

// Chord qualities (major, minor, augment, diminished, power) as chords
type Modifier = (ints: Interval[]) => Interval[];
const identity = (ints: Interval[]) => ints;
const minorThird = (ints: Interval[]) =>
  replace(ints, Interval.MAJOR_THIRD, Interval.MINOR_THIRD);
const augmentedFifth = (ints: Interval[]) =>
  replace(ints, Interval.PERFECT_FIFTH, Interval.MINOR_SIXTH);
const diminishedFifth = (ints: Interval[]) =>
  replace(ints, Interval.PERFECT_FIFTH, Interval.TRITONE);
const minorSeventh = (ints: Interval[]) => add(ints, Interval.MINOR_SEVENTH);
const diminishedSeventh = (ints: Interval[]) =>
  add(ints, Interval.DIMINISHED_SEVENTH);
const power = (ints: Interval[]) =>
  remove(ints, [Interval.MAJOR_THIRD, Interval.MINOR_THIRD]);
const sus2 = (ints: Interval[]) => add(power(ints), Interval.MAJOR_SECOND);
const sus4 = (ints: Interval[]) => add(power(ints), Interval.PERFECT_FOURTH);

const MINOR = minorThird(MAJOR);
const AUGMENTED = augmentedFifth(MAJOR);
const DIMINSHED = diminishedFifth(MINOR);
const POWER = power(MAJOR);

// Write chord added intervals (major sixth, major/minor seventh, major 9th/11th/13th)
// Write chord extensions (b9, 9, 11, #11, b13, 13) and minor 7th modifications (M7)
// Write chord modifications (sus2, sus4)

type Tone = "C" | "D" | "E" | "F" | "G" | "A" | "B";
type Sharp = "#";
type Flat = "b";
type NoteModifier = undefined | Sharp | Flat;
type TNote = {
  tone: Tone;
  modifier: NoteModifier;
  symbol: string;
};
type Quality =
  | "Major"
  | "Minor"
  | "Augmented"
  | "Diminished"
  // | "Half Diminished"
  | "Power"
  | "Suspended 2nd"
  | "Suspended 4th";
type TChord = {
  root: Note;
  quality: Quality;
};

class Note implements TNote {
  tone: Tone;
  modifier: NoteModifier = undefined;

  constructor(tone: Tone, modifier?: NoteModifier) {
    this.tone = tone;
    this.modifier = modifier;
  }

  get symbol() {
    return this.modifier ? this.tone + this.modifier : this.tone;
  }
}

export class Chord implements TChord {
  root: Note;
  quality: Quality;
  private _intervals?: Interval[] = undefined;

  constructor(root: Note, quality: Quality) {
    this.root = root;
    this.quality = quality;
  }

  get name(): string {
    const { root, quality } = this;
    const names = [root.symbol, quality];
    return names.join(" ");
  }

  get intervals(): Interval[] {
    if (!this._intervals) {
      let result = MAJOR;
      const modifiers: Modifier[] = [this.qualityModifier()];
      for (const f of modifiers) {
        result = f(result);
      }
      this._intervals = result;
    }
    return this._intervals;
  }

  private qualityModifier() {
    switch (this.quality) {
      case "Major":
        return identity;
      case "Minor":
        return minorThird;
      case "Augmented":
        return augmentedFifth;
      case "Diminished":
        return diminishedFifth;
      // case "Half Diminished":
      //   return;
      case "Power":
        return power;
      case "Suspended 2nd":
        return sus2;
      case "Suspended 4th":
        return sus4;
      default:
        throw `Unhandled quality case: ${this.quality}`;
    }
  }
}

// || Parsing

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

function evaluateQuality(quality: FullParsedQuality): Quality {
  if (quality.major || quality.major == "") return "Major";
  if (quality.minor) return "Minor";
  if (quality.augmented) return "Augmented";
  if (quality.diminished) return "Diminished";
  // if (quality.half_diminished) return "Half Diminished";
  if (quality.power) return "Power";
  if (quality.sus2) return "Suspended 2nd";
  if (quality.sus4) return "Suspended 4th";
  throw "Unhandled quality:" + JSON.stringify(quality);
}

export function evaluate(chord: ParsedChord): Chord {
  if (chord == null) throw Error("Parsed chord is null.");
  const { root: _root, quality: _quality } = chord;
  const root = new Note(<Tone>_root.tone, <NoteModifier>_root.modifier);
  const quality = evaluateQuality(_quality);
  return new Chord(root, quality);
}

export {};
