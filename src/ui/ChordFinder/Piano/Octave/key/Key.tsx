import "./Key.css";
type ClickProps = {
  onClick: () => void;
};

export type Props = ClickProps & {
  isMarked: boolean;
};

type KeyProps = Props & {
  className?: string;
};

function Key(props: KeyProps) {
  const { className, onClick, isMarked } = props;
  return (
    <div
      className={`Key ${isMarked ? "Marked" : ""} ${className}`}
      onClick={onClick}
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
