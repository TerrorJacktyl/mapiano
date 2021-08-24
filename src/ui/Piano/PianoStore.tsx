import { OctaveStore } from "./Octave/OctaveStore";

const naturalNumber = (i: number) => i % 1 === 0 && 0 <= i;

class PianoStore {
  octaves: OctaveStore[];

  constructor(initialNumberOfOctaves: number) {
    if (!naturalNumber(initialNumberOfOctaves)) {
      throw Error(
        `Number ${initialNumberOfOctaves} is not a natural number (i.e. 1,2,3,..).`
      );
    }

    this.octaves = [...Array(initialNumberOfOctaves)].map(
      (_) => new OctaveStore()
    );
  }
}
