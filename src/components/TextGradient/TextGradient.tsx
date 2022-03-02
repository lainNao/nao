import { hexToHsl, hslArrayToCssValue } from "./util";

type Props = {
  children?: React.ReactNode;
  baseHex: string;
  additionalLight?: number;
  additionalShadow?: number;
  style?: React.CSSProperties;
};

//TODO childrenに何を入れてもその範囲のテキストをグラデーションさせる。Appleのやり方があるはず
//TODO メモ化
//TODO span以外やタグ無しにも対応
export const TextGradient: React.FC<Props> = ({
  children,
  style,
  baseHex,
  additionalLight = 0,
  additionalShadow = 0,
}) => {
  const baseHsl = hexToHsl(baseHex);
  const base = hslArrayToCssValue(baseHsl);
  const left = hslArrayToCssValue([
    baseHsl[0],
    baseHsl[1],
    baseHsl[2] + 30 + additionalLight,
  ]);
  const right = hslArrayToCssValue([
    baseHsl[0],
    baseHsl[1],
    baseHsl[2] - 20 - additionalShadow,
  ]);

  return (
    <span
      style={{
        color: "rgba(0,0,0,0)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        backgroundImage: `linear-gradient(135deg,${left}, ${base}, ${right})`,
        ...style,
      }}
    >
      {children}
    </span>
  );
};
