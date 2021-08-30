import { Note } from "../OctaveStore";
import "./Key.css";
type ClickProps = {
  onClick: (e: React.MouseEvent) => void;
};

export type Props = ClickProps & {
  isMarked: boolean;
  note: string;
};

type KeyProps = Props & {
  className?: string;
};

function Key(props: KeyProps) {
  const { className, onClick, isMarked, note } = props;
  return (
    <div
      className={`Key ${isMarked ? "Marked" : ""} ${className}`}
      onClick={onClick}
      // @ts-ignore
      note={note}
    ></div>
  );
}

export function WhiteKey(props: Props) {
  return <Key {...props} className="" />;
}

export function BlackKey(props: Props) {
  return <Key className="BlackKey" {...props} />;
}

export function GhostKey() {
  return <div className="Ghost" />;
}
