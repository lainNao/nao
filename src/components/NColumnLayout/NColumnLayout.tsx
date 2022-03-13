import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

type Props = {
  maxColumnNumber: number;
  children: React.ReactNode;

  // if false or undefined, the column count is fixed
  // if number, the column count will be calculated based on the multiple of breakpoint
  breakPointBase?: number | false;

  gap?: string;
  rowGap?: string;
  columnGap?: string;
};

export const NColumnlayout: React.FC<Props> = ({
  maxColumnNumber,
  children,
  breakPointBase,
  gap = "20px",
  rowGap,
  columnGap,
}) => {
  //TODO
  const [id] = useState(() => "NColumnlayout-" + uuidv4());

  return (
    <>
      <style>{`
        #${id}{
          display: grid;
          row-gap: ${rowGap ?? gap};
          column-gap: ${columnGap ?? gap};
        }

        ${
          typeof breakPointBase === "number"
            ? // 動的カラム数
              [...Array(maxColumnNumber)]
                .map((_, i) => {
                  return `
              @media screen and (min-width: ${breakPointBase * (i + 1)}px) {
                #${id}{
                  grid-template-columns: repeat(${i + 1}, 1fr);
                }
              }
            `;
                })
                .join("")
            : // 固定カラム数
              `
            #${id}{
              grid-template-columns: repeat(${maxColumnNumber}, 1fr);
            }
          `
        }
      }
    `}</style>
      <div id={id}>{children}</div>
    </>
  );
};
