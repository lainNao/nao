import { convertReactNodeToRawString } from "./util";
import parserTypeScript from "prettier/parser-typescript";
import prettier from "prettier/standalone";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  render: React.ReactNode[];
  title?: string;
  todo?: Todo[];
};

type Todo = string;

export const ComponentDisplayPanel: React.FC<Props> = (props) => {
  return (
    <div>
      {props.title && <h2>{props.title}</h2>}
      {props.todo && (
        <div
          style={{
            display: "flex",
            overflow: "auto",
          }}
        >
          <TodoPanel todo={props.todo} />
        </div>
      )}
      {props.render.map((component) => {
        return (
          <>
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
              <SourceCodePanel code={convertReactNodeToRawString(component)} />
            </div>
          </>
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
    return <>パースに失敗</>;
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

type TodoPanelProps = {
  todo: Todo[];
};

const TodoPanel: React.FC<TodoPanelProps> = (props) => {
  return (
    <details
      style={{
        overflow: "auto",
      }}
    >
      <summary>TODO</summary>
      <ol>
        {props.todo.map((todo) => (
          <li
            key={todo}
            style={{
              textAlign: "initial",
            }}
          >
            {todo}
          </li>
        ))}
      </ol>
    </details>
  );
};
