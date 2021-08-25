import { Props } from "./Octave/OctaveView";
import "./Piano.css";

export function PianoView(props: Props) {
  return <section className="PianoView">{props.children}</section>;
}
