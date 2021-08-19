// Hardcode intervals
type Interval = number;
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

// Define chord type (array)
type Chord = Interval[];

// Helper function
function replace(chord: Chord, remove: Interval, replacement: Interval) {
  return chord.map((interval) => (interval == remove ? replacement : interval));
}

// Write chord qualities (major, minor, augment, diminished) as chords
const MAJOR = [UNISON, MAJOR_THIRD, PERFECT_FIFTH];
const MINOR = [UNISON, MINOR_THIRD, PERFECT_FIFTH];
const DIMINSHED = replace(MINOR, PERFECT_FIFTH, TRITONE);
const AUGMENTED = replace(MAJOR, PERFECT_FIFTH, MINOR_SIXTH);

// Write chord added intervals (major sixth, major/minor seventh, major 9th/11th/13th)
// Write chord extensions (b9, 9, 11, #11, b13, 13) and minor 7th modifications (M7)
// Write chord modifications (sus2, sus4)
export {};
