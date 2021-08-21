import { parse } from "./parser.ts";
import type { ParseResult } from "./parser.ts";

// Helper functions
function zip<X, Y>(xs: X[], ys: Y[]) {
  const result = [];
  for (let i = 0; i < Math.max(xs!.length, ys!.length); i++) {
    result.push((xs[i], ys[i]));
  }
  return result;
}

/** Given a list of string lists, return a list of every possible combination of their concatenation (concatenation ordered by the order of the lists).
 * i.e. given [["a", "b"], ["1", "2"], ["p", "q"]]
 *       get ["a1p", "a1q", "a2p", "a2q", "b1p", "b1q", "b2p", "b2q"] */
function build(_xxs: string[][]): string[] {
  if (_xxs.length <= 0) return [];
  let result = _xxs[0];
  const xxs = _xxs!.slice(1);
  xxs.forEach((ys) => {
    result = result.flatMap((x) => ys.map((y) => x + y));
  });
  return result;
}

// Constants to exhaustively generate every possible chord
const TONES = ["C", "D", "E", "F", "G", "A", "B"];
const TONE_MODIFIERS = ["", "#", "b"];
const NOTES = build([TONES, TONE_MODIFIERS]);
const QUALITIES = ["", "maj", "M", "min", "m", "o", "dim", "+", "aug"];
const chords = build([NOTES, QUALITIES]);
console.log(chords);

const hasError = (result: ParseResult) =>
  result?.errs?.length && result.errs.length > 0;

// Test all possible chords
function testAll(chordStrings: string[]) {
  let errorHasOccurred = false;
  chords
    .map<[string, ParseResult]>((c) => [c, parse(c)])
    .forEach(([c, r]: [string, ParseResult]) => {
      if (hasError(r)) {
        console.log(c, r.errs);
        errorHasOccurred = true;
      }
    });
  console.log(
    errorHasOccurred ? "Errors found!" : "All chords parsed without errors!"
  );
}

// testAll(chords);

console.log(parse("C")?.ast);
