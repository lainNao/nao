import { convertReactNodeToRawString } from "./util";
import parserTypeScript from "prettier/parser-typescript";
import prettier from "prettier/standalone";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  children: React.ReactNode;
};

export const ComponentDisplayPanel: React.FC<Props> = (props) => {
  const rawStringifiedComponent = convertReactNodeToRawString(props.children);
  if (typeof rawStringifiedComponent !== "string") {
    console.log(rawStringifiedComponent);
    return <>パースに失敗</>;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <SyntaxHighlighter language="jsx" style={a11yDark}>
          {prettier
            .format(rawStringifiedComponent, {
              parser: "typescript",
              plugins: [parserTypeScript],
            })
            //TODO: ワークアラウンドで最後の改行と謎のセミコロンを消している。直す
            .slice(0, -2)}
        </SyntaxHighlighter>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {props.children}
      </div>
    </div>
  );
};
