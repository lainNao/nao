import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

type Props = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  color?: string;
  offset?: number;
  transitionAdditionalOffset?: number;
  transitionSeconds?: number;
  transitionOnHover?: boolean;
  onClick?: () => void;
};

export const ImgShiftedColoredBackground: React.FC<Props> = ({
  color = "#c3a400",
  offset = 20,
  transitionOnHover = false,
  transitionAdditionalOffset = 0,
  transitionSeconds = 0.5,
  onClick,
  ...rest
}) => {
  const [id] = useState(() => "ImgWithShiftedBackground-" + uuidv4());
  const targetOffset = offset + transitionAdditionalOffset;

  return (
    <>
      <style>{`
        #${id}{
          transition: all ${transitionSeconds}s;
          padding: ${offset + Math.abs(transitionAdditionalOffset * 0.6)}px;
          filter: drop-shadow(${offset}px ${offset}px 0 ${color});
          transform: translate(-${offset}px, -${offset}px);
        }
      ${
        transitionOnHover &&
        `
        #${id}:hover {
          filter: drop-shadow(${targetOffset + 2}px ${
          targetOffset + 2
        }px 0 ${color});
          transform: translate(-${targetOffset}px, -${targetOffset}px);
        }
        `
      }
    `}</style>
      <img
        onClick={() => {
          onClick?.();
        }}
        id={id}
        {...rest}
      />
    </>
  );
};
