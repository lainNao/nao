import { isFilledArray } from "./util";
import parserTypeScript from "prettier/parser-typescript";
import prettier from "prettier/standalone";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Fragment } from "react";
import jsxToString from "jsx-to-string";

type Props = {
  render: React.ReactNode[];
  title?: string;
  todo?: Todo[];
  references?: string[];
};

type Todo = string;

export const ComponentDisplayPanel: React.FC<Props> = (props) => {
  return (
    <div>
      {props.title && <h2>{props.title}</h2>}
      {isFilledArray(props.references) && (
        <div
          style={{
            display: "flex",
            overflow: "auto",
          }}
        >
          <DetailsList summary="references" isLink list={props.references} />
        </div>
      )}
      {isFilledArray(props.todo) && (
        <div
          style={{
            display: "flex",
            overflow: "auto",
          }}
        >
          <DetailsList ordered summary="todo" list={props.todo} />
        </div>
      )}
      {props.render.map((component, index) => {
        return (
          <Fragment key={index}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                overflow: "auto",
              }}
            >
              {component}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                overflow: "auto",
              }}
            >
              <SourceCodePanel code={jsxToString(component)} />
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

type SourceCodePanelProps = {
  code: string;
};

const SourceCodePanel: React.FC<SourceCodePanelProps> = (props) => {
  if (typeof props.code !== "string") {
    console.log(props.code);
    return <>ソースコードのパースに失敗</>;
  }

  return (
    <details
      style={{
        overflow: "auto",
      }}
    >
      <summary>source</summary>
      <SyntaxHighlighter language="jsx" style={a11yDark}>
        {prettier
          .format(props.code, {
            parser: "typescript",
            plugins: [parserTypeScript],
          })
          //TODO: ワークアラウンドで最後の改行と謎のセミコロンを消している。直す
          .slice(0, -2)}
      </SyntaxHighlighter>
    </details>
  );
};

type DetailsListProps = {
  list: Todo[];
  summary: React.ReactNode;
  ordered?: boolean;
  isLink?: boolean;
};

const DetailsList: React.FC<DetailsListProps> = (props) => {
  const ListWrapper = props.ordered ? "ol" : "ul";
  return (
    <details
      style={{
        overflow: "auto",
      }}
    >
      <summary>{props.summary}</summary>
      <ListWrapper>
        {props.list.map((list) => (
          <li
            key={list}
            style={{
              textAlign: "initial",
            }}
          >
            {props.isLink ? (
              <a href={list} target="_blank" rel="noopener noreferrer">
                {list}
              </a>
            ) : (
              list
            )}
          </li>
        ))}
      </ListWrapper>
    </details>
  );
};
