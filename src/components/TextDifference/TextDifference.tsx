type Props = {
  children?: React.ReactNode;
  baseHex: string;
  style?: React.CSSProperties;
};

export const TextDifference: React.FC<Props> = (props) => {
  return (
    <span
      style={{
        mixBlendMode: "difference",
        color: props.baseHex.startsWith("#")
          ? props.baseHex
          : "#" + props.baseHex,
        ...props.style,
      }}
    >
      {props.children}
    </span>
  );
};
