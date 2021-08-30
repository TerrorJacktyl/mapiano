import "./Piano.css";

type Props = {
  children: JSX.Element[];
};
export function PianoView(props: Props) {
  return <section className="PianoView" {...props}></section>;
}
