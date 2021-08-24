import "./OctaveView.css";

export type Props = {
  children: JSX.Element[];
};

export function WhiteKeys(props: Props) {
  const { children } = props;
  return <div className="WhiteKeys">{children}</div>;
}
export function BlackKeys(props: Props) {
  const { children } = props;
  return <div className="BlackKeys">{children}</div>;
}
export function OctaveView(props: Props) {
  const { children } = props;
  return <div className="OctaveView">{children}</div>;
}
